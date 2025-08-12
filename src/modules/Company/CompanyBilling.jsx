import React, { useState, useEffect } from 'react'
import styles from './CompanyA.module.css';
import TableA from './Billingtable';
import { BiArrowToLeft } from 'react-icons/bi';
import { IoIosArrowBack, IoIosArrowForward, IoMdMore } from 'react-icons/io';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import DropDown from '@/components/common/DropDwon/DropDown';
import { Country, State, City } from 'country-state-city';
import Assets from '@/assets';
import { RxDotFilled } from 'react-icons/rx';
import { GoDotFill } from 'react-icons/go';
import { commonAPICall } from "@/services/api/common";
import {
    REQUEST_TYPES,
    ENDPOINTS,
    getPaymentHistoryById
} from "@/utils/constant/url";
import PaymentModal from './PaymentModal';
import { CircularLoader } from '@/components/common';
import { Skeleton } from '@mui/material';
import SimpleDialogDemo from '@/components/common/ErrorPopup/ErrorPopup';
import toast from 'react-hot-toast';
import { logOut } from '@/store/actions';



const notify = (e) => toast.success(e);



const CompanyBilling = () => {
    const [billingInfo, setBillingInfo] = useState({});
    const [billingInfoClone, setBillingInfoClone] = useState({});
    const [updatedBillingInfo, setUpdatedBillingInfo] = useState({});
    const [invoices, setInvoices] = useState([]);
    const [billingLoader, setBillingLoader] = useState(false);
    const [invoiceLoader, setInvoiceLoader] = useState(false);
    const [invoiceListLoader, setInvoiceListLoader] = useState(false);
    const [email, setEmail] = useState("");
    const [activeSave, setActiveSave] = useState(false);
    const [activeSaveAddress, setActiveSaveAddress] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [countryCode, setCountryCode] = useState("US")
    const [confirmLoader, setConfirmLoader] = useState(false)
    const [isLoading, setLoader] = useState("");
    const [errorMessage, setErrorMessage] = useState()
    const [errorOpen, setErrorOpen] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(null)
    const [cat, setCAt] = useState("error")
    const [modalMesage, setModalMesage] = useState()
    const [validation, setValidation] = useState(false)
    const [pending, setPending] = useState(false);

    const countries = Country.getAllCountries()
    const states = State.getStatesOfCountry(countryCode)
    const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );
    const fetchBillingInfo = async () => {
        try {
            if (user?.stripeCustomerId) {
                setBillingLoader(true);
                const { data, isError, message, sessionExpired } = await commonAPICall(
                    REQUEST_TYPES.GET,
                    `${ENDPOINTS.GET_BILLING_INFO}?customerId=${user?.stripeCustomerId}`,
                );
                setBillingLoader(false);
                if (sessionExpired) {



                    // sessionStorage.clear()
                    dispatch(logOut());

                    navigate("/Login");

                }
                if (isError) {
                    return toast.error(message);
                }
                const sendInvoiceExtraEmails = data?.sendInvoiceExtraEmails?.split(', ') || [];
                setBillingInfo(data || {});
                setBillingInfoClone(data || {});
                setInvoices(sendInvoiceExtraEmails);
            }
        } catch (error) {
            console.log(error);
        }
    }



    const updateBillingInfoHandler = async () => {
        console.log("checking billing info", updatedBillingInfo);
        if (updatedBillingInfo?.billingZip && updatedBillingInfo?.billingZip.length != 5) {
            return setValidation(true)
        }
        setValidation(false)
        setLoader("saveLoader")
        try {
            if (user?.stripeCustomerId) {
                setInvoiceListLoader(true);
                const payload = { customerId: user?.stripeCustomerId, ...updatedBillingInfo };
                const { data, isError, message, sessionExpired } = await commonAPICall(
                    REQUEST_TYPES.PATCH,
                    ENDPOINTS.UPDATE_BILLING_INFO,
                    payload
                );
                setInvoiceListLoader(false);
                setLoader("")
                if (sessionExpired) {



                    // sessionStorage.clear()
                    dispatch(logOut());

                    navigate("/Login");

                }
                if (isError) {
                    setLoader("")
                    setErrorMessage(message)
                    setErrorOpen(true)
                    setCAt("error")
                    fetchBillingInfo()
                    setModalMesage(message)
                    return toast.error(message);
                }
                // setInvoices(data || [])
                setUpdatedBillingInfo({})
                setErrorOpen(true)
                setCAt("success")
                setActiveSaveAddress(false)
                setActiveSave(false)
            }
        } catch (error) {
            setLoader("")
            setErrorMessage(error)
            setErrorOpen(true)
            setCAt("error")
            fetchBillingInfo();
            console.log(error);

        }
    }
    useEffect(() => {
        fetchBillingInfo();
    }, [])

    const handleUpdate = () => {
        fetchBillingInfo();

    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;


    const valFuncCountry = (e) => {
        setCountryCode(e)



        setBillingInfo({ ...billingInfo, billing_country: e });
        setUpdatedBillingInfo({ ...updatedBillingInfo, billing_country: e });
        setActiveSaveAddress(true)


    }
    const valFuncState = (e) => {
        // setCountryCode(e)

        // setBillingInfo({ ...billingInfo, state : e });
        // setUpdatedBillingInfo({ ...updatedBillingInfo, state : e });
        setBillingInfo({ ...billingInfo, billingState: e });
        setUpdatedBillingInfo({ ...updatedBillingInfo, billingState: e });
        setActiveSaveAddress(true)
    }
    const cancleHandler = () => {
        setActiveSave(false);
        setEmail("");
    }
    const sendInvoiceHandler = async () => {
        setConfirmLoader(true)
        try {
            setInvoiceLoader(true);
            const emails = [email, ...invoices].filter((email) => email !== "" && email !== "No extra emails found");
            const payload = {
                "customerId": user?.stripeCustomerId,
                emails
            }
            const { data, isError, message, sessionExpired } = await commonAPICall(
                REQUEST_TYPES.POST,
                `${ENDPOINTS.SEND_INVOICE}`,
                payload
            );
            setInvoiceLoader(false);
            if (sessionExpired) {



                // sessionStorage.clear()
                dispatch(logOut());

                navigate("/Login");

            }
            if (isError) {
                setErrorMessage(message)
                setErrorOpen(true)
                return toast.error(message);
            }
            notify("'Recipient added successfully'")
            setActiveSave(false);
            setConfirmLoader(false)
            setEmail('');
            setInvoices(emails);
        } catch (error) {
            setErrorMessage(error)
            setErrorOpen(true)
            console.log(error);
        }
    }
    const deleteHandler = async (email = "", index) => {
        setDeleteLoader(index)
        try {
            setInvoiceLoader(true);
            const filteredEmails = invoices.filter(x => x !== email);
            const payload = {
                "customerId": user?.stripeCustomerId,
                emails: filteredEmails
            }
            const { data, isError, message, sessionExpired } = await commonAPICall(
                REQUEST_TYPES.POST,
                `${ENDPOINTS.SEND_INVOICE}`,
                payload
            );

            setInvoiceLoader(false);
            setDeleteLoader(null)
            if (sessionExpired) {



                // sessionStorage.clear()
                dispatch(logOut());

                navigate("/Login");

            }
            if (isError) {
                return toast.error(message);
            }
            notify("Recipient deleted successfully.")
            setActiveSave(false);
            setConfirmLoader(false)
            setEmail('');
            setInvoices(filteredEmails);
        } catch (error) {
            console.log(error);
            setDeleteLoader(null)
        }
    }
    // const billingHandler = (e) => {
    //     const { name, value } = e?.target || {};
    //     setBillingInfo({ ...billingInfo, [name]: value });
    //     setUpdatedBillingInfo({ ...updatedBillingInfo, [name]: value });
    //     setActiveSaveAddress(true)
    // }
    const billingHandler = (e) => {
        const { name, value } = e?.target || {};
        if (name === "address") {
            setUpdatedBillingInfo({ ...updatedBillingInfo, ['billingAddress']: value });
        } else {
            setUpdatedBillingInfo({ ...updatedBillingInfo, [name]: value });
        }
        setBillingInfo({ ...billingInfo, [name]: value });
        setActiveSaveAddress(true)
    }

    useEffect(() => {
        if (billingInfo.billing_country) {
            setCountryCode(billingInfo.billing_country)
        }
    }, [billingInfo])

    console.log("billingInfo", billingInfo);
    
    return (
        <div className={styles.CompanyInfo_container}>

            <div style={{ height: "fitContent", paddingLeft: " 0px", paddingRight: "0px" }} className={styles.Company_securityLayout}>
                <div style={{ paddingLeft: "20px", paddingRight: "20px" }} className={styles.companyInfo_title}>Invoices</div>
                <div>
                    <TableA setPending={setPending} pending={pending} />
                </div>
                <div style={{ padding: "20px" }}>
                    <div className={styles.companyInfo_title}>Send Invoice To</div>
                    <div>
                        <div style={{ borderBottomLeftRadius: activeSave && "0px", borderBottomRightRadius: activeSave && "0px" }} className={styles.invoice_mailListing}>
                            {
                                invoices.map((data, index) => {
                                    return <div style={{ borderBottom: invoices.length > 1 && invoices.length != +index + 1 ? " 1px solid #E0E0E0 " : "" }} className={styles.invoice_mailRow}>
                                        <span style={{ flexGrow: 1, padding: '12px' }}>{data}</span>
                                        <span onClick={handleClick} style={{ borderLeft: "solid 1px #E0E0E0", padding: "0px 12px", display: "flex", alignItems: "center", width: "46px" }}>

                                            <PopupState variant="popover" popupId="demo-popup-popover">
                                                {(popupState) => (
                                                    <div>
                                                        {/* <Button  {...bindTrigger(popupState)}> */}
                                                        {
                                                            deleteLoader == index ?
                                                                <CircularLoader />
                                                                :
                                                                <IoMdMore {...bindTrigger(popupState)} />

                                                        }
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
                                                            <Typography onClick={() => {
                                                                popupState.close();
                                                                deleteHandler(data, index)
                                                            }} sx={{ p: 2 }}><span style={{ cursor: 'pointer' }}>Delete email recipient</span></Typography>
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
                            <input type="text" name='email' value={email || ""} onChange={(e) => setEmail(e?.target?.value)} placeholder='abc@email.com' className={styles.CompanyInfo_fieldsInput} />
                            <div style={{ padding: "0px 20px", width: "fit-content", height: "fit-content", border: 0 }} className={styles.CompanyInfo_fieldsBottom}>
                                <button onClick={() => cancleHandler()} style={{ padding: "12px 12px" }} className={styles.CompanyInfo_undo}>Cancel</button>
                                {
                                    confirmLoader ?
                                        <div style={{ width: "88px", display: "flex", justifyContent: "center" }}>
                                            <CircularLoader />
                                        </div>
                                        :
                                        <button onClick={() => sendInvoiceHandler()} className={styles.CompanyInfo_save} disabled={!email}>Confirm</button>
                                }

                            </div>
                        </div>
                        <div style={{ paddingTop: "20px", marginBottom: "10px", display: activeSave && "none" }}>
                            <div onClick={() => setActiveSave(true)} style={{ width: "fit-content", margin: 0 }} className={styles.CompanyInfo_button}> + Add an Email Recipient</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: "fitContent", paddingBottom: "20px" }} className={styles.Company_securityLayout}>
                <div style={{ paddingBottom: "5px" }} className={styles.companyInfo_title}>Payment Method</div>
                <div style={{ color: "#999999", fontWeight: 400, fontSize: "14px", lineHeight: "22px", marginBottom: "20px" }}>More information in managing your payment method</div>

                <div>
                    {
                        billingInfo?.card?.last4 != undefined || pending || billingInfo?.billing_country || billingInfo?.card == null ?
                            <div className={styles.CompanyBilling_PCard}>
                                <div style={{ flexGrow: 1, borderBottom: "solid 1px #D3D7DD", padding: "20px", display: "flex", flexDirection: "column" }}>
                                    <div>
                                        {billingInfo?.card?.brand ? <img src={Assets.Images.visa} /> : <img src={Assets.Images.visa} />}
                                    </div>
                                    <div style={{ flexGrow: 1, display: "flex", alignItems: "end" }}>
                                        <div style={{ display: "flex", justifyContent: "space-around", width: "100%", marginBottom: "10px" }}>
                                            <span style={{ fontWeight: 500, fontSize: "10px", color: "#999999", display: "flex", alignItems: "center" }}><GoDotFill /><GoDotFill /><GoDotFill /><GoDotFill /></span>
                                            <span style={{ fontWeight: 500, fontSize: "10px", color: "#999999", display: "flex", alignItems: "center" }}><GoDotFill /><GoDotFill /><GoDotFill /><GoDotFill /></span>
                                            <span style={{ fontWeight: 500, fontSize: "10px", color: "#999999", display: "flex", alignItems: "center" }}><GoDotFill /><GoDotFill /><GoDotFill /><GoDotFill /></span>

                                            <span style={{ fontWeight: 500, fontSize: "14px", lineHeight: "22px", color: "#999999" }}>{billingInfo?.card?.last4 || ""}</span>
                                            <span style={{ fontWeight: 500, fontSize: "14px", lineHeight: "22px", color: "#999999" }}>{`${billingInfo?.card?.exp_month == undefined ? "00" : billingInfo?.card?.exp_month} / ${billingInfo?.card?.exp_year ? JSON.stringify(billingInfo?.card?.exp_year).substr(-2) : "00"}`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ height: "40px", width: "100%" }} >

                                    <div style={{ width: "130px" }} className={styles.CompanyInfo_button}>
                                        <PaymentModal handleUpdate={handleUpdate}>
                                            {pending || billingInfo?.card == null ? "Add Credit Card" : " Edit Credit Card"}

                                        </PaymentModal>

                                    </div>

                                </div>
                            </div>
                            :
                            <div>
                                <Skeleton animation="wave" variant="rounded" width={380} height={200} />
                            </div>
                    }

                </div>
                <div style={{ marginTop: "5px" }}>

                    {/* <PaymentModal>
                        <button className={styles.visaButton}>Add New Card</button>
                    </PaymentModal> */}
                </div>
            </div>

            <div style={{ height: "fitContent", paddingLeft: " 0px", paddingRight: "0px" }} className={styles.Company_securityLayout}>
                <div style={{ paddingLeft: "20px", paddingRight: "20px" }} className={styles.companyInfo_title}> Billing Information</div>
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
                                <input maxLength={5} type="text" name='billingZip' value={billingInfo?.billingZip || ""} onChange={(e) => billingHandler(e)} placeholder='Zip Code' style={{ width: "100%" }} className={styles.CompanyInfo_fieldsInput} />
                            </div>
                            {
                                validation && <div style={{ color: "red", fontSize: "10px" }}>Zip code must be exactly 5 digits</div>
                            }

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

                <div
                    style={{
                        height: activeSaveAddress ? "" : "0px",
                        padding: activeSaveAddress ? "" : "0px 20px",
                    }}
                    className={styles.CompanyInfo_fieldsBottom}>
                    <button
                        onClick={() => setActiveSaveAddress(false)}
                        className={styles.CompanyInfo_undo}
                    >
                        Undo
                    </button>
                    {isLoading == "saveLoader" ?
                        <div style={{ width: "133px", display: "flex", justifyContent: "center" }}>
                            <CircularLoader />
                        </div>
                        :
                        <button
                            onClick={() => updateBillingInfoHandler()}
                            className={styles.CompanyInfo_save}

                        >
                            Save changes

                        </button>
                    }
                </div>

            </div>


            <SimpleDialogDemo cat={cat} errorMessage={cat == "error" ? (modalMesage ? modalMesage : "changes not saved") : "changes has been saved"} open={errorOpen} setOpen={setErrorOpen} />
        </div>


    );
};

export default CompanyBilling;
