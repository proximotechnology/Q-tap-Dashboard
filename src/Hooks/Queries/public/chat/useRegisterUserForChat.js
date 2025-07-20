import { useMutation } from "@tanstack/react-query";
import { usePlanPricingStore } from "../../../../store/zustand-store/user-chat-data-store";
import registerCustomerInfoForChat from "../../../../api/public/chat/registerCustomerInfoForChat";

export const useRegisterCustomerInfoForChat = (options = {}) => {
    const logedIn = usePlanPricingStore(state => state.logedIn)
    return useMutation({
        mutationFn: registerCustomerInfoForChat,
        ...options,
        onSuccess: (data, variables, context) => {
            // 🔁 Always runs


            // 🧩 Also call user-defined onSuccess if provided
            if (typeof options.onSuccess === 'function') {
                options.onSuccess(data, variables, context);
            }
        },

    });
};