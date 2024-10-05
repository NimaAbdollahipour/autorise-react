import { supabase } from "./supabaseClient";

//getAllAds
export async function getAllAds(page, filters, q) {
    let query = supabase
        .from("cars")
        .select(
            "id, brand(name), model, color(name),title, price, currency(name), year, imageURLs "
        )
        .range(page * 12, page * 12 + 11);
    if (filters) {
        if (filters.minPrice) {
            query = query.gte("price", filters.minPrice);
        }
        if (filters.maxPrice) {
            query = query.lte("price", filters.maxPrice);
        }
        if (filters.brand && filters.brand !== 0) {
            query = query.eq("brand", filters.brand);
        }
        if (filters.color && filters.color !== 0) {
            query = query.eq("color", filters.color);
        }
        if (filters.fromYear) {
            query = query.gte("year", filters.fromYear);
        }
        if (filters.toYear) {
            query = query.lte("year", filters.toYear);
        }
        if (q) {
            query = query.or(`model.like.%${q}%,title.like.%${q}%`);
            //query = query.like("model", "%${q}%");
        }
    }
    const { error, data } = await query;
    if (error) {
        console.error(error);
        return { status: "error", data: [], count: 0 };
    }
    const { count, error: countError } = await supabase
        .from("cars")
        .select("*", { count: "exact", head: true });

    if (countError) return { status: "error", data: [], count: 0 };
    return { status: "success", data: data, count: count };
}

export async function getImages(imageURLs) {
    if (!imageURLs || imageURLs.length === 0) {
        return {
            status: "success",
            data: [],
        };
    }
    const urls = imageURLs.map((imageURL) => {
        return supabase.storage.from("images").getPublicUrl(imageURL).data
            .publicUrl;
    });
    const validUrls = urls.filter((url) => url !== null);
    return { status: "success", data: validUrls };
}

export async function getImagesByName(imageURLs) {
    if (!imageURLs || imageURLs.length === 0) {
        return {
            status: "success",
            data: [],
        };
    }
    const urls = imageURLs.map((imageURL) => {
        return {
            url: supabase.storage.from("images").getPublicUrl(imageURL).data
                .publicUrl,
            name: imageURL,
        };
    });
    return { status: "success", data: urls };
}

export async function getUserInfo() {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
        return { status: "error", data: { role: 0, userId: null } };
    }

    const userId = sessionData.session.user.id;
    const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("role, email")
        .eq("user_id", userId) // Assuming the user ID is the primary key in the profiles table
        .single(); // This will return a single object instead of an array

    if (profilesError || !profilesData) {
        return { status: "error", data: { role: 0, userId: null } };
    }

    return {
        status: "success",
        data: {
            role: profilesData.role,
            userId: userId,
            email: profilesData.email,
        },
    };
}
