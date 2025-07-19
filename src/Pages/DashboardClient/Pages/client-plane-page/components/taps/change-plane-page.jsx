import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import ConfirmNewPlan from "../change-plane-component/confirm-new-plan"
import PlanTapLayout from "../PlanTapLayout"
import PlanList from "../change-plane-component/plan-list"
import { usePlanPricing } from "../../../../../../Hooks/Queries/clientDashBoard/plan/usePlanPricing"

const ChangePlan = () => {
    const { data, isPending, error } = usePlanPricing()
    const [isNewPlanConfirmed, setNewPlanConfirmed] = useState(false)

    const handleChangeToNewPlanConfirmed = () => {
        setNewPlanConfirmed(true)
    }

    const handleBackToSelectPlan = () => {
        setNewPlanConfirmed(false)
    }
    if (isPending) {
        return "loading"
    }
    
    // selected plan stored in localstorge with zustand
    // here we toggle the confirm page and the list of plan
    return (
        isNewPlanConfirmed ?
            (
                <ConfirmNewPlan
                    handleBackToSelectPlan={handleBackToSelectPlan}
                />
            )
            :
            (
                <PlanList
                    handleNewPlanConfirmed={handleChangeToNewPlanConfirmed}
                    data={data}
                />
            )
    )
}

export default ChangePlan