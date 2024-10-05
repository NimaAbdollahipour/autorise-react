import { createContext, useEffect, useState } from "react";
import { getUserInfo } from "../api/allUsers";
import { supabase } from "../api/supabaseClient";

export const UserContext = createContext();

export default function UserPrvider({ children }) {
    const [userId, setUserId] = useState(null);
    //const [role, setRole] = useState(0);
    const [role, setRole] = useState(0);
    const [email, setEmail] = useState();
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        setLoadingUser(true);
        getUserInfo().then(({ status, data }) => {
            if (status === "success") {
                setUserId(data.userId);
                setRole(data.role);
                setEmail(data.email);
                setLoadingUser(false);
            } else {
                console.error("Failed to get user info:", status);
                setLoadingUser(false);
            }
        });
    }, []);

    function signOutUser() {
        setRole(0);
        setUserId(null);
        setEmail(null);
        supabase.auth.signOut();
    }

    return (
        <UserContext.Provider
            value={{
                userId,
                setUserId,
                role,
                setRole,
                loadingUser,
                setLoadingUser,
                signOutUser,
                email,
                setEmail,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
