import { supabase } from "./supabaseClient";

//signIn
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword(
        email,
        password
    );
    if (error) {
        console.error(error);
        return { status: "error" };
    } else {
        return { status: "success", user: data.user };
    }
}

//signUp
export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp(email, password);
    if (error) {
        console.error(error);
        return { status: "error" };
    } else {
        const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .insert({ user_id: data.user.id, role: 1, email: email.email });
        if (!profileError) {
            return { status: "success", user: data.user };
        } else {
            console.error(error);
            return { status: "error" };
        }
    }
}

//updatePassword

//updateEmail

//getRoleAndID
