import { useState } from "react";
import { MyCheckboxStyled } from "./styles";
import Assets from "@/assets";

const MyCheckbox = ({ title, isChecked = false, onClick = () => {} }) => {
    return (
        <MyCheckboxStyled onClick={onClick}>
            <div className="left">
                <img
                    src={
                        isChecked
                            ? Assets.Images.checkedCheck
                            : Assets.Images.emptyCheckbox
                    }
                    alt={isChecked ? "Checked" : "UnChecked"}
                />
            </div>
            <div className="right">
                <span>{title}</span>
            </div>
        </MyCheckboxStyled>
    );
};

export default MyCheckbox;

