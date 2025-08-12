import { MySwitchStyled } from "./styles";
import Assets from "@/assets";

const MySwitch = ({ title, isChecked = false, onClick = () => {} }) => {
    return (
        <MySwitchStyled onClick={onClick}>
            <div className="left">
                <img
                    src={
                        isChecked
                            ? Assets.Images.SwitchChecked
                            : Assets.Images.SwitchUnChecked
                    }
                    alt={isChecked ? "Checked" : "UnChecked"}
                />
            </div>
            <div className="right">
                <span>{title}</span>
            </div>
        </MySwitchStyled>
    );
};

export default MySwitch;
