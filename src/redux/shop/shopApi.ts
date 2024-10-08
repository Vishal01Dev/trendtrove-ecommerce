import { BACKEND_URI } from '../../utils/constants';

const filterOptions = async () => {
    try {

        const url = `${BACKEND_URI}/filters/`

        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            return false;
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.log("Error: ", error)
        throw error
    }
}

const filterProducts = async (filter: any) => {

    const url = `${BACKEND_URI}/products/all?`;

    let queryString = '';

    for (let key in filter) {
        const value = filter[key];

        if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
                queryString += `${key}=${value.join(",")}&`;
            } else {
                queryString += `${key}=${value}&`;
            }
        }
    }


    try {
        const response = await fetch(url + queryString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};

export { filterOptions, filterProducts };
