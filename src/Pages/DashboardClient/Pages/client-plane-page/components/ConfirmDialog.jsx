import { useEffect, useRef } from "react";

const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  const dialogRef = useRef(null);

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

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog-box" ref={dialogRef}>
        <h2 className="dialog-title">Are you sure?</h2>
        <p className="dialog-message">
          Changing or updating your plan will result in <strong>losing any unused benefits</strong>.
          Do you want to proceed?
        </p>
        <div className="dialog-actions">
          <button className="main-button" onClick={onConfirm}>Yes</button>
          <button className="secondary-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;