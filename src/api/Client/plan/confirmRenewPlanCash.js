
import axios from "axios"
import { BASE_URL } from "../../../utils/constants"
import { customErrorLog } from "../../../utils/customErrorLog"

export const confirmRenewPlanCash = async ( data ) => {
    const token = localStorage.getItem("Token")
    customErrorLog({error:data})
    try {
        const response = await axios.post(`${BASE_URL}renewal_package_cash`, data, {
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