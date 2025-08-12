import styled from "@emotion/styled";


export const TopContainer = styled.div`
  width:100%;
`
export const TenatContainer = styled.div`
  padding:0rem 4rem;
`

export const FilterBoxContainer = styled.div`
  position: relative;
  width:100%;
  @media (min-width: 767px) { /* Small screens and up */
    width: auto; /* Fix width for small screens */
  }
`
export const QABox = styled.div`
  border: 1px solid #2E2E2E;
  border-radius:7px;
  width:26px;
  height:26px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#2E2E2E;
  font-size:12px
`

export const FilterBox = styled.div`
  background-color:#FFFFFF;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius:7px;
  padding:10px;
  display:flex;
  align-items:center;
  gap:5px;
  justify-content:space-between;
  cursor:pointer;
`

export const Dropdown = styled.div`
  position: absolute;
    top: ${({ top }) => top};
  left: ${({ left }) => left};
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: ${({ width }) => width};
  padding:7px;
`

export const DropdownItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  color: #666666;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`

export const SearchBox = styled.div`
  border: 1px solid #E0E0E0;
  background-color:#FFFFFF;
  border-radius:7px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 9px;
  padding-bottom: 9px;
 
`

export const InputStyled = styled.input`
  width: 100%;
  color:#999999;
  font-size:14px;
  weignt:300;
  // padding:5px;
  height: 100%;
  outline: none;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

export const CreateUserButton = styled.div`

 background-color:#1E9B50;
  border-radius:7px;
  padding:10px 15px;
   display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  cursor:pointer;
`
export const TableContainer = styled.div`
  border-inline:1px solid #D3D7DD;
  border-top:1px solid #D3D7DD;
  border-top-left-radius:7px;
  border-top-right-radius:7px;
`;

export const DownloadCSvbtn = styled.div`
  border: 1px solid #2E2E2E;
  border-radius:7px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:10px;
  color:black;
  cursor:pointer;



`


export const Table = styled.table`
  width: 100%;
  background-color:white;
  border-collapse: collapse;
  border-radius:10px;
  overflow-x: auto;


`;

export const TableRow = styled.tr`
 
 
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 20px;
  font-weight: 600;
  font-size:16px
  color: #2E2E2E;
  border-bottom: 1px solid #E0E0E0
`;

export const TableCell = styled.td`
  padding: 10px;
  color: #666666;
  font-weight: 400;
  position:relative;
  padding-left:15px
`;


export const StyledStatus = styled.p`
  background-color: ${({ subscription, status, pstatus }) =>
    subscription === "Premium" ? "#122A4B" :
      subscription === "Basic" ? "#1E9B501A" :
        status === "Active" ? "#122A4B1A" :
          status === "Suspended" ? "#FF2F2F1A" :
            status === "On-Hold" ? "#1A57AC1A" :

              pstatus === "Pending" ? "#FFAB961A" :
                pstatus === "Up-to-date" ? "#122A4B1A" :
                  "transparent"};
  color: ${({ subscription, status, pstatus }) =>
    subscription === "Premium" ? "white" :
      subscription === "Basic" ? "#12763A" :
        status === "Active" ? "#122A4B" :
          status === "Suspended" ? "#FF1616" :
            status === "On-Hold" ? "#1A57AC" :
              pstatus === false ? "#983326" :
                pstatus === true ? "#122A4B" :

                  ""};
  border: ${({ subscription, status, pstatus }) =>
    subscription === "Basic" ? "1px solid #1E9B501A" :
      status === "Active" ? "1px solid #122A4B1A" :
        status === "Suspended" ? "1px solid #FF2F2F80" :
          status === "On-Hold" ? "1px solid #1A57AC1A" :

            pstatus === "Pending" ? "1px solid #FFAB9680" :
              pstatus === "Up-to-date" ? "1px solid #122A4B1A" :

                ""};

  padding: 4px 7px;
  width:auto;
  
  border-radius: 100px;
  display: inline-block;

`;
export const ActionButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionDropdown = styled(Dropdown)`
 right: ${({ right }) => right};
  
  width: 150px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 5px;
  background-color: #FFFFFF;
`;