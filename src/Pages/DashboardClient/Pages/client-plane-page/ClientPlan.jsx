
import React, { useState } from "react";
import "./css/UsageBar.css"; // Import the CSS
import "./css/ConfirmDialog.css";
import "./css/global.css";
// import "./css/plan.css";
import ConfirmDialog from "./components/ConfirmDialog";
import UsageCard from "./components/UsageCard.";
import { usePlanDiscount } from "../../../../Hooks/Queries/usePlanDiscount";
import { usePlanPricing } from "../../../../Hooks/Queries/usePlanPricing";
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












