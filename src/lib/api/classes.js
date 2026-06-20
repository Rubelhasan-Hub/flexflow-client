
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getClasses = async (search = '', category = '') => {
    const res = await fetch(
        `${baseUrl}/api/all-classes?status=approved&search=${search}&category=${category}`
    );
    return res.json();
};