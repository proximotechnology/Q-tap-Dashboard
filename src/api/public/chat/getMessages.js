import axios from "axios";

export default getMessages = async ({ customerId }) => {


    try {

        const url = `${BASE_URL}chat?customer_id=${customerId}`;
        
        const response = await axios.get(url,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            });

        return response

    } catch (error) {
        throw error
    }
}