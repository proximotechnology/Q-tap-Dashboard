import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { usePlanPricingStore } from '../../../../../../store/zustand-store/client-user-plan'
import '../../css/confirmNewPlanePage.css'
import { changePlan } from '../../../../../../api/Client/plan/changePlan'
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
        try {
            // brunch_id
            // package_id
            // img
            // package_type => yearly_price , monthly_price
            // renewal_date
            // type => cash or wallet
            setLoading(true)
            setError(null)
            const formdata = new FormData()
            formdata.append("brunch_id", localStorage.getItem("selectedBranch"))
            formdata.append("package_id", selectedPlan.id)
            if (!selectedFile && paymentMethod === "wallet") {
                setError("selectFile")
                return;
            }
            if (paymentMethod === "wallet") {
                formdata.append("img", selectedFile)
            }

            if (billingCycle === "yearly") {
                formdata.append("package_type", "yearly_price")
            } else {
                formdata.append("package_type", "monthly_price")
            }
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
            formdata.append("renewal_date", formattedDate)
            formdata.append("type", paymentMethod)

            const response = await changePlan(formdata)
        } catch (error) {
            if (error.status === 400 && error.response.data.status === "pending") {
                setError("you already send request to change your plan wait until admin approve")
                return
            }
            setError(error.message || "some error happend")
        } finally {
            setLoading(false)
        }
    };

    const handleCancel = () => {
        reset();
        closeChangePlan()
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div>
            <div className="back-button-icon" onClick={() => handleBackToSelectPlan()}>
                <ChevronLeft size={"24px"} strokeWidth={2.25} />
            </div>
            <div className="checkout-panel">
                <div className="panel-content">
                    <p className="plan-name">{selectedPlan ? selectedPlan.name : 'No plan selected'}</p>
                    <p className="billing-cycle">{billingCycle}</p>
                    <p className="billing-cycle">{billingCycle === "yearly" ? selectedPlan?.yearly_price + "$" : selectedPlan?.monthly_price + "$"}</p>

                    <p className="payment-label">Select payment method:</p>

                    <div className="payment-options">
                        <div
                            onClick={() => setPaymentMethod('cash')}
                            className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
                        >
                            Cash
                        </div>
                        <div
                            onClick={() => setPaymentMethod('wallet')}
                            className={`payment-option ${paymentMethod === 'wallet' ? 'selected' : ''}`}
                        >
                            Wallet
                        </div>
                    </div>

                    {paymentMethod === 'wallet' && (
                        <div className="upload-section">
                            <label htmlFor="receiptUpload" className="upload-label">
                                Upload payment receipt:
                            </label>
                            <input
                                type="file"
                                id="receiptUpload"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="preview" />
                                </div>
                            )}
                        </div>
                    )}
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