import React, { useEffect, useState } from 'react'
import PaymentModal from './PaymentModal'
import styles from "./CompanyA.module.css";
import { GoDotFill } from 'react-icons/go';
import Assets from '@/assets';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { commonAPICall } from "@/services/api/common";
import {
    REQUEST_TYPES,
    ENDPOINTS,
} from "@/utils/constant/url";
import { logOut } from '@/store/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const SubscribeThr = ({subscribeTitle}) => {
    const [billingInfo, setBillingInfo] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );
    const fetchBillingInfo = async () => {
        try {
            if (user?.stripeCustomerId) {
                const { data, isError, message , sessionExpired } = await commonAPICall(
                    REQUEST_TYPES.GET,
                    `${ENDPOINTS.GET_BILLING_INFO}?customerId=${user?.stripeCustomerId}`,
                );
                if(sessionExpired){
   

                  
                    // sessionStorage.clear()
                    dispatch(logOut());

                    navigate("/Login");

                  }
                if (isError) {
                    return toast.error(message);
                }
                setBillingInfo(data || {});
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchBillingInfo();
    }, [])

    const handleUpdate = () => {
        fetchBillingInfo();

    }
    return (
        <div>
            <div>
                <div style={{ paddingLeft: "30px", paddingRight: "20px", fontSize: "20px", lineHeight: "24px" }} className={styles.companyInfo_title}> Billing Information</div>
                <div style={{ marginLeft: "30px", marginBottom: "20px" }} className={styles.CompanyBilling_PCard}>
                    <div style={{ flexGrow: 1, borderBottom: "solid 1px #D3D7DD", padding: "20px", display: "flex", flexDirection: "column" }}>
                        <div>
                            <img src={Assets.Images.visa} />
                        </div>
                        <div style={{ flexGrow: 1, display: "flex", alignItems: "end" }}>
                            <div style={{ display: "flex", justifyContent: "space-around", width: "100%", marginBottom: "10px" }}>
                                <span style={{ fontWeight: 500, fontSize: "10px", color: "#999999", display: "flex", alignItems: "center" }}><GoDotFill /><GoDotFill /><GoDotFill /><GoDotFill /></span>
                                <span style={{ fontWeight: 500, fontSize: "10px", color: "#999999", display: "flex", alignItems: "center" }}><GoDotFill /><GoDotFill /><GoDotFill /><GoDotFill /></span>
                                <span style={{ fontWeight: 500, fontSize: "10px", color: "#999999", display: "flex", alignItems: "center" }}><GoDotFill /><GoDotFill /><GoDotFill /><GoDotFill /></span>

                                <span style={{ fontWeight: 500, fontSize: "14px", lineHeight: "22px", color: "#999999" }}>{billingInfo?.card?.last4 || ""}</span>
                                <span style={{ fontWeight: 500, fontSize: "14px", lineHeight: "22px", color: "#999999" }}>{`${billingInfo?.card?.exp_month} / ${billingInfo?.card?.exp_year ? JSON.stringify(billingInfo?.card?.exp_year).substr(-2) : "00"}`}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "40px", width: "100%" }} >

                        <div style={{ width: "130px" }} className={styles.CompanyInfo_button}>
                            <PaymentModal handleUpdate={handleUpdate} >

                                Edit Credit Card
                            </PaymentModal>

                        </div>

                    </div>
                </div>
            </div>
            <div style={{ display: "flex", margin: "20px 20px" }}>
                <div style={{ color: "#00BD82", width: "14px", height: "14px", margin: "0px 5px" }}><IoMdInformationCircleOutline /></div>
                <div style={{ color: "#777777", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>{`Commit to success with our ${subscribeTitle} Plan, packed with advanced tools and dedicated support for real estate professionals ready to get started.`}</div>
            </div>
        </div>
    )
}

export default SubscribeThr
