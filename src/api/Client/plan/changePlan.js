import axios from "axios"
import { BASE_URL } from "../../../utils/constants"

export const changePlan = async (data) => {
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.post(`${BASE_URL}change_package`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response
    } catch (error) {
        // console.error("changePlan error:", error.response?.data || error.message);
        throw error;
    }
}