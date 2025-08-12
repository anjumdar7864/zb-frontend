import styled from "@emotion/styled";
import theme from "@/theme";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.5rem 2.5rem; /* Add extra padding on the sides */
  border: 1px solid #E8EAED;
  border-radius: 9999px; /* Fully rounded */
  outline: none;
  font-size: 18px;
  font-weight:400;
  max-width: 496px;
  height:64px;
  opacity:0.6;

`;

export const Button = styled.button`
  position: absolute;
  right: 10%; 
  top: 50%;
  transform: translateY(-50%);
  background-color: ${theme.colors.primary};
  color: #ffffff;
  padding: 1rem 1rem;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  width:161px;
  height:48px;
  &:hover {
    background-color: ${theme.colors.green};
  }
`;