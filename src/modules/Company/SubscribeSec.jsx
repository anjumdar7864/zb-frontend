import React, { useState, useEffect } from 'react'
import { Country, State, City } from 'country-state-city';
import DropDown from '@/components/common/DropDwon/DropDown';
import styles from "./CompanyA.module.css";
import Popover from '@mui/material/Popover';
import { CircularLoader } from "@/components/common";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { IoIosArrowBack, IoIosArrowForward, IoMdMore } from 'react-icons/io';
import Typography from '@mui/material/Typography';
import { commonAPICall } from "@/services/api/common";
import {
    REQUEST_TYPES,
    ENDPOINTS,
} from "@/utils/constant/url";
import { logOut } from '@/store/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const SubscribeSec = ({ setActiveStep }) => {
    const [billingInfo, setBillingInfo] = useState({});
    const [updatedBillingInfo, setUpdatedBillingInfo] = useState({});
    const [invoices, setInvoices] = useState([]);
    const [email, setEmail] = useState("");
    const [deleteLoader, setDeleteLoader] = useState(null)
    const [errorMessage, setErrorMessage] = useState();
    const [errorOpen, setErrorOpen] = useState(false);
    const [invoiceListLoader, setInvoiceListLoader] = useState(false);
    const [isLoading, setLoader] = useState("");
    const [invoiceLoader, setInvoiceLoader] = useState(false);
    const [countryCode, setCountryCode] = useState("US");
    const [activeSave, setActiveSave] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const countries = Country.getAllCountries()
    const states = State.getStatesOfCountry(countryCode)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );
    const deleteHandler = async (email = "", index) => {
        setDeleteLoader(index)
        try {
            setLoader('deleteInvoiceMail');
            const filteredEmails = invoices.filter(x => x !== email);
            const payload = {
                "customerId": user?.stripeCustomerId,
                emails: filteredEmails
            }
            const { data, isError, message , sessionExpired } = await commonAPICall(
                REQUEST_TYPES.POST,
                `${ENDPOINTS.SEND_INVOICE}`,
                payload
            );
            setLoader('');
            setDeleteLoader(null)
            if(sessionExpired){
   

              
                // sessionStorage.clear()
                dispatch(logOut());

                navigate("/Login");

              }
            if (isError) {
                return toast.error(message);
            }
            setActiveSave(false);
            setEmail('');
            setInvoices(filteredEmails);
        } catch (error) {
            setLoader('');
            console.log(error);
            setDeleteLoader(null)
        }
    }
    const fetchBillingInfo = async () => {
        try {
            if (user?.stripeCustomerId) {
                setLoader('billingInfo');
                const { data, isError, message ,sessionExpired } = await commonAPICall(
                    REQUEST_TYPES.GET,
                    `${ENDPOINTS.GET_BILLING_INFO}?customerId=${user?.stripeCustomerId}`,
                );
                setLoader('');
                if(sessionExpired){
   

                  
                    // sessionStorage.clear()
                    dispatch(logOut());

                    navigate("/Login");

                  }
                if (isError) {
                    return toast.error(message);
                }
                const sendInvoiceExtraEmails = data?.sendInvoiceExtraEmails?.split(', ') || [];
                setBillingInfo(data || {});
                setInvoices(sendInvoiceExtraEmails);
            }
        } catch (error) {
            setLoader('');
            console.log(error);
        }
    };
    const updateBillingInfoHandler = async () => {
        setLoader("saveLoader")
        try {
            if (user?.stripeCustomerId && Object.keys(updatedBillingInfo).length) {
                setInvoiceListLoader(true);
                const payload = { customerId: user?.stripeCustomerId, ...updatedBillingInfo };
                const { data, isError, message ,sessionExpired } = await commonAPICall(
                    REQUEST_TYPES.PATCH,
                    ENDPOINTS.UPDATE_BILLING_INFO,
                    payload
                );
                setInvoiceListLoader(false);
                setLoader("")
                if(sessionExpired){
   

                  
                    // sessionStorage.clear()
                    dispatch(logOut());

                    navigate("/Login");

                  }
                if (isError) {
                    setLoader("")
                    setErrorMessage(message)
                    setErrorOpen(true)
                    // fetchBillingInfo()
                    return toast.error(message);
                }
                // setInvoices(data || [])
                setUpdatedBillingInfo({})
                setErrorOpen(true)
                setActiveStep(3);
                setActiveSave(false)
            } else {
                setActiveStep(3)
            }
        } catch (error) {
            setLoader("")
            setErrorMessage(error)
            setErrorOpen(true)
            fetchBillingInfo();
        }
    }
    const valFuncCountry = (e) => {
        setCountryCode(e)
        setBillingInfo({ ...billingInfo, billing_country: e });
        setUpdatedBillingInfo({ ...updatedBillingInfo, billing_country: e });
    }
    const valFuncState = (e) => {
    }
    const cancleHandler = () => {
        setActiveSave(false);
        setEmail("");
    }
    const sendInvoiceHandler = async () => {
        try {
            setLoader("sendInvoice");
            const emails = [email, ...invoices].filter((email) => email !== "" && email !== "No extra emails found");
            const payload = {
                "customerId": user?.stripeCustomerId,
                emails
            }
            const { data, isError, message ,sessionExpired } = await commonAPICall(
                REQUEST_TYPES.POST,
                `${ENDPOINTS.SEND_INVOICE}`,
                payload
            );
            setLoader('');
            if(sessionExpired){
   

              
                // sessionStorage.clear()
                dispatch(logOut());

                navigate("/Login");

              }
            if (isError) {
                setErrorMessage(message)
                setErrorOpen(true)
                return toast.error(message);
            }
            setActiveSave(false);
            setEmail('');
            setInvoices(emails);
        } catch (error) {
            setLoader('')
            setErrorMessage(error)
            setErrorOpen(true)
            console.log(error);
        }
    }
    const billingHandler = (e) => {
        const { name, value } = e?.target || {};
        if (name === "address") {
            setUpdatedBillingInfo({ ...updatedBillingInfo, ['billingAddress']: value });
        } else {
            setUpdatedBillingInfo({ ...updatedBillingInfo, [name]: value });
        }
        setBillingInfo({ ...billingInfo, [name]: value });
        // setActiveSaveAddress(true)
    }
    useEffect(() => {
        fetchBillingInfo();
    }, [])
    
useEffect(()=>{
    if(billingInfo.billing_country){
        setCountryCode(billingInfo.billing_country)
    }
},[billingInfo])
    return (
        <div>
            <div style={{ height: "fitContent", paddingLeft: " 0px", paddingRight: "0px", border: "none", marginTop: "0px" }} className={styles.Company_securityLayout}>
                <div style={{ paddingLeft: "20px", paddingRight: "20px", fontSize: "20px" }} className={styles.companyInfo_title}> Billing Information</div>
                <div style={{ paddingLeft: "20px", paddingRight: "20px", maxWidth: "724px" }}>
                    <div>
                        <div className={styles.CompanyBilling_label}>Address</div>
                        <div>
                            <input type="text" name='address' value={billingInfo?.address || ""} onChange={(e) => billingHandler(e)} placeholder='Address' style={{ width: "100%" }} className={styles.CompanyInfo_fieldsInput} />
                        </div>
                    </div>


                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", width: "100%", marginTop: "20px" }}>


                        <div style={{ flexGrow: 1, gridColumn: "1" }}>
                            <div className={styles.CompanyBilling_label}>Zip Code</div>
                            <div>
                                <input type="text" name='billingZip' value={billingInfo?.billingZip || ""} onChange={(e) => billingHandler(e)} placeholder='Zip Code' style={{ width: "100%" }} className={styles.CompanyInfo_fieldsInput} />
                            </div>
                        </div>


                        <div style={{ flexGrow: 1, gridColumn: "2" }}>
                            <div className={styles.CompanyBilling_label}>City</div>
                            <div>
                                <input type="text" name='billingCity' value={billingInfo?.billingCity || ""} onChange={(e) => billingHandler(e)} placeholder='City' style={{ width: "100%" }} className={styles.CompanyInfo_fieldsInput} />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", width: "100%", marginTop: "20px", paddingBottom: "20px" }}>


                        <div style={{ flexGrow: 1, gridColumn: "1" }}>
                            <div style={{ marginBottom: "5px" }} className={styles.CompanyBilling_label}>Billing Country</div>
                            <div>
                                <DropDown valueKey="isoCode" name="billing_country" option={"name"} defaultValue={billingInfo?.billing_country ? billingInfo?.billing_country : "US"} ArrData={countries} format={"country"} valFunc={valFuncCountry} />
                            </div>
                        </div>


                        <div style={{ flexGrow: 1, gridColumn: "2" }}>
                            <div style={{ marginBottom: "5px" }} className={styles.CompanyBilling_label}>State</div>
                            <div>
                                <DropDown name="" valueKey="isoCode" option={"name"} ArrData={states} defaultValue={billingInfo?.billingState ? billingInfo?.billingState : ""} valFunc={valFuncState} />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div>

                <div style={{ padding: "20px" }}>
                    <div style={{ fontSize: "20px" }} className={styles.companyInfo_title}>Send Invoice To</div>
                    <div>
                        <div style={{ borderBottomLeftRadius: activeSave && "0px", borderBottomRightRadius: activeSave && "0px" }} className={styles.invoice_mailListing}>
                            {
                                invoices.map((data, index) => {
                                    return <div style={{ borderBottom: invoices.length > 1 && invoices.length != +index + 1 ? " 1px solid #E0E0E0 " : "" }} className={styles.invoice_mailRow}>
                                        <span style={{ flexGrow: 1, padding: '12px' }}>{data}</span>
                                        <span onClick={handleClick} style={{ borderLeft: "solid 1px #E0E0E0", padding: "0px 12px", display: "flex", alignItems: "center" }}>

                                            <PopupState variant="popover" popupId="demo-popup-popover">
                                                {(popupState) => (
                                                    <div>
                                                        {/* <Button  {...bindTrigger(popupState)}> */}
                                                        <IoMdMore {...bindTrigger(popupState)} />
                                                        {/* </Button> */}
                                                        <Popover
                                                            {...bindPopover(popupState)}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: '',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: '',
                                                            }}
                                                        >
                                                            <Typography onClick={() => deleteHandler(data, index)} sx={{ p: 2 }}><span style={{ cursor: 'pointer' }}>Delete email recipient</span></Typography>
                                                        </Popover>
                                                    </div>
                                                )}
                                            </PopupState>
                                        </span>
                                    </div>
                                })
                            }
                        </div>
                        <div style={{ display: !activeSave && "none" }} className={styles.addMAil}>
                            <input type="text" name='email' value={email || ""} onChange={(e) => setEmail(e?.target?.value)} placeholder='email@email.com' className={styles.CompanyInfo_fieldsInput} />
                            <div style={{ padding: "0px 20px", width: "fit-content", height: "fit-content", border: 0 }} className={styles.CompanyInfo_fieldsBottom}>
                                <button onClick={() => cancleHandler()} style={{ padding: "12px 12px" }} className={styles.CompanyInfo_undo}>Cancel</button>
                                {
                                    isLoading === "sendInvoice" ?
                                        <CircularLoader /> :
                                        <button onClick={() => sendInvoiceHandler()} className={styles.CompanyInfo_save} disabled={false}>Confirm</button>
                                }
                            </div>
                        </div>
                        <div style={{ paddingTop: "20px", marginBottom: "10px", display: activeSave && "none" }}>
                            <div onClick={() => setActiveSave(true)} style={{ width: "fit-content", margin: 0, color: "#00BD82" }} className={styles.CompanyInfo_button}><span style={{ color: "#012635" }}>+</span>  Add an Email Recipient</div>
                        </div>
                    </div>
                </div>


            </div>
            <div style={{ height: "88px", display: "flex", justifyContent: "end", padding: "0px 20px", alignItems: "center", borderTop: "solid 1px #E0E0E0" }}>
                <button onClick={() => setActiveStep(1)} style={{ width: "100px", marginRight: "20px", height: "40px", border: "solid 1px #777777", }} className={styles.CompanyInfo_undo}>Previous</button>
                {
                    isLoading === "saveLoader" ?
                        <CircularLoader /> :
                        <button
                            style={{ width: "120px", height: "40px" }} className={styles.CompanyInfo_save}
                            onClick={() => updateBillingInfoHandler()}
                        >
                            Confirm

                        </button>
                }

            </div>
        </div>
    )
}

export default SubscribeSec
