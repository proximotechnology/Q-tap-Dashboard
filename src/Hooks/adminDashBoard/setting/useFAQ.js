import { useQuery } from "@tanstack/react-query";
import { getFAQ } from "../../../api/admin/setting/getFAQ";

export const useFeature = () => {
    return useQuery({
        queryKey: ['website-FAQ'],
        queryFn: getFAQ,
    });
};