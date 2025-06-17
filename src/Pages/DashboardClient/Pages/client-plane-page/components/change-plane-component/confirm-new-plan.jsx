import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { usePlanPricingStore } from '../../../../../../store/zustand-store/client-user-plan'
import '../../css/confirmNewPlanePage.css'

const ConfirmNewPlan = ({ handleBackToSelectPlan, closeChangePlan }) => {
    const {
        selectedPlan,
        billingCycle,
        paymentMethod,
        setPaymentMethod,
        reset,
    } = usePlanPricingStore()
    const [imagePreview, setImagePreview] = useState(null);

    const handleConfirm = () => {
        console.log('Confirmed:', { selectedPlan, billingCycle, paymentMethod });
    };

    const handleCancel = () => {
        reset();
        closeChangePlan()
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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

                    {paymentMethod === 'cash' && (
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

                <div className="button-group">
                    <button onClick={handleCancel} className="btn cancel">Cancel</button>
                    <button onClick={handleConfirm} className="btn confirm">Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmNewPlan