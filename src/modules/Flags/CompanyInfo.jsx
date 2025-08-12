import React from 'react'
import styles from './Flags.module.css'
import Assets from '@/assets'
import CompanyPopup from './CompanyPopup'
import { useNavigate } from 'react-router-dom'
const CompanyInfo = ({detail}) => {
    const navigate = useNavigate();
  
    
    return (
        <div className={styles.info_container}>
            <div className={styles.info_top}>
                Company Information
            </div>
            <div className={styles.info_bottom}>
                <div className={styles.info_box}>
                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                        <span className={styles.info_box_title}>Tenant name</span>
                        <div onClick={() => navigate(`/flags/edit/${detail?._id}`)} style={{ backgroundColor: "white", border: 'solid 1px #E0E0E0', borderRadius: "8px", height: "32px", width: "32px", display: "flex", justifyContent: "center", alignItems: "center", translate: "10px -10px" }}><img src={Assets.Icons.TenantIcon} /></div>
                    </div>
                    <div>{`${detail?.firstName} ${detail?.lastName}`}</div>
                </div>
                <div className={styles.info_box}>
                    <div >
                        <div className={styles.info_box_title}>Company name</div>

                    </div>
                    <div>{detail?.companyName}</div>
                </div>
                <div className={styles.info_box}>
                    <div >
                        <div className={styles.info_box_title}>Email</div>
               
                    </div>
                    <div>{detail?.email}</div>
                </div>
                <div className={styles.info_box}>
                    <div >
                        <div className={styles.info_box_title}>Number</div>
                       
                    </div>
                    <div>{detail?.phoneNumber}</div>
                </div>

                <div className={styles.info_box}>
                    <div >
                        <div className={styles.info_box_title}>Plan</div>
                     
                    </div>
                    <div style={{     color:
                      detail?.subscriptionId?.title == "Time to Scale"
                        ? "#005ABB"
                        : detail?.subscriptionId?.title == "I'm Serious"
                        ? "#06AB78"
                        : detail?.subscriptionId?.title == "Market Dominator"
                        ? "#012635"
                        : detail?.subscriptionId?.title == "Jumpstart JV"
                        ? "#B1264D"
                        : "#F49C17", fontWeight: 500, fontSize: "14px",
                         backgroundColor:  
                          detail?.subscriptionId?.title == "Time to Scale"
                         ? "#E8F0FB"
                         : detail?.subscriptionId?.title == "I'm Serious"
                         ? "#E1F3EE"
                         : detail?.subscriptionId?.title == "Market Dominator"
                         ? "#D6EFF9"
                         : detail?.subscriptionId?.title == "Jumpstart JV"
                         ? "#FADEE4"
                         : "#FDF5E0",
                          maxWidth: "fit-content", border: `solid 1px ${
                            detail?.subscriptionId?.title == "Time to Scale"
                              ? "#005ABB"
                              : detail?.subscriptionId?.title == "I'm Serious"
                              ? "#00BD82"
                              : detail?.subscriptionId?.title == "Market Dominator"
                              ? "#012635"
                              : detail?.subscriptionId?.title == "Jumpstart JV"
                              ? "#E85B79"
                              : "#F49C17"
                          } `, borderRadius: "12px", padding: "2px 8px" }}>{detail?.subscriptionId?.title}</div>
                </div>
            </div>
         
        </div>
    )
}

export default CompanyInfo
