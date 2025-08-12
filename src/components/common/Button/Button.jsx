import { ButtonRightIconStyled } from "./styles";

const ButtonRightIcon = ({bgColor,color, hoverColor,hoverTextColor, text = "",href, onClick , icon,fontSize, ...rest }) => {
  return (
    <>
    {onClick ?
      (
        <ButtonRightIconStyled onClick={onClick} bgColor={bgColor} color={color} fontSize={fontSize} hoverTextColor={hoverTextColor} hoverColor={hoverColor} {...rest}>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </ButtonRightIconStyled>
      )
      :(
        <a href={href}>
        <ButtonRightIconStyled  bgColor={bgColor} color={color} hoverTextColor={hoverTextColor} fontSize={fontSize} hoverColor={hoverColor} {...rest}>
        <span className="icon">{icon}</span>
        <span className="text">{text}</span>
      </ButtonRightIconStyled>
      </a>
      )
    }
    </>
    
  );
};

export default ButtonRightIcon;
