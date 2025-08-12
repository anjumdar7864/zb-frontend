import styled from "@emotion/styled";

export const Card = styled.div`
  background: ${(props) => props.bg || "0"};
  border: ${(props) => props.border || "0"};
  color: ${(props) => props.color || "0"};
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  padding: 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease, border 0.3s ease;
  width:100%;

  &:hover {

   bgHover: ${(props) => props.bgHover || "0"};
  }
`;
