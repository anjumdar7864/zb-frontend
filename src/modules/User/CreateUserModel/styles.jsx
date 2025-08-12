import styled from "@emotion/styled";

export const WarningMessage = styled.div`
  background-color: #eaf4fc;
  color: #0056b3;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const DismissButton = styled.button`
  background: none;
  border: none;
  color: #0056b3;
  font-size: 12px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 75%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
   max-height: 100vh;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color:#2E2E2E;
  font-size:18px;
  font-weight:700;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ModalInput = styled.input`
 appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  display: inline-block;

  &:checked {
    background-color: #1E9B50;
    border-color: #1E9B50;
  }

  &:checked::before {
    content: '✓'; /* Thin tick mark */
    display: block;
    color: white;
    font-size: 14px;
    text-align: center;
    line-height: 14px;
  }

  &:focus {
    border-color: #1E9B50;
    outline: none;
    box-shadow: 0 0 5px rgba(30, 155, 80, 0.5);
  }
`;

export const ModalButton = styled.button`
  padding: 15px 20px;
  border-radius: 5px;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border: ${({ border }) => border};
  cursor: pointer;
  font-size: 14px;
`;

export const Note = styled.div`
  background-color:#D3E2F6;
  border-radius:10px;
  width:100%;
  padding:15px;
  display:flex;
  align-items:center;
  justify-content:space-between
  


`