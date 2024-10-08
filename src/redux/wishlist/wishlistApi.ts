import { BACKEND_URI } from "../../utils/constants";

const addTowishlist = async (data: string) => {

    try {

        const url = `${BACKEND_URI}/wishlist/add`

        const dataObj = {
            productId: data
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj),
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const responseData = await response.json();
        return responseData;


    } catch (error) {
        console.log("Error: ", error)
        throw error
    }

}


const getWishlist = async () => {

    try {

        const url = `${BACKEND_URI}/wishlist/all`


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


    } catch (error) {
        console.log("Error: ", error)
        throw error
    }

}

const removeFromWishlist = async (data: any) => {
    try {

        const url = `${BACKEND_URI}/wishlist/remove/${data}`

        const response = await fetch(url, {
            method: "delete",
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


    } catch (error) {
        console.log("Error: ", error)
        throw error
    }
}

export { addTowishlist, getWishlist, removeFromWishlist }