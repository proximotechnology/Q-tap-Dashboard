import { ChevronLeft } from "lucide-react"
import PlanList from "./plan-list"
import { usePlanPricing } from "../../../../../../Hooks/usePlanPricing"
import { useState } from "react"
import ConfirmNewPlan from "./confirm-new-plan"

const ChangePlan = ({ toggleChangePlane }) => {
    const { data, isLoading, error } = usePlanPricing()
    const [isNewPlanConfirmed, setNewPlanConfirmed] = useState(false)

    const handleChangeToNewPlanConfirmed = () => {
        setNewPlanConfirmed(true)
    }

    const handleBackToSelectPlan = () => {
        setNewPlanConfirmed(false)
    }

    return (
        isNewPlanConfirmed ?
            (
                <ConfirmNewPlan handleBackToSelectPlan={handleBackToSelectPlan} closeChangePlan={toggleChangePlane} />
            )
            :
            (
                <PlanList toggleChangePlane={toggleChangePlane} handleNewPlanConfirmed={handleChangeToNewPlanConfirmed}
                    data={data}
                />
            )
    )
}

export default ChangePlan