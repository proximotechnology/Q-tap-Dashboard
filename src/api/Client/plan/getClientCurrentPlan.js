
import axios from "axios"
import { BASE_URL } from "../../../utils/constants"

export const getClientCurrentPlan = async () => {
    const currentBranch = localStorage.getItem("selectedBranch")
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.get(`${BASE_URL}get_remain_orders/${currentBranch}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        return response
    } catch (error) {
        throw error
    }
}