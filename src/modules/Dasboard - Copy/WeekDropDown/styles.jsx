import styled from "@emotion/styled";

export const CustomDropdown = styled.div`
  position: relative;
  display: inline-block;

  & > button {
    padding: 10px;
    border: none;
    cursor: pointer;
    color: #9692a3;
    background: transparent;
  }

  & > div {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 160px;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  & > div > a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  & > div > a:hover {
    background-color: #f1f1f1;
  }
`;