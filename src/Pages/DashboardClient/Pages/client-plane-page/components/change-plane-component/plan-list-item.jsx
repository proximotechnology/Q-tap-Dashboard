import { ChevronDown, ChevronRight } from "lucide-react";
import { usePlanPricingStore } from "../../../../../../store/zustand-store/client-user-plan";

const PlanListItem = ({ plan, onSelect, handleNewPlanConfirmed }) => {

  const features = JSON.parse(plan.feature || '[]');

  const {
    selectedPlan,
    billingCycle,
    setBillingCycle,

  } = usePlanPricingStore();

  const handleSelectPlanPayWay = (way) => {
    setBillingCycle(way)
  }
  const handleDeSelect = () => {
    onSelect()
  }
  const isSelected = selectedPlan?.id === plan.id;

  return (
    <div key={plan.id} className={`plan-list-item ${isSelected ? "selected" : ""}`}>
      <div onClick={handleDeSelect} className="flex flex-space-between flex-align-items">
        <div>
          <p className="plan-custom-heading-name p-0 m-0">{plan.name}</p>
          <p className="p-0 m-0">{plan.description}</p>
          {isSelected && (
            <div className="plan-custom-details">
              <ul className="dialog-features">
                {features.map((f, i) => (
                  <li key={i}>✅ {f}</li>
                ))}
              </ul>
              <div className="dialog-info">
                <p><strong>Status:</strong> {plan.is_active}</p>
                <p><strong>Orders Limit:</strong> {plan.orders_limit}</p>
                <p><strong>Monthly Price:</strong> ${parseFloat(plan.monthly_price).toFixed(2)}</p>
                <p><strong>Yearly Price:</strong> ${parseFloat(plan.yearly_price).toFixed(2)}</p>
              </div>
            </div>
          )}

        </div>
        {isSelected ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </div>
      {
        isSelected && <div className="flex-space-between ">
          <div className="flex">
            <button className={`${billingCycle === "monthly" ? "main-button" : "secondary-button"}`}
              onClick={() => handleSelectPlanPayWay("monthly")}>monthly</button>
            <button className={`${billingCycle === "yearly" ? "main-button" : "secondary-button"}`}
              onClick={() => handleSelectPlanPayWay("yearly")}>yearly</button>
          </div>

          {billingCycle &&
            <button className={"main-button"}
              onClick={() => handleNewPlanConfirmed()}
            >
              confirm
            </button>
          }
        </div>
      }
    </div>

  )
}
export default PlanListItem