import theme from "@/theme";
import styled from "@emotion/styled";

export const ButtonRightIconStyled = styled.button`
  padding: 0.6em 1.5rem;
 border-radius: 40px;
  transition: background-color 0.3s ease-in-out;
  background-color: ${(props) => props.bgColor ? props.bgColor : theme.colors.primary};
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color ? props.color : theme.colors.white};

  & > .icon {
    font-size: 1.45rem;
    line-height: 0;
  }
  & > .text {
    font-size: ${(props) => props.fontSize ? props.fontSize : '16px'};
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.hoverColor ? props.hoverColor : theme.colors.green};
    color: ${(props) => props.hoverTextColor ? props.hoverTextColor : theme.colors.black};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;
