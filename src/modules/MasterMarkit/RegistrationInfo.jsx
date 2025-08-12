import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdOutlineClose } from 'react-icons/md';
import { LuAsterisk } from 'react-icons/lu';
import styles from "./MarkitMaster.module.css";
import PhoneInput from 'react-phone-input-2';
import Select, { components } from "react-select";
import { SlArrowDown } from 'react-icons/sl';
import { CircularLoader } from '@/components/common';
import { commonAPICall } from "@/services/api/common";
import { toast } from "react-hot-toast";
import { State } from 'country-state-city';
import { StyledSelect } from "@/modules/Settings/MarketLists/styles";
import {
    REQUEST_TYPES,
    ENDPOINTS,
} from "@/utils/constant/url";
import { logOut } from '@/store/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: "16px",
    maxHeight: "95vh",

};
const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
        <SlArrowDown style={{ color: "#012635" }} />
    </components.DropdownIndicator>
);
const options = [
    { value: "", label: "Please select" },
    { value: "Publicly Traded Company", label: "Publicly Traded Company" },
    { value: "Private Company", label: "Private Company" },
    { value: "Non-Profit Company", label: "Non-Profit Company" },
    { value: "Government", label: "Government" },
    { value: "Sole Proprietor", label: "Sole Proprietor" },

]
export default function RegisterationInfo({ open, setOpen, tenantId = "", selectedRecord, refreshData }) {
    const [initialState, setState] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    const [loading, setLoading] = useState(false)
    const [errorMesages, setErrorMessages] = useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const stateData = State.getStatesOfCountry("US")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("tenantId", tenantId , "selectedRecord", selectedRecord);
    
    const fetchData = async (id = "") => {
        try {
            const { data, isError, message, sessionExpired } = await commonAPICall(
                REQUEST_TYPES.GET,
                `${ENDPOINTS.GET_SINGLE_DIC_BY_TENANTID}/${id}`
            );
            if (sessionExpired) {



                // sessionStorage.clear()
                dispatch(logOut());

                navigate("/Login");

            }
            if (isError) {
                return toast.error(message);
            }
            setState({
                ...initialState,
                ...data,
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        open && tenantId && fetchData(tenantId);
    }, [tenantId, open]);
    useEffect(() => {
        if (selectedRecord && Object.keys(selectedRecord).length) {
            const phoneNumber = selectedRecord?.phoneNumber.startsWith("1") ? selectedRecord?.phoneNumber : `1${selectedRecord?.phoneNumber}`
            setState({
                ...initialState,
                ...selectedRecord,
                phoneNumber
            })
        }
    }, [selectedRecord])
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "solid 1px #d3d7dd",
            borderColor: state.isFocused ? '#5BF1B2' : '#5BF1B2',  // Change border color
            height: '50px',                                      // Set height
            minHeight: '100%',                                   // Ensure it respects the height
            width: '100%',                                      // Set width
            borderRadius: '8px',                                 // Set border radius
            boxShadow: state.isFocused ? 'none' : 'none', // Add shadow on focus
            '&:hover': {
                border: 'solid 1px #5BF1B2',                             // Change border color on hover
            },
            outline: 'none',
            color: "#777777"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#777777',                                       // Placeholder color
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            // color: '#3498db',                                    // Dropdown icon color
            '&:hover': {
                // color: '#2980b9',                                   // Dropdown icon hover color
            },
        }),
        indicatorSeparator: () => ({
            display: 'none',                                     // Remove the separator
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#777777", // Color of selected value text
        }),
    };
    // New validation function
    const validateForm = () => {
        const { marketName,
            zip,
            state,
            email,
            phoneNumber,
            websiteUrl,
            verticleType,
            legalCompanyName,
            ein,
            brandName,
            firstName,
            lastName,
            mailingAddress,
            city
        } = initialState || {};

        console.log("intial message", initialState);


        const errorMesages = {};
        if (!marketName || !marketName.trim()) {
            errorMesages.marketName = "Market Name should not be empty."
        }

        if (!ein || !ein.trim()) {
            errorMesages.ein = "EIN Name should not be empty."
        }
        if (!brandName || !brandName.trim()) {
            errorMesages.brandName = "Brand Name should not be empty."
        }
        if (!firstName || !firstName.trim()) {
            errorMesages.firstName = "First Name should not be empty."
        }
        if (!lastName || !lastName.trim()) {
            errorMesages.lastName = "Last Name should not be empty."
        }
        if (!mailingAddress || !mailingAddress.trim()) {
            errorMesages.mailingAddress = "Mailing Address should not be empty."
        }
        if (!phoneNumber || phoneNumber.length <= 10 || !phoneNumber.trim()) {
            errorMesages.phoneNumber = "Phone number should not be empty."
        }
        if (!city || !city.trim()) {
            errorMesages.city = "City should not be empty."
        }
        // Vertical type validation: minimum 2 characters
        if (!verticleType || verticleType.length < 2) {
            errorMesages.verticleType = "Vertical type must be at least 2 characters long."
        }
        // Website URL validation
        const urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
        if (!websiteUrl || !urlRegex.test(websiteUrl)) {
            errorMesages.websiteUrl = "Please enter a valid website URL."
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errorMesages.email = "Please enter a valid email address."
        }
        // Zip code validation: max 5 characters
        if (!zip || zip.length !== 5) {
            errorMesages.zip = "Zip code should be 5 characters."
        }

        // State validation: must not be empty
        if (!state || state === "") {
            errorMesages.state = "Please select a state."
        }
        if (!legalCompanyName || legalCompanyName == "Please select" || !legalCompanyName.trim()) {
            errorMesages.legalCompanyName = "legal Company Name should not be empty."
        }
        setErrorMessages(errorMesages)
        if (Object.keys(errorMesages).length) {
            return false;
        }
        return true;
    };
    const submitHandler = async (id = "") => {
        if (!validateForm()) {
            return;
        }
        try {
            const cloneData = { ...initialState };
            const tenantId = id || cloneData?.tenantId?._id;
            delete cloneData._id;
            delete cloneData.tenantId;
            delete cloneData.createdAt;
            // Phone number validation: remove leading 1 if present
            if (cloneData?.phoneNumber && cloneData?.phoneNumber.startsWith("1")) {
                cloneData.phoneNumber = initialState?.phoneNumber.substring(1)
            }
            const { data, isError, message, sessionExpired } = await commonAPICall(
                REQUEST_TYPES.PATCH,
                `${ENDPOINTS.UPDATE_SINGLE_DIC_BY_TENANTID}/${tenantId}`,
                { ...cloneData },
            );
            if (sessionExpired) {



                // sessionStorage.clear()
                dispatch(logOut());

                navigate("/Login");

            }
            if (isError) {
                return toast.error(message);
            }
            toast.success('Sucessfully updated.')
            setState({});
            setReadOnly(true);
            handleClose(false);
            refreshData && refreshData(1, 10);
        } catch (error) {
            console.log(error);
        }
    };
    const changeHanlder = (e) => {


        const cloneErrorMessages = { ...errorMesages };
        const { name, value } = e?.target;
        console.log("intial message....", name);

        if (name == "websiteUrl") {
            const urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
            if (value && urlRegex.test(value) && cloneErrorMessages[name]) {
                delete cloneErrorMessages[name];
                setErrorMessages(cloneErrorMessages);
            }
        } else if (name == "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && emailRegex.test(value) && cloneErrorMessages[name]) {
                delete cloneErrorMessages[name];
                setErrorMessages(cloneErrorMessages);
            }
        } else {
            if (value && cloneErrorMessages[name]) {
                delete cloneErrorMessages[name];
                setErrorMessages(cloneErrorMessages);
            }
        }

        setState({
            ...initialState,
            [name]: value
        })
    }
    const closeHandler = () => {
        setState({});
        setReadOnly(true);
        handleClose();
    }
    const saveHandler = () => {
        if (readOnly) {
            setReadOnly(false)
        } else {
            submitHandler(tenantId);
        }
    }
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={closeHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        <div style={{ padding: "16px", color: "#012635", fontSize: "18px", fontWeight: 600, lineHeight: "26px", borderBottom: "solid 1px #F7F7F7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Registration info</span>
                            <span><MdOutlineClose onClick={() => closeHandler()} style={{ fontSize: "24px", cursor: "pointer" }} /></span>
                        </div>
                        <div style={{ maxHeight: "70vh", overflow: "auto" }}>

                            <div style={{ padding: "10px 24px" }}>
                                <div style={{ display: "flex", gap: "16px" }}>
                                   
                                         <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>DIBA or Brand name<LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} placeholder='XYZ Solution' name="brandName" value={initialState?.brandName} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.brandName ? <span style={{ color: 'red' }}>{errorMesages?.brandName}</span> : ""}


                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>What Type of legal form is the org?<LuAsterisk style={{ color: "red" }} /></label>
                                        <Select
                                            isDisabled={readOnly}
                                            value={{ label: initialState?.legalCompanyName, value: initialState?.legalCompanyName }}
                                            onChange={(val) => {
                                                setState({ ...initialState, 'legalCompanyName': val?.label })
                                                const cloneErrorMessages = { ...errorMesages };
                                                const name = "legalCompanyName"
                                                if (val?.label != "Please select") {
                                                    delete cloneErrorMessages[name];
                                                    setErrorMessages(cloneErrorMessages);
                                                }

                                            }}
                                            styles={customStyles}
                                            options={options}
                                            components={{ DropdownIndicator: CustomDropdownIndicator }}
                                            isSearchable
                                            placeholder="Sole proprietorship: "
                                        />
                                        {errorMesages && errorMesages?.legalCompanyName ? <span style={{ color: 'red' }}>{errorMesages?.legalCompanyName}</span> : ""}
                                    </div>
                                </div>
                            </div>


                            <div style={{ padding: "10px 24px" }}>
                                <div style={{ display: "flex", gap: "16px" }}>
                                      <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Legal Company Name<LuAsterisk style={{ color: "red" }} /></label>
                                        <input placeholder='XYZ Solution' name="marketName" value={initialState?.marketName} onChange={(e) => changeHanlder(e)} disabled={readOnly} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.marketName ? <span style={{ color: 'red' }}>{errorMesages?.marketName}</span> : ""}
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>EIN<LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} maxLength={30} placeholder='XX-XXXXXX' name="ein" value={initialState?.ein} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.ein ? <span style={{ color: 'red' }}>{errorMesages?.ein}</span> : ""}

                                    </div>
                                   
                                
                                </div>
                            </div>


                            <div style={{ padding: "10px 24px" }}>
                                <div style={{ display: "flex", gap: "16px" }}>
                                   
                                       <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Phone number <LuAsterisk style={{ color: "red" }} /></label>
                                        <PhoneInput
                                            country={'us'}
                                            disableDropdown={true}
                                            value={initialState?.phoneNumber}
                                            onChange={(phoneNumber) => {
                                                setState({ ...initialState, phoneNumber })
                                                const cloneErrorMessages = { ...errorMesages };
                                                const name = "phoneNumber"
                                                console.log("intial message", phoneNumber);

                                                if (phoneNumber.length == 11) {
                                                    delete cloneErrorMessages[name];
                                                    setErrorMessages(cloneErrorMessages);
                                                }

                                            }}
                                            inputStyle={{ border: "solid 1px #D3D7DD", height: "48px", borderRadius: "8px", color: "#777777", }}
                                            containerStyle={{ backgroundColor: readOnly && "#F0F0F0", borderRadius: "8px", }}
                                            disabled={readOnly && true}
                                        />
                                        {errorMesages && errorMesages?.phoneNumber ? <span style={{ color: 'red' }}>{errorMesages?.phoneNumber}</span> : ""}

                                    </div>
                                   
                                      <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Email<LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} placeholder='Email' name="email" value={initialState?.email} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.email ? <span style={{ color: 'red' }}>{errorMesages?.email}</span> : ""}

                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: "10px 24px" }}>
                                <div style={{ display: "flex", gap: "16px" }}>
                                 
                                       <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Mailing Address<LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} placeholder='Mailing Address' name="mailingAddress" value={initialState?.mailingAddress} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.mailingAddress ? <span style={{ color: 'red' }}>{errorMesages?.mailingAddress}</span> : ""}

                                    </div>
                                                         <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>City<LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} placeholder='City' name="city" value={initialState?.city} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.city ? <span style={{ color: 'red' }}>{errorMesages?.city}</span> : ""}

                                    </div>
                             
                                </div>
                            </div>
                            <div style={{ padding: "10px 24px" }}>
                                <div style={{ display: "flex", gap: "16px" }}>
                                   <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>State<LuAsterisk style={{ color: "red" }} /></label>
                                        <StyledSelect
                                            className="select"
                                            value={initialState?.state || ""}
                                            style={{ backgroundColor: readOnly && "#F0F0F0" }}
                                            name="state"
                                            onChange={(e) => changeHanlder(e)}
                                            disabled={readOnly && true}
                                        >
                                            <option value="">
                                                Select
                                            </option>
                                            {
                                                stateData?.map((data, index) => {
                                                    return (
                                                        <option value={data?.name}>
                                                            {data.name}
                                                        </option>
                                                    )
                                                })
                                            }

                                        </StyledSelect>
                                        {errorMesages && errorMesages?.state ? <span style={{ color: 'red' }}>{errorMesages?.state}</span> : ""}
                                    </div>
                                                   <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Zip Code<LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} maxLength={5} placeholder='Zip Code' name="zip" value={initialState?.zip} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.zip ? <span style={{ color: 'red' }}>{errorMesages?.zip}</span> : ""}

                                    </div>
                                </div>
                            </div>
                         
                            <div style={{ padding: "10px 24px" }}>
                                <div style={{ display: "flex", gap: "16px" }}>
               
                                     <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Vertical type<LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} placeholder='Information and Technology' name="verticleType" value={initialState?.verticleType} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.verticleType ? <span style={{ color: 'red' }}>{errorMesages?.verticleType}</span> : ""}
                                    </div>
                     
                                     <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Website URL<LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} placeholder='https://www.xyzsolution.com' name="websiteUrl" value={initialState?.websiteUrl} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.websiteUrl ? <span style={{ color: 'red' }}>{errorMesages?.websiteUrl}</span> : ""}


                                    </div>
                                </div>
                            </div>




                              <div style={{ padding: "10px 24px" }}>
                                <div style={{ display: "flex", gap: "16px" }}>
               
                                    <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>First name <LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} placeholder='First name' name="firstName" value={initialState?.firstName} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.firstName ? <span style={{ color: 'red' }}>{errorMesages?.firstName}</span> : ""}


                                    </div>
                                           <div style={{ width: "50%" }}>
                                        <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Last name <LuAsterisk style={{ color: "red" }} /></label>
                                        <input disabled={readOnly} placeholder='Last name' name="lastName" value={initialState?.lastName} onChange={(e) => changeHanlder(e)} style={{ backgroundColor: readOnly && '#F0F0F0' }} className={styles.outbondInput} />
                                        {errorMesages && errorMesages?.lastName ? <span style={{ color: 'red' }}>{errorMesages?.lastName}</span> : ""}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: "16px", borderTop: "solid 1px #F0F0F0", height: "72px", display: "flex", justifyContent: "space-between", gap: "16px" }}>
                            <div>
                                {
                                    readOnly && <div onClick={() => setReadOnly(false)} style={{ color: "#012635", backgroundColor: "#F0F0F0", borderRadius: "8px", height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                        Edit
                                    </div>
                                }

                            </div>

                            <div style={{ display: "flex", gap: "16px" }}>
                                <div onClick={() => closeHandler()} style={{ color: "#777777", border: "solid 1px #777777", borderRadius: "8px", height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                    Cancel
                                </div>
                                {
                                    loading ?
                                        <div style={{ color: "white", borderRadius: "8px", height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", }}>

                                            <CircularLoader />
                                        </div>
                                        :
                                        <div>
                                            {
                                                !readOnly && <div onClick={() => saveHandler()} style={{ color: "white", backgroundColor: "#00BD82", borderRadius: "8px", height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                                    {readOnly ? "Edit" : "Update"}
                                                </div>
                                            }

                                        </div>

                                }
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
