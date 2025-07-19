import { useEffect, useRef, useState } from "react";
import "../../css/ConfirmDialog.css";
import '../../css/confirmNewPlanePage.css'

const ConfirmDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const [isConfirming, setIsConfirming] = useState(false);

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


  }

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog-box" ref={dialogRef}>
        <h2 className="dialog-title">Are you sure?</h2>
        <p className="dialog-message">
          Changing  plan will result in <strong>keep any unused benefits</strong>.
          Do you want to proceed?
        </p>
        
        <div className="dialog-actions">
          <button className="main-button" onClick={onConfirm} disabled={isConfirming}> {isConfirming ? "Loading..." : "yes"}</button>
          <button className="secondary-button" onClick={() => {
            onClose()
          }} disabled={isConfirming}> {isConfirming ? "Loading..." : "no"}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;