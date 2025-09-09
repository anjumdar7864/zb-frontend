import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from "./DirectImport.module.css";
import ImportFile from './ImportFile';
import LoaderComp from './Loader';
import SuccessComp from './SuccessComp';
import MatchField from './MatchField';
import toast from 'react-hot-toast';
import * as XLSX from "xlsx/xlsx.mjs";
import Papa from "papaparse";
import { addNewDirectImports } from "@/store/actions";
import { useDispatch } from "react-redux";
import WarningModal from './WarningModal';
const DirectImportModal = ({ children, title, comp, wid = "700px", isDisabled }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [step, setStep] = useState(0);
    const [fileData, setFileData] = useState([]);
    const [mappingData, setMappingData] = useState({});
    const [mappedData, setMappedData] = useState({});
    const [fileName, setFileName] = useState("");
    const [originalFile, setOriginalFile] = useState("");
    const [check, setCheck] = useState(true);
    const [optIn, setOptIn] = useState(null)
    const [openWarning, setOpenWarning] = useState(false);
    const [leadSource, setLeadSource] = useState("");


    const [isImporting, setIsImporting] = useState(false); // Prevent multiple dispatches
    //  const [check, setCheck] = useState(true);
    // const [openWarning, setOpenWarning] = useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setComplete(false);
        setStep(0);
        setIsImporting(false);  // Reset the import lock when closing modal
    };

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const user = JSON.parse(localStorage.getItem("user")) ??
        JSON.parse(localStorage.getItem("user"));




    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: step == 1 ?
            width > 1024 ? "700px" : width < 1024 && width > 744 ? "700px" : width < 744 ? "358px" : wid
            : width > 1024 ? "700px" : width < 1024 && width > 744 ? "680px" : width < 744 ? "358px" : wid,
        bgcolor: 'background.paper',
        borderRadius: "16px",
        padding: step == 1 ? "0px" : "20px 16px",
        height: step == 1 ? width > 1024 ? "600px" : width < 1024 && width > 744 ? "600px" : width < 744 ? "auto" : wid : '354px',
    };


    const styleLoading = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width > 1024 ? "700px" : width < 1024 && width > 744 ? "680px" : width < 744 ? "358px" : "auto",
        bgcolor: 'background.paper',
        borderRadius: "16px",
        padding: "20px",
        height: width > 1024 ? "212px" : width < 1024 && width > 744 ? "212px" : width < 744 ? "222px" : "auto",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    };

    const handleImport = () => {
        console.log("mappingData final", mappedData);
        if (optIn == null) {
            toast.error("Select 'Yes' or 'No' to indicate your opt-in status before submitting.");

        } else if (optIn == true && leadSource == "") {
            toast.error("Select the source of your leads before submitting.");
        } else {
            if (areAllRequiredFieldsPresent(mappedData)) {
                setMappedData(mappedData);
                setLoading(true);
                setOpenWarning(false)

            } else {
                toast.error("Please complete all required fields.");
            }
        }

    };

    // const handleImportCheck = (mappingData) => {
    //     console.log("mappingData", mappingData);

    //     if (areAllRequiredFieldsPresent(mappingData)) {
    //         setMappedData(mappingData);

    //         setOpenWarning(true)
    //     } else {
    //         toast.error("Please complete all required fields.");
    //     }
    // };

    const handleImportCheck = (mappingData) => {
        console.log("mappingData", mappingData);

        if (areAllRequiredFieldsPresent(mappingData)) {
            setMappedData(mappingData);

            setOpenWarning(true)


        } else {
            toast.error("Please complete all required fields.");
        }
    };



    const areAllRequiredFieldsPresent = (mappingData) => {
        const requiredFields = [
            "firstName", "lastName", "mailingAddress", "mailingCity",
            "mailingState", "mailingZip", "propertyAddress", "propertyCity",
            "propertyState", "propertyZip", "phone1",
        ];

        return requiredFields.every(
            (field) => mappingData[field] && mappingData[field].trim() !== ""
        );
    };

    const handleFile = (file) => {
        console.log("check file type", file);
        if (file == undefined) {
            toast.error("Please upload a valid file format (CSV, XLSX, or XLS).");
            return;
        }
        if (file) {
            const reader = new FileReader();
            const fileName = file.name;
            setOriginalFile(file);
            reader.onload = (e) => {
                const content = e.target.result;
                setFileName(fileName);



                if (fileName.endsWith(".csv")) {
                    const rows = content.split("\n").filter(row => row.trim() !== ""); // Remove empty rows

                    // parseCSV(content);
                    if (user?.organizationName == "Omid_2" && rows.length <= 100000) {
                        // setStep(1);
                        parseCSV(content);

                    } else if (user?.organizationName == "Marvin_1" && rows.length <= 100000) {
                        // setStep(1);
                        parseCSV(content);

                    } else if (user?.organizationName == "Param_11" && rows.length <= 100000) {
                        // setStep(1);
                        parseCSV(content);

                    } else if (rows.length <= 100000) {
                        // setStep(1);
                        parseCSV(content);


                    } else {
                        toast.error("Please upload a file smaller than 30,000  in length.")
                    }

                } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
                    const workbook = XLSX.read(content, { type: "binary" });
                    const firstSheetName = workbook.SheetNames[0];
                    const firstSheet = workbook.Sheets[firstSheetName];

                    const headers = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })[0];
                    const templateObject = headers.reduce((obj, header) => {
                        obj[header] = "";
                        return obj;
                    }, {});

                    const jsonDataIncludingTemplate = XLSX.utils.sheet_to_json(firstSheet, {
                        header: headers,
                        range: 1,
                    }).map((row) => ({ ...templateObject, ...row }));


                    jsonDataIncludingTemplate.unshift(templateObject);
                    setXLSXandXLS(jsonDataIncludingTemplate);
                    if (jsonDataIncludingTemplate.length < 30000) {
                        setStep(1);

                    } else {
                        toast.error("Please upload a file smaller than 30,000  in length.")
                    }
                } else {
                    toast.error("Unsupported file format. Please upload a CSV, XLSX, or XLS file.");
                }
            };

            if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
                reader.readAsBinaryString(file);
            } else {
                reader.readAsText(file);
            }
        }
    };

    const parseCSV = (content) => {
        Papa.parse(content, {
            header: true,
            complete: (result) => {
                if (result.data.length === 0 || (result.data.length === 1 && result?.data[0][Object?.keys(result?.data[0])[0]] === "")) {
                    toast.error("You can't upload an empty file!");
                    return;
                } else
                    if (result.data.length > 100001 || (result.data.length === 100001 && result?.data[100000][Object?.keys(result?.data[100000])[0]] !== "")) {
                        toast.error("Limit exceed!");
                        return;
                    } else {
                        setStep(1);
                    }

                setFileData(result.data);
            },
            error: () => {
                toast.error("Something went wrong while parsing!");
            },
        });
    };

    const setXLSXandXLS = (content) => {
        if (content.length === 0 || (content.length === 1 && content[0][Object?.keys(content[0])[0]] === "")) {
            toast.error("You can't upload an empty file!");
            return;
        }
        if (content.length > 100001 || (content.length === 100001 && content[100000][Object?.keys(content[100000])[0]] !== "")) {
            toast.error("Limit exceed!");
            return;
        }
        setFileData(content);
    };

    const onProcessingComplete = (body) => {
        if (isImporting) return; // Prevent multiple dispatches if import is already in progress
        setIsImporting(true);  // Set import lock

        if (body) {
            if (originalFile) {
                body.append('originalFile', originalFile);
            }

            dispatch(
                addNewDirectImports(
                    { body },
                    (response) => {
                        // Success: Handle the successful response from the API
                        setLoading(false);
                        setComplete(true);
                        setIsImporting(false);  // Release import lock
                        localStorage.setItem("directImport", true);
                        setOptIn(null)
                        handleClose()
                    },
                    // Error Callback
                    (error) => {
                        // Error: Handle any error from the API response
                        setLoading(false);
                        toast.error("File processing failed. Please try again.");
                        setIsImporting(false);  // Release import lock
                    },
                    check,
                    optIn,
                    leadSource,
                )
            );
        } else {
            setLoading(false);
            setIsImporting(false);  // Release import lock
            toast.error('File processing failed.');
        }
    };



    return (
        <div>
            <div onClick={() => {

                if (!isDisabled) {
                    handleOpen()
                } else {

                }
            }
            }>{children}</div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={loading ? styleLoading : style}>
                    <div style={{ width: '100%' }}>
                        {loading ? (
                            <LoaderComp
                                fileData={fileData}
                                mappedData={mappedData}
                                fileName={fileName}
                                onProcessingComplete={onProcessingComplete}
                            />
                        ) : complete && !loading ? (
                            <SuccessComp closeFunc={handleClose} />
                        ) : step === 0 ? (
                            <ImportFile width={width} closeFunc={handleClose} handleFile={handleFile} />
                        ) : step === 1 ? (
                            <MatchField
                                closeFunc={handleClose}
                                handleImport={handleImportCheck}
                                fileData={fileData}
                                mappingData={mappingData}
                                setMappingData={setMappingData}
                                setCheck={setCheck}
                                check={check}
                            />
                        ) : null}
                    </div>
                </Box>
            </Modal>
            <WarningModal handleImport={handleImport} setOpen={setOpenWarning} open={openWarning} optIn={optIn} setOptIn={setOptIn} leadSource={leadSource} setLeadSource={setLeadSource} check={check} setCheck={setCheck} />
        </div>
    );
};

export default DirectImportModal;
