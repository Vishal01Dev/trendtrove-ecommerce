import { BACKEND_URI } from "../../utils/constants";

const getAllProducts = async () => {
    try {
        const url = `${BACKEND_URI}/products/all`

        const response = await fetch(url, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const responseData = await response.json();
        return responseData;
    }
    catch (error) {
        console.log("Error: ", error)
        throw error
    }
}

export { getAllProducts }