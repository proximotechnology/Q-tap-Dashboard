import { useMutation } from "@tanstack/react-query";
import sendMessage from "../../../../api/public/chat/sendMessage";


export const useSendMessage = () => {

    return useMutation({
        mutationFn: sendMessage

    });
};