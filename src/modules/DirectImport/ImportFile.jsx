import React from "react";
import styles from "./DirectImport.module.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { downloadCsvAdmin } from "@/store/actions";
import { AiOutlineClose } from "react-icons/ai";

const ImportFile = ({ closeFunc, handleFile, width }) => {
  const onDrop = (acceptedFiles) => {
    handleFile(acceptedFiles[0]); // Pass the first file
    // console.log(acceptedFiles);
  };
  const dispatch = useDispatch()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
  });

  const handleDownload = () => {
    try {
      dispatch(downloadCsvAdmin());
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: width < 1024 ? '26px' : '24px', }}>
        <h6 style={{
          lineHeight: '26px',
          color: "#012635",
          fontSize: "18px",
          fontWeight: 600
        }}>Import</h6>
        <AiOutlineClose onClick={closeFunc} size={24} color="#012635" />
      </div>
      <div
        {...getRootProps()}
        style={{
          border:
            "dashed 1px var(--shades-black-shade-black-20, rgba(0, 0, 0, 0.20))",
          padding: "7px",
          borderRadius: "14px",
          height: "192px"
        }}
      >
        <div
          className={`${styles.custom_file_upload} ${isDragActive ? "active" : ""
            }`}
        >
          <input
            onChange={(e) => handleFile(e.target.files[0])} // Pass the first file
            {...getInputProps()}
            className={styles.file_input}
          />
          <BsFillPlusCircleFill
            size={36} style={{ color: "#005ABB" }}
          />
          <div className={styles.upload_text}>Import (.xlsx / .xls / .csv)</div>
        </div>
        <div className={styles.drafFile}>
          <div
            style={{
              color: "#777777",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              marginTop: "8px"
            }}
          >
            Or drag & Drop
          </div>
        </div>

      </div>
      <div style={{ display: "flex", marginTop: "10px", justifyContent: "space-between", alignItems: "center", marginTop: '30px' }}>
        <a href="/list_import_template.csv" download="sample.csv">
          <div style={{ fontSize: width < 744 ? "11px" : "14px", fontWeight: 500, lineHeight: "22px", color: "#6955DA", cursor: "pointer" }}>Click here to download sample import file</div>
        </a>
        <div onClick={closeFunc} style={{ border: "solid 1px #777777", fontSize: "16px", fontWeight: 500, lineHeight: "24px", color: "#777777", borderRadius: "8px", height: "40px", width: "76px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>Cancel</div>
      </div>
      {/* Rest of your code */}
    </div>
  );
};

export default ImportFile;
