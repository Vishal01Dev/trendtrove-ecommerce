import axios from "axios";
import { BACKEND_URI } from "../../utils/constants";

const createOrder = async (data: any) => {
    try {

        const url = `${BACKEND_URI}/orders/create`;

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = response.data;

        return responseData;

    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            throw new Error(error.response.data.message || "An error occurred");
        }
        throw new Error("An unexpected error occurred");
    }
}

const getUserOrders = async () => {
    try {

        const url = `${BACKEND_URI}/orders/user-orders`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        const responseData = response.data;

        return responseData;



    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            throw new Error(error.response.data.message || "An error occurred");
        }
        throw new Error("An unexpected error occurred");
    }
}

const getOrderDetails = async (orderId: string) => {
    try {

        const url = `${BACKEND_URI}/orders/get/${orderId}`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        const responseData = response.data;

        return responseData;


    } catch (error:any) {
        if (error.response) {
            console.log(error.response.data);
            throw new Error(error.response.data.message || "An error occurred");
        }
        throw new Error("An unexpected error occurred");
    }
}

export { createOrder, getUserOrders, getOrderDetails }