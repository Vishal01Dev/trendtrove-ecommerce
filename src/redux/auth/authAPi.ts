import { FieldValues } from "react-hook-form";
import { BACKEND_URI } from '../../utils/constants'
import axios from "axios";

const userLogin = async (data: FieldValues) => {
    try {
        const url = `${BACKEND_URI}/users/login`;

        const response = await axios.post(url, data, {
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

};

const registerUser = async (data: FieldValues) => {
    try {
        const url = `${BACKEND_URI}/users/register`;

        const response = await axios.post(url, data, {
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
};

const checkAuthentication = async () => {
    try {

        const url = `${BACKEND_URI}/users/status`

        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.authenticated;

    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
}

const userLogout = async () => {
    try {

        const url = `${BACKEND_URI}/users/logout`

        const response = await fetch(url, {
            method: "POST",
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

const getCurrentUser = async () => {
    try {
        const url = `${BACKEND_URI}/users/current-user`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response.data;

    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
};

const updateUser = async (data: FieldValues) => {
    try {

        const url = `${BACKEND_URI}/users/update`

        const response = await fetch(url, {
            method: "PATCH",
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


const checkEmail = async (data: FieldValues) => {
    try {
        const url = `${BACKEND_URI}/users/sendmail`;

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response.data;

    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            throw new Error(error.response.data.message || "An error occurred");
        }
        throw new Error("An unexpected error occurred");
    }
}

const checkOtp = async (data: any) => {
    try {
        const url = `${BACKEND_URI}/users/validateotp`;

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response.data;

    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            throw new Error(error.response.data.message || "An error occurred");
        }
        throw new Error("An unexpected error occurred");
    }
}

const forgotPassword = async (data: FieldValues) => {
    try {
        const url = `${BACKEND_URI}/users/forgot-password`;

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response.data;

    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            throw new Error(error.response.data.message || "An error occurred");
        }
        throw new Error("An unexpected error occurred");
    }
}


const changePassword = async (data: FieldValues) => {
    try {
        const url = `${BACKEND_URI}/users/change-password`;

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response.data;

    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            throw new Error(error.response.data.message || "An error occurred");
        }
        throw new Error("An unexpected error occurred");
    }
}

export { registerUser, userLogin, checkAuthentication, userLogout, getCurrentUser, updateUser, checkEmail, checkOtp, forgotPassword, changePassword }