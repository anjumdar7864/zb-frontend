import React from 'react'
import styles from './Careers.module.css'

const CareersRoles = () => {
    const jobs = [
        { title: "(Senior) Brand Designer", location: "San Francisco" },
        { title: "Account Executive - DACH", location: "Berlin" },
        { title: "Account Executive - FIME Market (France, Italy, Middle-East)", location: "Paris" },
        { title: "Account Executive - UKI Market", location: "London" },
        { title: "Account Executive - West Coast", location: "San Francisco" },
        { title: "Account Executive Market Lead - LATAM (Polanco | Mexico City)", location: "Mexico City" },
        { title: "Account Receivable - Cash Collection Specialist", location: "Paris" },
        { title: "Accounts Payable Manager - Paris-", location: "Paris" },
        { title: "Administrative Business Partner (Remote Seattle)", location: "Seattle" },
        { title: "Associate / Manager, Revenue Operations & Strategy", location: "New York" },
    ];
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className={styles.rolesContainer}>
                <div className={styles.rolesTitle}>Roles</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", paddingBottom: "48px" , padding:"0px 16px" }}>
                    <select
                        style={{ backgroundColor: "#F7F8FC", border: 0, outline: "none",  height: "56px", color: "#012635", padding: "0px 16px" }}
                        className={styles.select}
                    >
                        <option value="">Location</option>

                        <option >
                            Paris
                        </option>

                    </select>

                    <select
                    className={styles.select}
                        style={{ backgroundColor: "#F7F8FC", border: 0, outline: "none",  height: "56px", color: "#012635", padding: "0px 16px" }}
                    >
                        <option value="">Profession</option>

                        <option >
                            Paris
                        </option>

                    </select>

                    <select
                    className={styles.select}
                        style={{ backgroundColor: "#F7F8FC", border: 0, outline: "none",  height: "56px", color: "#012635", padding: "0px 16px" }}
                    >
                        <option value="">Contracts</option>

                        <option >
                            Paris
                        </option>

                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px"  , padding:"24px 16px"  }}>
                    {
                        jobs.map((job, index) => (
                            <div key={index} className={styles.jobItem}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    <div style={{ color: "#012635", fontSize: "24px", fontWeight: "400", lineHeight: "32px" }}>{job.title}</div>
                                    <div style={{ display: "flex", gap: "16px" }}>
                                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                            <div style={{ padding: "3px", backgroundColor: "#E85B79", width: "fit-content", height: "fit-content", borderRadius: "4px" }}></div>
                                            <div style={{ color: "#777777", fontSize: "14px" }}>Full Time</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                            <div style={{ padding: "3px", backgroundColor: "#3086EE", width: "fit-content", height: "fit-content", borderRadius: "4px" }}></div>
                                            <div style={{ color: "#777777", fontSize: "14px" }}>{job.location}</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                                    <button style={{ backgroundColor: "white", borderRadius: "40px", fontSize: "18px", color: "#012635", fontWeight: 500, width: "135px", height: "48px" }}>Apply now</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "center", paddingTop: "48px" }}>
                    <button style={{ backgroundColor: "#00BD82", color: "white", borderRadius: "40px", fontSize: "18px", width: "118px", height: "48px", fontWeight: 500, display: "flex", justifyContent: "center", alignItems: "center" }}>See More</button>
                </div>
            </div>
        </div>
    )
}

export default CareersRoles
