import { authHeader } from "../session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClasses = async (search = '', category = '', page = 1) => {
    // URL এ page টি যুক্ত করে দিলাম
    const url = `${baseUrl}/api/all-classes?status=approved&search=${search}&category=${category}&page=${page}&limit=6`;

    const res = await fetch(url, {
        cache: 'no-store',
        headers: {
            ...await authHeader()
        }
    });

    if (!res.ok) {
        return { classes: [], totalPages: 0 };
    }

    return res.json();
};