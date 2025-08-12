import theme from "@/theme";
import styled from "@emotion/styled";


export const StyledForm = styled.form`
  
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#007bff' : '#6c757d')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;


export const RoundButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  color: black;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.primary}; // Example hover color
    color: white;
  }

  svg {
    font-size: 24px; // Adjust icon size
  }
`;


export const StepTwoOption = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  padding:12px 20px;
  border-radius: 5%;
  background-color:rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border:thin solid rgba(255, 255, 255, 0.1);

  &:hover {
     border: thin solid ${theme.colors.primary};
     color:${theme.colors.primary};
  }

`;
