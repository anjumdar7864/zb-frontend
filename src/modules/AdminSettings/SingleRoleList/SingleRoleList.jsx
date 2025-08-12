import { FaArrowLeft, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { SingleRoleListStyled } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { LightTooltip } from "@/components/common";
import Assets from "@/assets";
import { useGlobalContext } from "@/hooks";
import { convertToTitleCase, remToPixels } from "@/utils";
import Components from "@/components";
import { useState } from "react";

const SingleRoleList = () => {
    const navigate = useNavigate();
    const { windowWidth } = useGlobalContext();
    const { roleName } = useParams();
    const [selectedDeleteId, setSelectedDeleteId] = useState("");

    return (
        <SingleRoleListStyled
            tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
        >
            <div className="top">
                <div className="left">
                    <h1>{convertToTitleCase(roleName)} List</h1>
                </div>
                <div className="right">
                    <div className="top">
                        <button onClick={() => navigate(-1)}>
                            <span className="icon">
                                <FaArrowLeft />
                            </span>
                            <span className="text">Back</span>
                        </button>
                    </div>
                    <form className="bottom">
                        <input type="text" placeholder="Search" />
                        <button>
                            <FaSearch />
                        </button>
                    </form>
                </div>
            </div>
            <div className="bottom">
                <div className="table">
                    <div className="row">
                        <h6 className="col">ID</h6>
                        <h6 className="col">User</h6>
                        <h6 className="col">Last Login</h6>
                        <h6 className="col">Joined Date</h6>
                        <h6 className="col">Actions</h6>
                    </div>
                    {Array(10)
                        .fill(0)
                        .map((_, i) => (
                            <div className="row body" key={i}>
                                <div className="col data">
                                    <p>CW312CW312CW312CW312</p>
                                </div>
                                <div className="col user">
                                    <div className="left">
                                        <img
                                            src={Assets.Images.Avatar}
                                            alt="AVATAR"
                                        />
                                    </div>
                                    <div className="right">
                                        <p>anjum</p>
                                        <span>admin7895ses@yopmail.com</span>
                                    </div>
                                </div>
                                <div className="col data">
                                    <p>2 months ago 6/21/23, 9:37 PM</p>
                                </div>
                                <div className="col data">
                                    <p>5/25/23, 8:22 PM</p>
                                </div>
                                <div className="col actions">
                                    <LightTooltip
                                        arrow
                                        placement="top"
                                        title="Edit"
                                    >
                                        <button
                                            className="icon"
                                            onClick={() =>
                                                navigate(
                                                    "/admin-settings/user-edit/userId"
                                                )
                                            }
                                        >
                                            <FaEdit />
                                        </button>
                                    </LightTooltip>
                                    <LightTooltip
                                        arrow
                                        placement="top"
                                        title="Delete"
                                    >
                                        <button
                                            className="icon"
                                            onClick={() =>
                                                setSelectedDeleteId("12")
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </LightTooltip>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <Components.Common.DeleteModal
                onClose={() => setSelectedDeleteId("")}
                onOkay={() => setSelectedDeleteId("")}
                open={Boolean(selectedDeleteId)}
                deleteItemName="User"
            />
        </SingleRoleListStyled>
    );
};

export default SingleRoleList;
