//getSavedAds
import { supabase } from "./supabaseClient";
export async function getSavedAds(userId, page = 0) {
    const { data, error } = await supabase
        .from("saved_cars")
        .select(
            "id, car_id(title, brand(name), color(name), model, id, currency(name), price, imageURLs, year)"
        )
        .eq("user_id", userId)
        .range(page * 20, page * 20 + 19);
    if (error) {
        console.error(error);
        return { status: "error", data: [] };
    }
    console.log(data);
    return { status: "success", data: data };
}
//saveAd
export async function saveAd(userId, carId) {
    const { data, error } = await supabase
        .from("saved_cars")
        .insert({ user_id: userId, car_id: carId });
    if (error) {
        console.error(error);
        return { status: "error" };
    }
    return { status: "success" };
}

//removeSavedAd
export async function removeSavedAd(id) {
    const { data, error } = await supabase
        .from("saved_cars")
        .delete()
        .eq("id", id);
    if (error) {
        console.error(error);
        return { status: "error" };
    }
    return { status: "success" };
}

export async function getAdById(id, userId) {
    const { data, error } = await supabase
        .from("cars")
        .select(
            "id, user_id, title, model, color(name), imageURLs, brand(name), currency(name), price, year"
        )
        .eq("id", id);

    const { data: savedData, error: savedError } = await supabase
        .from("saved_cars")
        .select("id")
        .eq("car_id", id)
        .eq("user_id", userId);

    // Handle errors in the queries
    if (error || savedError) {
        console.error("Error fetching data:", error || savedError);
        return {
            status: "error",
            message: error?.message || savedError?.message,
        };
    }

    // Check if `data` is empty
    if (!data || data.length === 0) {
        return { status: "error", message: "Car not found" };
    }

    return {
        status: "success",
        data: data[0],
        saved: savedData ? (savedData[0] ? savedData[0].id : null) : null, // Ensure `savedData` is checked
        owner: userId === data[0].user_id,
    };
}

export async function getAdDetails(id) {
    const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id);

    if (error) {
        console.error("Error fetching data:", error);
        return {
            status: "error",
            message: error?.message,
        };
    }
    if (!data || data.length === 0) {
        return { status: "error", message: "Car not found" };
    }
    return {
        status: "success",
        data: data[0],
    };
}
