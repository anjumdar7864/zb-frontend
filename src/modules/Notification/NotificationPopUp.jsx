import React from "react";
// import styles from './NotificationPopUp.module.css';
import styles from './Popup.module.css';

export default function PreviewModal({ isOpen, onClose, form, previewText, previewSub , category }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* <div className={styles.header}>Preview</div> */}

        <div className={styles.previewContainer}>
          {category === "Warning" ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#FFF3CD" stroke="#FFC107" strokeWidth="2" />
              <path d="M12 7v6" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="#FFC107" />
            </svg>
          ) : category === "Alert" ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
              <path d="M12 8v4" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="#EF4444" />
            </svg>
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
              <path d="M8 12l3 3 5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}

          <div className={styles.title}>{previewText || "Warning"}</div>
          <p className={styles.description}>
            {previewSub || "Please be aware of this important notification."}
          </p>

          <button className={styles.okButton} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
