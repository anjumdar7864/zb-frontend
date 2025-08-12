import theme from "@/theme";
import styled from "@emotion/styled";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

// export const StepTwoOption = styled.div`
// display: flex;
//   align-items: center;
//   justify-content: center;
//   padding:15px 20px;
//   border-radius: 5%;
//   background-color: ${({active})=> active ? theme.colors.primary : `rgba(255, 255, 255, 0.1)` } ;
//   color: ${theme.colors.white } ;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   border: ${({active})=> active ? `thin solid ${theme.colors.primary}` : 'thin solid rgba(255, 255, 255, 0.1)' } ;

//   &:hover {
//      border: thin solid ${theme.colors.primary};
//      color:${theme.colors.primary};
//   }

// `;

export const StepTwoOption = styled.div`
width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
    padding:10px 20px;
  font-size: 18px;

    @media (min-width: 768px) {
   padding:15px 20px;
}
  border-radius: 8px;
  height: 64px;
  background-color: ${({active}) => 
    active ? theme.colors.primary : `rgba(255, 255, 255, 0.1)`};
  color: ${({active}) => 
    active ? theme.colors.white : theme.colors.white};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  /* border: ${({active}) => 
    active ? `thin solid ${theme.colors.primary}` : 'thin solid rgba(255, 255, 255, 0.1)'}; */

  &:hover {
    border: thin solid ${theme.colors.primary};
    color: ${({active}) => 
      active ? theme.colors.white : theme.colors.white};
  }

  &:active {
    background-color: ${({active}) => 
      active ? theme.colors.primary : theme.colors.hoverBackground};
    color: ${theme.colors.white};
  }
`;

