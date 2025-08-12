import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ActiveTenant, DeActiveTenant } from "@/store/actions";
import { useDispatch } from "react-redux";
import styles from './Tenant.module.css'

// import styles from "../../DirectImport/DirectImport.module.css";


const MorePopover = ({ children, singleTemplate, loginAsUser, singletemplateId, activeLoading, deActiveLoading, generateQueryParams , singleTemplateStatus }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <span onClick={handleClick}>{children}</span>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}

            >
                <div style={{ padding: "7px" }}>
                    <div className={styles.options}  onClick={() => loginAsUser(singleTemplate)} style={{ width: "134px", cursor: "pointer" , padding:"10px"}}>
                        <FaUser />
                    </div>
                    <div className={styles.options} style={{ padding:"10px" , cursor: "pointer"}} onClick={() => {
                        navigate(`/tenant/edit/${singletemplateId}`);
                    }}>Edit</div>
                    <div className={styles.options} style={{ padding:"10px" , display:singleTemplateStatus != "Suspended" && singleTemplateStatus != "Active" ? "none" : "" }}>
                        {singleTemplateStatus === "Suspended" && (
                            <div
                                onClick={() =>
                                    dispatch(
                                        ActiveTenant(
                                            { status: "Active" },
                                            singletemplateId,
                                            () => {
                                                generateQueryParams();
                                            }
                                        )
                                    )
                                }
                            >
                                <button disabled={activeLoading}>
                                    {activeLoading ? "Activating..." : "Activate"}
                                </button>
                            </div>
                        )}
                        {singleTemplateStatus === "Active" && (
                            <div
                                onClick={() =>
                                    dispatch(
                                        DeActiveTenant(
                                            { status: "Suspended" },
                                            singletemplateId,
                                            () => {
                                                generateQueryParams();
                                            }
                                        )
                                    )
                                }
                            >
                                <button disabled={deActiveLoading}>
                                    {deActiveLoading ? "Deactivate..." : "Deactivate"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </Popover>
        </div>
    );
};

export default MorePopover;
