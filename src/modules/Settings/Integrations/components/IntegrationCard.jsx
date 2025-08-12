import React from "react";
import { IntegrationCardStyle } from "../styles";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { BsThreeDotsVertical } from "react-icons/bs";

const IntegrationCard = (props) => {
  const IOSSwitch = styled(
    (props2) =>
      props?.active ? ( // Check if props.active is true
        <Switch
          checked={props?.active && props?.crmActive}
          onClick={props.activated ? props.handleDeActive : props.handleActive}
          focusVisibleClassName=".Mui-focusVisible"
          disableRipple
          {...props2}
        />
      ) : null // Render nothing if props.active is false
  )(({ theme }) => ({
    width: 48,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(22px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#00BD82",
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: "#2ECA45",
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "#39393D",
      }),
    },
  }));

  return (
    <IntegrationCardStyle>
      {/* <div
        className="banner-section"
        style={{ backgroundImage: `${props.background}` }}
      >
      </div> */}
      <div className="Image-section">
        <div
          style={{
            backgroundImage: `url(${props.logo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          className="Image"
        >
          {/* <img src={} alt="logo" /> */}
        </div>
        <div className="otherActions">
          <div>
            <IOSSwitch />
          </div>
          <div
            onClick={props.onEdit}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 15,
            }}
          >
            <BsThreeDotsVertical size={22} color="#777777" />
          </div>
        </div>
      </div>
      <div className="content-section">
        <h5>{props.heading}</h5>
        <p>{props.content}</p>
        {/* {props.connectBtn && <button onClick={props.onConnect}>Connect</button>} */}
        {/* {props.active && (
          <div>
            <div
              style={{
                background: props.activated ? "#34bfa3" : "rgb(255, 204, 204)",
                color: props.activated ? "white" : "red",
                cursor: "pointer",
              }}
              onClick={
                props.activated ? props.handleDeActive : props.handleActive
              }
            >
              {props.activated ? <FaCheckCircle /> : <MdOutlineCancel />}
              {props.activated ? "Active" : "Deactivate"}
            </div>
            <button onClick={props.onClick}>Edit</button>
          </div>
        )} */}
      </div>
    </IntegrationCardStyle>
  );
};

export default IntegrationCard;
