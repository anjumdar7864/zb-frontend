import React from 'react';
import DirectImportModal from './DirectImportModall';
import styles from "./DirectImport.module.css";

const ImportListButton = ({ isDisabled , directImportData }) => {
    console.log("directImportData", directImportData);
    return (
        <div>
            <DirectImportModal isDisabled={isDisabled || directImportData?.status == "pending"} title={"Import"}>
                <div
                    className={`${styles.SaveBtn} body4SemiBold textWhiteColor '`}
                    style={{
                        width: "143px",
                        height: "40px",
                        backgroundColor: isDisabled || directImportData?.status == "pending" ? "#cccccc" : "#00BD82", // Change color when disabled
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // color: "white",
                        cursor: isDisabled ? "not-allowed" : "pointer" // Disable the cursor and click when disabled
                    }}
                    disabled={isDisabled}
                >
                    {isDisabled ? "Please wait" : "Import List"} {/* Change text */}
                </div>
            </DirectImportModal>
        </div>
    );
};

export default ImportListButton;
