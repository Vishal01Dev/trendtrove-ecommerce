import { FieldValues } from "react-hook-form";
import { BACKEND_URI } from "../../utils/constants";
import axios from "axios";

const queryHandler = async (data: FieldValues) => {
    try {
        const url = `${BACKEND_URI}/queries/add`;

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

};

export { queryHandler }