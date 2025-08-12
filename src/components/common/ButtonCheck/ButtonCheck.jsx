import { ButtonCheckStyled } from "./styles";
import { FaCheckCircle } from "react-icons/fa";

const ButtonCheck = ({ text = "", onClick = () => {}, ...rest }) => {
    return (
        <ButtonCheckStyled onClick={onClick} {...rest}>
            <span className="icon">
                <FaCheckCircle />
            </span>
            <span className="text">{text}</span>
        </ButtonCheckStyled>
    );
};

export default ButtonCheck;
