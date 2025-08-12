import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%; /* Full width */
`;

export const DropdownButton = styled.button`
  background-color: white; /* White background */
  color: black; /* Black text */
  padding: 15px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* Full width */
`;

export const ArrowWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 8px;
  width: 100%; /* Full width */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  z-index: 1;
`;

export const DropdownItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;