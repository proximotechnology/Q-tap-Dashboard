import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

/* 
  |-------------------------------
  | body
  |---------------------------
  | name
  | email
  | phone
  | address
  |
  |
*/
const registerCustomerInfoForChat = async ({ payload }) => {
    try {
        const response = await axios.post(
            `${BASE_URL}customer_info`,
            payload,
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

export default registerCustomerInfoForChat