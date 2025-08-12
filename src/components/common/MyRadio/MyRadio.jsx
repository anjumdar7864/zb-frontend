import Assets from "@/assets";
import { MyRadioStyled } from "./styles";

const MyRadio = ({ title, isChecked = false, onClick = () => {} }) => {
    return (
        <MyRadioStyled onClick={onClick}>
            <img
                src={
                    isChecked
                        ? Assets.Images.RadioChecked
                        : Assets.Images.RadioUnChecked
                }
                alt={isChecked ? "Radio Checked" : "Radio Unchecked"}
            />
            <span className="text">{title}</span>
        </MyRadioStyled>
    );
};

export default MyRadio;
