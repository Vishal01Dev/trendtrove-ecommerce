import { BACKEND_URI } from "../../utils/constants"

const addToCart = async (data: object) => {
    try {

        const url = `${BACKEND_URI}/cart/add`


        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
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


const getCart = async () => {
    try {

        const url = `${BACKEND_URI}/cart/get`

        const response = await fetch(url, {
            method: 'GET',
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

const removeFromCart = async (productId: string) => {
    try {

        const url = `${BACKEND_URI}/cart/remove/${productId}`

        const response = await fetch(url, {
            method: 'DELETE',
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


const updateCart = async (data: any) => {
    try {

        const url = `${BACKEND_URI}/cart/update/${data.cartId}`

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
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

const removeWholeCart = async () => {
    try {

        const url = `${BACKEND_URI}/cart/delete`

        const response = await fetch(url, {
            method: 'get',
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

export { addToCart, getCart, removeFromCart, updateCart, removeWholeCart }