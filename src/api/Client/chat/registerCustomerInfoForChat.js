import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

export default registerCustomerInfoForChat = async () => {
    try {
        const response = await axios.post(
            `${BASE_URL}customer_info`,
            userData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // equivalent to fetch's credentials: 'include'
            }
        );
        return response;
    } catch (error) {
        throw error
    }
}