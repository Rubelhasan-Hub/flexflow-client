import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        return session?.user || null;
    } catch (error) {
        console.error("Session fetch error:", error);
        return null;
    }
};

export const requireRole = async (role) => {
    const user = await getUserSession();
    if (!user || user.role !== role) {
        redirect("/unauthorized");
    }

    return user;
};