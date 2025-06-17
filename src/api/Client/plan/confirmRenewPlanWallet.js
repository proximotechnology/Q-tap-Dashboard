
import axios from "axios"
import { BASE_URL } from "../../../utils/constants"

export const confirmRenewPlanWallet = async (data) => {
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.post(`${BASE_URL}renewal_package_wallet/`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            })
        return response
    } catch (error) {
        throw error
    }
}