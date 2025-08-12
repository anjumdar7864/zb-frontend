import theme from "@/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BillingContainer = styled.div`
  padding:3%;
  display:flex;
  flex-direction:column;
  gap:15px
`
export const UpdateButton = styled.div`
  background-color: #5867dd;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:10px;
  gap:10px;
  border-radius:5px;
  cursor:pointer;

  `
  export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 768px;

    @media (min-width: 425px) {
    width: 60%;
  }
  
    @media (min-width: 768px) {
    width: 60%;
  }
  
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

  export const PurchaseButton = styled.div`
  background-color: #D3D3D3;
  color:#e3e3e3;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:10px;
  margin-top:60px;
  gap:10px;
  border-radius:5px;
  


`
export const SubscriptionCardBG = styled.div`
 background-color: white;
 padding:2%;
 display: inline-block; 
 width:100%

`

export const Card = styled.div`
  position: relative;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  width: 100%;
  background-color: ${({ isPro }) => (isPro ? 'transparent' : '#DEEFF5')};
  border: ${({ isPro }) => (isPro ? '1px solid gray' : 'none')};

  ${({ isPro }) =>
    isPro &&
    css`
      &::before {
        content: 'This is your current plan';
        position: absolute;
        top: 0;
        font-size: 10px;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0 5px;
        background-color: white;
        z-index: 1;
      }
    `}
`;

export const EnterpriseCard = styled.div`
  position: relative;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  width: 100%;
  display:flex;
  align-items:center;
  flex-direction:column;
  gap:20px;
  justify-content:center;
  background-color: white;
  border: 1px solid gray;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

 
    @media (min-width: 425px) {
    width: 90%;
  }
       @media (min-width: 768px) {
    width: 50%;
  }

       @media (min-width: 900px) {
    width: 60%;
  }
           @media (min-width: 1000px) {
    width: 50%;
  }


`;

export const NewBox = styled.div`
position:absolute;
  top:-15px;
  right:-15px;

   background-color:#5867dd;
   border-radius: 10px;
   padding:5px;
   color:white;
   width:50px;
   text-align:center;

`

export const AdditionalPopup = styled.div`
  position: absolute;
  top:20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 10;
  min-width: 98%;
  text-align: left;

   &::before {
    content: '';
    position: absolute;
    top: 100%; 
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;




export const TableContainer = styled.div`
  height: 100%;
   width: 100%;
`;

export const OverflowWrapper = styled.div`
  position: relative;
  overflow-x: auto;
   width: 100%;
`;

export const Table = styled.table`
 width: 100%;
  background-color: white;
  border-collapse: collapse;
  divide-y: 2px;
  divide-color: #e5e7eb;
`;

export const TableHead = styled.thead`
width: 100%;
  background-color: #D3D3D3;
`;

export const TableHeaderCell = styled.th`
  min-width: 100%;
  padding: 1rem;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 500;
  color: black;
`;


export const TableBodyCell = styled.td`
  color: ${({ color }) => (color ? color : '#41475c')};
  padding: 1rem;
  font-size: 1.2rem;
`;

export const TableBodyRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f8fafc;
  }
  &:nth-of-type(even) {
    background-color: #f8fafc;
  }
`;


export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  height:35px;
  width:35px;
   display: flex;
   align-items:center;
  justify-content: center;
  background-color: ${(props) => (props.active ? '#e5e7eb' : 'white')};
  color: ${(props) => (props.active ? '#41475c' : '#a0a4a7')};
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
  }
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const NavigationButton = styled(PaginationButton)`
  font-weight: bold;
  margin-right:20px;
  margin-left:20px;
   display: flex;
   align-items:center;
  justify-content: center;
`;