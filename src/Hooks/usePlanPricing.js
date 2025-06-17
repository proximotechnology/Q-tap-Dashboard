import { useQuery } from "@tanstack/react-query";
import { getClintPlan } from "../api/Client/getPlans";

export const usePlanPricing = () => {
  return useQuery({
    queryKey: ['plan-pricing'],
    queryFn: getClintPlan,
  });
};