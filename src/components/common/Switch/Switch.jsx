import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => <Switch disableRipple {...props} />)(({ theme }) => ({
    width: 40,
    height: 22,
    padding: 0,
    display: "flex",
    "&:active": {
        "& .MuiSwitch-thumb": {
            width: 22,
        },
        "& .MuiSwitch-switchBase.Mui-checked": {
            transform: "translateX(16px)",
        },
    },
    "& .MuiSwitch-switchBase": {
        padding: 2,
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.mode === "dark" ? "#00BD82" : "#00BD82",
                opacity: 1,
            },
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "0 2px 4px 0 rgba(0, 35, 11, 0.2)",
        width: 18,
        height: 18,
        borderRadius: 11,
        transition: theme.transitions.create(["width"], {
            duration: 200,
        }),
    },
    "& .MuiSwitch-track": {
        borderRadius: 13,
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#39393D" : "#E9E9EA",
        boxSizing: "border-box",
    },
}));

const SwitchButton = ({active , row , handleActive , disabled=false}) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        handleActive(row , event.target.checked)
    };
    useEffect(() => {
        setChecked(active)
    }, [active])
    return (
        <div style={{ width: "fit-content" }}>
            <IOSSwitch checked={checked} onChange={handleChange} disabled={disabled} />
        </div>
    );
};

export default SwitchButton;