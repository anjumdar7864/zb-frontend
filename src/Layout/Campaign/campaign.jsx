import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./campaign.module.css";
import { FaChevronRight } from "react-icons/fa6";
import { LightTooltip } from '@/components/common';


const Campaign = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [tab, setTab] = useState(1)
    const location = useLocation();

    const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
      );
    
    function hundleMenuBar(id) {
        setShowMenu(true);
        setTab(id)
    }
    useEffect(() => {
        // Retrieve the object from localStorage
        // First, try to get the user data from sessionStorage
        let userData = localStorage.getItem("user");

        // If it's not found in sessionStorage, check localStorage
        if (!userData) {
            userData = localStorage.getItem("user");
        }

        // Check if the data exists in localStorage
        if (userData) {
            // Parse the JSON string into a JavaScript object
            const userObject = JSON.parse(userData);
            // Access the role property
            const role = userObject.role;
            setUserRole(role);
            // Output the role
            console.log("User role:", role);
        } else {
            console.log(
                'No user data found in userData under the key "user".',
                userData
            );
        }
    }, [showMenu]);

    const navigate = useNavigate();

    const { templateId } = useParams();

    const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
    const [isFollowUpCampaign, setIsFollowUpCampaign] = useState(false);

    const name = 'Your name'
    return (
        <div className={styles.container}>
            <div className={styles.TopContainer} style={{ margin: "0px 0px", padding: "24px 40px" }}>
                <h1>Campaigns</h1>
                {(user.role === 'admin' || user.permissions.includes('Create Initial Campaign')) && (
                <div className="right" >
                
                    <LightTooltip
                        arrow
                        placement="top"
                        title="Creates a new Campaign for sending initial messages"
                    >
                        <button
                            style={{ width: '187px' }}
                            className={styles.CreateNew}
                            onClick={() => {
                                setIsNewCampaignModalOpen(true);
                                setIsFollowUpCampaign(false);
                            }}
                        >
                            Create New Campaign
                        </button>
                    </LightTooltip>         
                    <LightTooltip
                        arrow

                        placement="top"
                        title="Picking out the campaigns where the people we contacted haven't answered for at least a week."
                    >
                        <button
                            onClick={() => navigate("/campaigns/create-follow-up")}
                            className={styles.FollowUp}
                            style={{ width: '257px' }}
                        >
                            Create New Follow Up Campaign
                        </button>
                    </LightTooltip>
                    
                </div>
                )}
            </div>
            <div style={{ flexGrow: 1, overflow: 'auto' }}>
                <Outlet context={[isNewCampaignModalOpen,isFollowUpCampaign,setIsNewCampaignModalOpen,setIsFollowUpCampaign]} />
            </div>
        </div>
    )
}

export default Campaign
