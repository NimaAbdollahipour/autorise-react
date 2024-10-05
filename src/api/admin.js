import { supabase } from "./supabaseClient";

//getColors
export async function getColors() {
  const { data, error } = await supabase.from("colors").select();
  if (error) {
    console.error(error);
    return { status: "error", data: data };
  }
  return { status: "success", data: data };
}

export async function getCurrencies() {
  const { data, error } = await supabase.from("currencies").select();
  if (error) {
    console.error(error);
    return { status: "error", data: data };
  }
  return { status: "success", data: data };
}

//insertColor
export async function insertColor(color) {
  const { data, error } = await supabase.from("colors").insert({ name: color });
  if (error) {
    console.error(error);
    return { status: "error" };
  }
  return { status: "success" };
}

//updateColor
export async function updateColor(id, color) {
  const { data, error } = await supabase
    .from("colors")
    .update({ name: color })
    .eq("id", id);
  if (error) {
    console.error(error);
    return { status: "error" };
  }
  return { status: "success" };
}

//getBrands
export async function getBrands() {
  const { data, error } = await supabase.from("brands").select();
  if (error) {
    console.error(error);
    return { status: "error", data: [] };
  }
  return { status: "success", data: data };
}

//updateBrands
export async function updateBrand(id, brand) {
  const { data, error } = await supabase
    .from("brands")
    .update({ name: brand })
    .eq("id", id);
  if (error) {
    console.error(error);
    return { status: "error" };
  }
  return { status: "success" };
}

//insertBrand
export async function insertBrand(brand) {
  const { data, error } = await supabase.from("brands").insert({ name: brand });
  if (error) {
    console.error(error);
    return { status: "error" };
  }
  return { status: "success" };
}

//getUsers(pagination)
export async function getUsers(page, userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id(id, email), role")
    .neq("user_id", userId)
    .range(page * 20, page * 20 + 19);
  if (error) {
    console.error(error);
    return { status: "error", data: [] };
  }
  return { status: "success", data: data };
}

export async function getAllUsers(page, q, userId) {
  let query = supabase
    .from("profiles")
    .select("id, user_id, role, created_at, email")
    .like("email", `%${q}%`)
    .neq("user_id", userId)
    .range(page * 12, page * 12 + 11);

  const { error, data } = await query;
  if (error) {
    return { status: "error", data: [], count: 0 };
  }
  const { count, error: countError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  if (countError) return { status: "error", data: [], count: 0 };
  return { status: "success", data: data, count: count };
}

//updateUser()
export async function updateUser(userId, role) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ role: role })
    .eq("id", userId);
  if (error) {
    console.error(error);
    return { status: "error" };
  }
  return { status: "success" };
}
