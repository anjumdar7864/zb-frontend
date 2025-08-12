import { ButtonRightIconStyled } from "./styles";

const ButtonRightIcon = ({ text = "", onClick = () => {}, icon, ...rest }) => {
  return (
    <ButtonRightIconStyled onClick={onClick} {...rest}>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </ButtonRightIconStyled>
  );
};

export default ButtonRightIcon;
