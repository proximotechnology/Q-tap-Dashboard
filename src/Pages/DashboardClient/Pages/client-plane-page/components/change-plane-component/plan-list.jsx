import { ChevronLeft } from "lucide-react";
import { usePlanPricingStore } from "../../../../../../store/zustand-store/client-user-plan";
import PlanListItem from "./plan-list-item";

const PlanList = ({ data, toggleChangePlane, handleNewPlanConfirmed }) => {

  const {
    selectedPlan,
    setSelectedPlan,
    billingCycle,
    reset
  } = usePlanPricingStore();


  const toggleSelect = (plan) => {
    if (selectedPlan) {
      if (plan.id === selectedPlan.id) {
        reset()
      }
      else {
        reset()
        setSelectedPlan(plan)
      }
    } else {
      setSelectedPlan(plan)
    }
  };


  return (
    <>
      <div className="back-button-icon" onClick={() => toggleChangePlane()}>
        <ChevronLeft size={"24px"} strokeWidth={2.25} />
      </div>
      <div className="plan-list">
        {
          data?.data?.data?.map((plan) => {
            const isSelected = selectedPlan?.id === plan.id;
            return (
              <PlanListItem plan={plan}
                isSelected={isSelected}
                onSelect={() => toggleSelect(plan)}
                handleNewPlanConfirmed={handleNewPlanConfirmed}
              />
            )
          })
        }
      </div>
    </>
  )
}

export default PlanList