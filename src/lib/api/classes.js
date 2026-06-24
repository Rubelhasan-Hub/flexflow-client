import { authHeader } from "../session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getClasses = async (search = '', category = '') => {
    const url = `${baseUrl}/api/all-classes?status=approved&search=${search}&category=${category}`;

    const res = await fetch(url, {
        headers: {
            ...await authHeader()
        }
    });
    return res.json();
};