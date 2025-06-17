
import React, { useState } from "react";
import "./css/UsageBar.css"; // Import the CSS
import "./css/ConfirmDialog.css";
import "./css/global.css";
// import "./css/plan.css";
import ConfirmDialog from "./components/ConfirmDialog";
import UsageCard from "./components/UsageCard.";
import { usePlanDiscount } from "../../../../Hooks/usePlanDiscount";
import { usePlanPricing } from "../../../../Hooks/usePlanPricing";
import { customErrorLog } from "../../../../utils/customErrorLog";
import ChangePlan from "./components/change-plane-component/change-plane-page";
import { usePlanPricingStore } from "../../../../store/zustand-store/client-user-plan";

const ClientPlan = () => {

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isChangePlanDialog, setChangePlanDialog] = useState(false);



  const {reset} = 
  usePlanPricingStore();

  const openChangePlane = () => {
    setChangePlanDialog(true);
  }
  const closeChangePlane = () => {
    setChangePlanDialog(false);
    reset()
  }

  return (
    <div className="flex flex-col">
      {isChangePlanDialog ?
        (
          <ChangePlan toggleChangePlane={closeChangePlane} />
        )
        :
        (
          <>
            <UsageCard openDialog={() => setDialogOpen(true)} openChangePlan={() => openChangePlane()} />
            <ConfirmDialog
              isOpen={isDialogOpen}
              onClose={() => setDialogOpen(false)}
            />
          </>
        )}

    </div>
  )
}

export default ClientPlan

const ChangePlanDialog = ({ isOpen, onClose }) => {
  const { data: discountData, isLoading: discountLoading, error: discountError } = usePlanDiscount()
  const { data, isLoading, error } = usePlanPricing()
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlanPayWay, setSelectedPlanPayWay] = useState(null);

  customErrorLog({ error: data })

  const handleSelect = (plan) => {
    setSelectedPlanId(plan.id);
    setSelectedPlanPayWay(null);
    // onSelect?.(plan);
  };
  const handleSelectPlanPayWay = (way) => {
    setSelectedPlanPayWay(way);
    // onSelect?.(plan);
  };

  if (!isOpen) return null;


  return (
    <div className="dialog-backdrop" onClick={onClose} >
      <div className="custom-dialog-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="dialog-title">Available Plans</h2>
        <div className="plan-list">
          {data?.data?.data?.map((plan) => {
            const features = JSON.parse(plan.feature || '[]');
            const isSelected = plan.id === selectedPlanId;
            return (

              <div key={plan.id} className={`plan-card ${isSelected ? 'selected' : ''}`} >
                <div onClick={() => handleSelect(plan)}>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>

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

                  <hr style={{ margin: '16px 0' }} />

                </div>
                {isSelected && <div className="flex-space-between ">
                  <div className="flex">
                    <button className={`${selectedPlanPayWay && selectedPlanPayWay === "monthly" ? "main-button" : "secondary-button"}`}
                      onClick={() => handleSelectPlanPayWay("monthly")}>monthly</button>
                    <button className={`${selectedPlanPayWay && selectedPlanPayWay === "yearly" ? "main-button" : "secondary-button"}`}
                      onClick={() => handleSelectPlanPayWay("yearly")}>yearly</button>
                  </div>

                  {selectedPlanPayWay && <button className={"main-button"}
                    onClick={() => { }}>confirm</button>}

                </div>}
              </div>

            );
          })}
        </div>
        <div className="dialog-actions mt-10">
          <button className="main-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );

}











