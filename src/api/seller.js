//getMyAds
import { supabase } from "./supabaseClient";
export async function getMyAds(userId) {
    const { data, error } = await supabase
        .from("cars")
        .select(
            "id, title, model, color(name), imageURLs, brand(name), currency(name), price, year "
        )
        .eq("user_id", userId);
    if (error) {
        console.error(error);
        return { status: "error", data: [] };
    }
    return { status: "success", data: data };
}

//createAd
export async function createAd(ad) {
    const { data, error } = await supabase.from("cars").insert(ad).select("id");
    if (error) {
        console.error(error);
        return { status: "error" };
    }
    return { status: "success", data: data[0] };
}

//updateAd
export async function updateAd(id, values) {
    const { data, error } = await supabase
        .from("cars")
        .update(values)
        .eq("id", id);
    if (error) {
        console.error(error);
        return { status: "error" };
    }
    return { status: "success" };
}

//deleteAd
export async function deleteAd(id) {
    const { data, error } = await supabase.from("cars").delete().eq("id", id);
    if (error) {
        console.error(error);
        return { status: "error" };
    }
    return { status: "success" };
}

//uploadImages
export async function uploadImages(id, images, onProgress) {
    // Limit the number of images to 4
    images = images.slice(0, 4);
    let names = [];
    let totalImages = images.length;
    const promises = images.map(async (image, index) => {
        try {
            const filename = image.name + "_" + index + "_" + image.name;
            names.push(filename);
            const response = await supabase.storage
                .from("images")
                .upload(filename, image);
            // Update progress
            if (onProgress) {
                onProgress(Math.round(((index + 1) / totalImages) * 100));
            }
            return response;
        } catch (e) {
            console.error(e.message);
            return null;
        }
    });
    try {
        const responses = await Promise.all(promises);
        const successfulUploads = responses.filter(
            (response) => response !== null
        );
        if (successfulUploads.length > 0) {
            const updateRes = await supabase
                .from("cars")
                .update({ imageURLs: names })
                .eq("id", id);
            if (!updateRes.error) {
                return {
                    status: "success",
                };
            }
        } else {
            console.error("Error updating the database:", e.message);
        }
    } catch (e) {
        console.error("Error updating the database:", e.message);
    }
    return { status: "error" };
}

export async function uploadNewImages(id, images, onProgress, currentImages) {
    if (currentImages.length < 4) {
        images = images.slice(0, 4 - currentImages.length);
        let names = [];
        let totalImages = images.length;
        const promises = images.map(async (image, index) => {
            try {
                const filename =
                    index + "_" + image.name + new Date().toISOString();
                names.push(filename);
                const response = await supabase.storage
                    .from("images")
                    .upload(filename, image);
                // Update progress
                if (onProgress) {
                    onProgress(Math.round(((index + 1) / totalImages) * 100));
                }
                return response;
            } catch (e) {
                console.error(e);
                return null;
            }
        });
        try {
            const responses = await Promise.all(promises);
            const successfulUploads = responses.filter(
                (response) => response !== null
            );
            if (successfulUploads.length > 0) {
                const updateRes = await supabase
                    .from("cars")
                    .update({ imageURLs: [...currentImages, ...names] })
                    .eq("id", id);
                if (!updateRes.error) {
                    return {
                        status: "success",
                    };
                }
            } else {
                console.error("Error updating the database");
            }
        } catch (e) {
            console.error("Error updating the database:", e);
        }
        return { status: "error" };
    } else {
        return { status: "error", message: "image limit" };
    }
}

//deleteImage
export async function deleteImage(name, carId) {
    const { data, error } = await supabase
        .from("cars")
        .update({
            imageURLs: supabase.rpc("array_remove", {
                imageURLs: name,
            }),
        })
        .eq("id", carId);

    const res = await supabase.storage.from("images").remove(name);
    if (error || res.error) {
        console.error(error, res.error);
        return { status: "error" };
    } else {
        return { status: "success" };
    }
}
