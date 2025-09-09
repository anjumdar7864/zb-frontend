import React, { useState, useEffect } from 'react'
import styles from "./CompanyA.module.css";
import PlanCardSkeleton from "./PlanCardSkeleton";

import { IoMdInformationCircleOutline } from 'react-icons/io';
import toast from 'react-hot-toast';

const SubscribeFirst = ({ packages = [], selectedPackage = {}, setSelectedPackage, packageType, setPackageType, isLoading = "", packageTypeValidation }) => {

    return (
        <div>
            {
                isLoading === "listing" ?
                    <PlanCardSkeleton /> :
                    <>
                        <div style={{ padding: "0px 20px" }}>
                            <div className={styles.subscribeSmallText}>Subscription</div>
                            <div style={{ display: "flex", border: "solid 1px #D3D7DD", borderRadius: "48px", justifyContent: "space-between", padding: "5px" }}>
                                {
                                    packages && packages.length ?
                                        packages?.map((item) => {
                                            return <div onClick={() => {
                                                setSelectedPackage(item)

                                            }} style={{ backgroundColor: selectedPackage.title == item?.title && "#00BD82", color: selectedPackage.title == item?.title && "white", display: item?.title == "Custom" && "none" }} className={styles.subscribeFirstTab}>{item?.title || ""}</div>
                                        }) : ""
                                }
                            </div>
                        </div>
                        <div style={{ padding: "0px 20px", marginTop: "15px" }}>
                            <div className={styles.subscribeSmallText}>Subscription</div>
                            <div>
                                <div style={{ width: "463px", cursor: packageTypeValidation && "not-allowed" }} className={styles.subscription_cycle}>
                                    <span style={{ cursor: packageTypeValidation && packageType != "yearly" ? "not-allowed" : "" }} 
                                                                      onClick={() => {
                                                                        if (packageTypeValidation && packageType != "yearly") {
                                                                            toast.error("Already subscribed")
                                                                        } else  {
                                                                            setPackageType("yearly")
                                
                                                                        }
                                                                    }} 
                                    className={packageType == "yearly" ? styles.subscription_Annually : styles.subscription_AnnuallyDis}>
                                        <div style={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>Annually</div>
                                        <span>save upto 20%</span>
                                    </span>
                                    <span style={{ cursor: packageTypeValidation && packageType != "mounthly" ? "not-allowed" : "" }}
                                     onClick={() => {
                                        if (packageTypeValidation && packageType != "monthly") {
                                            toast.error("Already subscribed")
                                        } else  {
                                            setPackageType("monthly")

                                        }
                                    }} className={packageType != "monthly" ? styles.subscription_monthly : styles.subscription_monthlyAc}>Monthly</span>
                                </div>
                                <div style={{ color: "#777777", fontSize: "12px", fontWeight: 400, lineHeight: "20px", marginTop: "5px" }}>Pay once a year, commit annually</div>
                            </div>

                            <div style={{ display: "flex", margin: "20px 0px" }}>
                                <div style={{ color: "#00BD82", width: "14px", height: "14px", margin: "0px 5px" }}><IoMdInformationCircleOutline /></div>
                                <div style={{ color: "#777777", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>{`Commit to success with our ${selectedPackage.title} Plan, packed with advanced tools and dedicated support for real estate professionals ready to get started.`}</div>
                            </div>

                        </div>
                    </>
            }

        </div>
    )
}

export default SubscribeFirst;
