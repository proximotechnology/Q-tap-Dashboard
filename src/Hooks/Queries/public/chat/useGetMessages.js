import { useMutation } from "@tanstack/react-query";
import getMessages from "../../../../api/public/chat/getMessages";





export const useSendMessage = () => {

    return useMutation({
        mutationFn: getMessages
    });
};