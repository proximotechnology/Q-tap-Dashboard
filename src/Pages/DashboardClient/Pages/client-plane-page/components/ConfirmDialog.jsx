import { useEffect, useRef, useState } from "react";
import { confirmRenewPlanCash } from "../../../../../api/Client/plan/confirmRenewPlanCash";
import { confirmRenewPlanWallet } from "../../../../../api/Client/plan/confirmRenewPlanWallet";
import { customErrorLog } from "../../../../../utils/customErrorLog";
import { toast } from "react-toastify";

const ConfirmDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const onConfirm = async () => {
    try {
      setIsConfirming(true)
      setError(null)

      if (!paymentMethod) {
        setError("your must select pay method")
        return;
      }
      if (paymentMethod === "wallet" && !selectedFile) {
        setError("You must upload a screenshot of the payment from the app to continue with the wallet payment method.")
        return;
      }

      let response = null;
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const currentBranch = localStorage.getItem("selectedBranch")
      const user = JSON.parse(localStorage.getItem("UserData"))
      const userId = user?.user?.user_id

      if (paymentMethod === "wallet") {
        const data = new FormData();
        data.append('img', selectedFile);
        data.append('brunch_id', currentBranch);
        data.append('client_id', userId);
        data.append('renewal_date', formattedDate);
        response = await confirmRenewPlanWallet(data)
      } else {
        const data = {
          brunch_id: currentBranch,
          client_id: userId,
          renewal_date: formattedDate
        }
        response = await confirmRenewPlanCash(data)
      }
      // customErrorLog({ fileName: 'confirmDialog', error: response })
      toast.success("your request recived successfully now wait admin aprove your request")
      onClose()
      setPaymentMethod(null)
      setError(null)
      setImagePreview(null)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsConfirming(false)
    }
  }
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
  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog-box" ref={dialogRef}>
        <h2 className="dialog-title">Are you sure?</h2>
        <p className="dialog-message">
          Changing or updating your plan will result in <strong>losing any unused benefits</strong>.
          Do you want to proceed?
        </p>
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
        <div className="dialog-actions">
          <p className="p-0 m-0" style={{color:"red"}}>{error}</p>
          <button className="main-button" onClick={onConfirm} disabled={isConfirming}> {isConfirming ? "Loading..." : "yes"}</button>
          <button className="secondary-button" onClick={() => {
            onClose()
            setPaymentMethod(null)
            setError(null)
            setImagePreview(null)
          }} disabled={isConfirming}> {isConfirming ? "Loading..." : "no"}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;