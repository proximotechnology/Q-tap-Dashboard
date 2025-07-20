import axios from "axios";

export default sendMessage = async ({ receiver_id, sender_type, message }) => {
    try {
        const collectionData = {
            sender_id: localStorage.getItem("customer_id"),
            receiver_id: "1", // receiver id (support)
            sender_type: "customer", // sender type (customer)
            message
        };
        const response = await axios.post(`${BASE_URL}chat`,
            collectionData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            });


        return response;

    } catch (error) {

        throw error;

    }
} 