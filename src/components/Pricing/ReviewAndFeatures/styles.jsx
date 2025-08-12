// styles.js
import styled from "@emotion/styled";

export const PlanDasktopWrapper = styled.div`
  // padding: 64px 112px !important;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1440px;
  margin: auto;

  @media (max-width: 1024px) {
    display: none;
  }
`;

// Title of the Plan Comparison section
export const Title = styled.div`
  color: #012635;
  font-size: 38px;
  font-weight: 600;

  @media (max-width: 1024px) {
    font-size: 24px;
  }
`;

// Wrapper for the table (with border and rounded corners)
export const TableWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 16px;

  width: 100%;
`;

export const TableHeader = styled.div`
  background-color: #f7f8fc;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom: 1px solid #d3d7dd;
`;

export const TableCell = styled.div`
  font-size: 20px;
  align-items: center;
  justify-content: ${(props) => props.justify || ""};
  width: ${(props) => props.width || "232px"};
  height: 86px;
  font-weight: ${(props) => props.weight || 600};
  line-height: 28px;
  color: ${(props) => props.textColor || "#012635"};
  vertical-align: middle;
  display: flex;
  gap: 8px;
  padding: 20px 24px;
`;
export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  border-radius: ${(props) => (props.isLastRow ? "0 0 16px 16px" : "0")};
`;
export const PlanButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 232px;
  height: 85px;
`;

export const Button = styled.button`
min-width: 183px;
  width: fit-content;
  font-size: 20px;
  height: 48px;
  font-weight: 600;
  line-height: 28px;
  border-radius: 8px;
  padding: 0px 5px;
  color: ${(props) => props.textColor || "#000000"};
  background-color: ${(props) => props.bgColor || "#F7F8FC"};
`;

export const PlanWrapper = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background-color: #f1f3f8;
  overflow: hidden;
`;

export const PlanRow = styled.div`
  display: flex;
  height: 58px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => props.bgColor};
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const PlanName = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #012635;
`;

export const PlanPrice = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #012635;
`;

export const PlanMobileWrapper = styled.div`
  display: none;

  @media (max-width: 1024px) {
    padding: 48px 16px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export const DropdownWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  overflow: hidden;
`;

export const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  cursor: pointer;
  height:58px;
`;

export const DropdownBody = styled.div`
  background-color: #f7f8fc;
`;

export const DropdownRow = styled.div`
  background-color: ${(props) => (props.odd ? "#F7F8FC" : "#FFFFFF")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  height:60px;
  &:last-child {
    border-bottom: none;
  }
`;

export const DropdownValue = styled.div`
  font-size: 20px;
  font-weight: ${(props) => props.weight || 500};
  color: #012635;
`;

export const DropdownIcon = styled.div`
  font-size: 24px;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;
