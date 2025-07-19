import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { usePlanPricingStore } from '../../../../../../store/zustand-store/client-user-plan'
import '../../css/confirmNewPlanePage.css'
import { customErrorLog } from '../../../../../../utils/customErrorLog'
import { printFormData } from '../../../../../../utils/utils'

const ConfirmNewPlan = ({ handleBackToSelectPlan, closeChangePlan }) => {
    const {
        selectedPlan,
        billingCycle,
        paymentMethod,
        setPaymentMethod,
        reset,
    } = usePlanPricingStore()
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const handleConfirm = async () => {
           
    };

    const handleCancel = () => {
        reset();
        closeChangePlan()
    };


   
    return (
        <div>
            <div className="back-button-icon" onClick={() => handleBackToSelectPlan()}>
                <ChevronLeft size={"24px"} strokeWidth={2.25} />
            </div>
            <div className="checkout-panel">
                <div className="panel-content">
                    <p className="plan-name">{selectedPlan ? selectedPlan.name : 'No plan selected'}</p>
                    <p className="billing-cycle" style={{margin:"2px"}} >{billingCycle}</p>
                    <p className="billing-cycle" style={{margin:"2px"}} >{billingCycle === "yearly" ? selectedPlan?.yearly_price + "$" : selectedPlan?.monthly_price + "$"}</p>

                </div>
                <p className="p-0 m-0" style={{ color: "red" }}>{error || ""}</p>
                <div className="button-group">
                    <button onClick={handleCancel} className="btn cancel" disabled={loading}>{loading ? "Loading" : "Cancel"}</button>
                    <button onClick={handleConfirm} className="btn confirm" disabled={loading}>{loading ? "Loading" : "Confirm"}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmNewPlan