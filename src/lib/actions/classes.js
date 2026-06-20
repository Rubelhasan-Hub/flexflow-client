"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const CreateClass = async (newClassData) => {
    const response = await fetch(`${baseUrl}/api/add-class`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newClassData),
    });


    return response.json();
}  
