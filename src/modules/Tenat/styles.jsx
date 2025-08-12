import styled from "@emotion/styled";
import theme from "@/theme";
import { css } from '@emotion/react';


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
        subscription === "custom" ? "#FDF5E0" :
          subscription === "canceled" ? "#FFEEEE" :
            subscription === "67445d36f4d8d6cff7dbde60" ? "#E1F3EE " :
              subscription === "6744614ba4d142ed16ea9c97" ? "#D6EFF9" :
                subscription === "67445e5cf4d8d6cff7dbde85" ? "#E8F0FB" :
                  subscription === "6744617ea4d142ed16ea9c9e" ? "#FADEE4" :
                    status === "Active" ? "transparent" :
                      status === "Suspended" ? "#FFEEEE" :
                        status === "On-Hold" ? "#D6E7FC" :

                          pstatus === "Pending" ? "#FFEEEE" :
                            pstatus === "Up-to-date" ? "transparent" :
                              "transparent"};

  color: ${({ subscription, status, pstatus }) =>
    subscription === "Premium" ? "white !important" :
      subscription === "Basic" ? "#12763A" :
        subscription === "custom" ? "#F49C17 !important" :
          subscription === "canceled" ? "#EA3815 !important" :
            subscription === "67445d36f4d8d6cff7dbde60" ? "#06AB78 !important" :
              subscription === "6744614ba4d142ed16ea9c97" ? "#012635 !important" :
                subscription === "67445e5cf4d8d6cff7dbde85" ? "#005ABB !important" :
                  subscription === "6744617ea4d142ed16ea9c9e" ? "#B1264D !important" :

                    status === "Active" ? "#012635 !important" :
                      status === "Suspended" ? "#EA3815 !important" :
                        status === "On-Hold" ? "#005ABB !important" :
                          pstatus === false ? "#EA3815 !important" :
                            pstatus === true ? "#012635 !important" :
                              pstatus === "Pending" ? "#EA3815 !important" :

                                ""};
  border: ${({ subscription, status, pstatus }) =>
    subscription === "Basic" ? "1px solid #1E9B501A" :
      subscription === "custom" ? "1px solid #F49C17" :
        subscription === "canceled" ? "1px solid #EA3815" :
          subscription === "67445d36f4d8d6cff7dbde60" ? "1px solid #06AB78" :
            subscription === "6744614ba4d142ed16ea9c97" ? "1px solid #012635" :
              subscription === "67445e5cf4d8d6cff7dbde85" ? "1px solid #005ABB" :
                subscription === "6744617ea4d142ed16ea9c9e" ? "1px solid #E85B79" :

                  status === "Active" ? "1px solid #D3D7DD" :
                    status === "Suspended" ? "1px solid #EA3815" :
                      status === "On-Hold" ? "1px solid #005ABB" :

                        pstatus === "Pending" ? "1px solid #FFAB9680" :
                          pstatus === "Up-to-date" ? "1px solid #D3D7DD" :

                            "1px solid #D3D7DD"};

  border-radius: 100px;
  display: inline-block;

  white-space: nowrap;        
  overflow: hidden;          
  text-overflow: ellipsis; 
  padding: 4px 7px;
  width:auto;
  max-width: 150px;
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





























export const TableRowStyled = styled.div`
  background-color: #fff !important;
  border-bottom: 1px solid #d8d8d8;
  row-gap: 0 !important;
  padding: 1rem 1rem !important;
  & > .col {
    justify-self: center;

    &:first-of-type {
      justify-self: start;
    }
    &:nth-of-type(2) {
      justify-self: stretch;
    }
    &:last-of-type {
      justify-self: end;
    }

    &.data {
      & > p {
        color: #7c7c7c;
        font-size: 1.1rem;
        font-weight: 500;
      }
    }

    &.message {
      display: grid;
      align-items: start;
      justify-content: space-between;
      gap: 2.5rem;
      grid-template-columns: 1fr auto;

      ${(p) => p.isOpen ? `
            grid-template-columns: 1fr;
            justify-items: end;
      `
    : ""}

      & > p {
        color: #777777;
        font-size: 1.1rem;
        font-weight: 400;
        line-height: 1.7rem;
        & > .placeholder {
          color: #EA3815;
        }
        & > .text-spinner {
          color: #3086EE;
        }
      }

      & > button {
        color: #7c7c7cac;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        transition: 0.3s ease-in-out;
        font-size: 1.1rem;
        font-weight: 400;
        & > .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: #7c7c7cac;
          transform: rotate(${(p) => (p.isOpen ? "180" : "0")}deg);
          & > * {
            transition: 0.3s ease-in-out;
          }
        }

        &:hover {
          color: #333;
          & > .icon {
            & > * {
              color: black;
            }
          }
        }
      }
    }

    &.actions {
      position: relative;
      & > button {
        font-size: 1.3rem;
        color: #9f9f9f;
        line-height: 0;
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 1.3rem;
        transition: background-color 300ms;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: #dedfe7;
        }
      }

      & > .menu {
        width:210px;
        position: absolute;
        top: 50%;
        right: 100%;
        transform: translate(-1.5rem, -50%);
        box-shadow: 4px 4px 18px #3232324d;
        background-color: #fff;
        display: grid;
        align-items: center;
        padding: 0.5rem 1.3rem;
        border-radius: 0.5rem;
        grid-template-columns: auto auto auto;
        align-items: center;

        & > button {
          padding: 0.4rem 0.7rem;
          border-radius: 0.2rem;
          display: grid;
          gap: 1rem;
          grid-template-columns: auto auto;
          transition: background-color 300ms;
          align-items: center;

          & > .icon {
            color: #88898d;
            font-size: 1rem;
            line-height: 0;
          }
          & > .text {
            color: #333;
            font-size: 1.3rem;
          }

          &:hover {
            background-color: #dedfe7;
          }
        }
      }
    }
  }

  & > .extraRows {
    grid-column: 1/-1;
    & > * {
      &:first-child {
        margin-top: 2rem;
      }
    }

    & > .item {
      padding: 1.2rem 0rem;
      display: grid;
      grid-template-columns: 15rem 1fr;
      align-items: start;
      &:not(:last-of-type) {
        border-bottom: 1px solid #80808052;
      }

      & > span {
        color: black;
        font-size: 1.2rem;
        font-weight: 500;
      }

      & > p {
        color: black;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.7rem;
        & > .placeholder {
          color: #EA3815;
        }
        & > .text-spinner {
          color: #3086EE;
        }
      }
    }
  }
`;

export const Button = styled.button`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: auto auto;
  gap: 0.7rem;
  background-color: #5867dd;
  transition: background-color 300ms;
  padding: 0.6rem 1.05rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  & > .icon {
    font-size: 0.9rem;
    line-height: 0;
    color: #fff;
  }

  & > .text {
    font-size: 1.1375rem;
    color: #fff;
  }

  &:hover {
    background-color: #384ad7;
  }
`;

export const StyledInputWrapper = styled.form`
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.2rem; // Optional gap between input and button

  & > input {
    border-radius: 0.8rem 0 0 0.8rem;
    outline: none;
    padding: 0.9rem 1.3rem;
    background-color: transparent;
    font-size: 1.3rem;
    border: 0.1rem solid #d8d8d8;
    width: 30rem;
    transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;

    &:focus {
      border-color: #384ad7;
      background-color: #fff;
    }

    ${theme.queryStatement(theme.breakpoints.md)} {
      width: 100%;
    }
  }

  & > button {
    border-radius: 0 0.8rem 0.8rem 0;
    display: grid;
    width: 3.6rem;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #36a3f7;
    font-size: 1.5rem;
    transition: background-color 300ms;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #1192f6;
    }
  }
`;

export const InitialTemplateStyled = styled.div`
  // padding: 1.3rem 1.3rem 3rem;
  // display: grid;
  display: flex;
  flex-direction: column ; 
  // background-color: #f2f3f8;
  // background-color: red;
  height:100% ; 
  // min-height: calc(100vh - 7rem);
  // min-height: calc(100svh - 7rem);
  align-content: start;

  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 2rem;

    & > .left > h1 {
      font-size: 2rem;
      font-weight: 500;
      color: #000000;
    }

    & > .right {
      display: grid;
      gap: 1.3rem;
      justify-items: end;

      & > .top {
        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;
          gap: 0.7rem;
          background-color: #5867dd;
          transition: background-color 300ms;
          padding: 0.6rem 1.05rem;
          border-radius: 0.5rem;

          & > .icon {
            font-size: 0.9rem;
            line-height: 0;
            color: #fff;
          }

          & > .text {
            font-size: 1.1375rem;
            color: #fff;
          }

          &:hover {
            background-color: #384ad7;
          }
        }
      }
      & > .bottom {
        display: grid;
        grid-template-columns: auto auto;
        
        & > input {
          border-radius: 0.8rem 0 0 0.8rem;
          outline: none;
          padding: 0.9rem 1.3rem;
          background-color: transparent;
          font-size: 1.3rem;
          border: 0.1rem solid #d8d8d8;
          width: 30rem;
          transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;

          &:focus {
            border-color: #384ad7;
            background-color: #fff;
          }

          ${theme.queryStatement(theme.breakpoints.md)} {
            width: 100%;
          }
        }
          
        & > button {
          border-radius: 0 0.8rem 0.8rem 0;
          display: grid;
          width: 3.6rem;
          align-items: center;
          justify-content: center;
          color: #fff;
          background-color: #36a3f7;
          font-size: 1.5rem;
          transition: background-color 300ms;

          &:hover {
            background-color: #1192f6;
          }
        }
      }
    }
  }

  & > .bottom {
      max-width:100%;
      overflow:auto;
      margin:0px 4rem;
      margin-bottom: 40px ; 
      background-color:white ; 
       border-radius:8px ; 
      border: solid 1px #E0E0E0 ; 
        
       ${theme.queryStatement(theme.breakpoints.tab)} {
      margin:0px 20px;
        }

      &::-webkit-scrollbar {
       height: 4px; 
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #00BD82;
      }

& > div{
  height: calc(100% - 53px);
  overflow-x: auto;
  &::-webkit-scrollbar {
       height: 4px; 
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #00BD82;
      }
  & > .table {
      /* display: grid; */
      background-color:white ; 
      width: ${(p) => p.tableWidth}px;
      // overflow-x: auto;
overflow: auto;
display: flex;
flex-direction: column;
 
& > div{
  &::-webkit-scrollbar {
       height: 4px; 
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #00BD82;
      }
  & > .row {
        display: grid;
        grid-template-columns: 
        minmax(50px, 0.3fr)
        minmax(100px, 1fr)
        minmax(50px, 2fr)
        minmax(100px, 1fr)
        minmax(150px, 1.3fr)
        minmax(200px, 1fr)
        minmax(50px, 1fr)
      
        minmax(100px, 1fr)
        minmax(50px, 1fr)
        minmax(50px, 1fr)
        minmax(50px, 0.1fr);
        gap: 0rem;
        padding: 1rem 1.3rem;
        align-items: center;
        background-color:white;
 
        ${theme.queryStatement(theme.breakpoints.xxlg)} {
         grid-template-columns: 
          minmax(50px, 1fr)
          minmax(150px, 1fr)
          minmax(200px, 1fr)
          minmax(130px, 1fr)
          minmax(130px, 1fr)
          minmax(130px, 1fr)
          minmax(130px, 1fr)
          minmax(130px, 1fr)
          minmax(130px, 1fr)
          minmax(130px, 1fr)
          minmax(50px, 0.1fr);
        }

        .col.actions {
          display: grid !important; /* Show actions on hover */
        }

 

        & > h6 {
           justify-self: flex-start;
           font-weight: 500 ;
            color:#012635 ;
            font-size:14px ;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between; 
            padding-inline: 10px;
          &:first-of-type {
            justify-self: start;
          }
          &:last-of-type {
            justify-self: end;
          }
        }

        &.body {
          // background-color: #fff;
           background-color: white;
                overflow-wrap: anywhere;
          & > .error {
            text-align: center;
            font-size: 1.3rem;
            color: #212529;
            grid-column: 1/-1;
          }
            & > .bold
            {
            // font-weight: bold;
          
            }

          & > .col {
             justify-self: flex-start;
             align-self: flex-start;
             padding-inline: 10px;
              width:100%;
            &:first-of-type {
              justify-self: start;
            }
            &:last-of-type {
              justify-self: end;
            }

            &.user {
              display: grid;
              align-items: center;
              grid-template-columns: auto 1fr;
              gap: 0.5rem;

              & > .left {
                display: grid;
                align-items: center;
                justify-content: center;

                & > img {
                  width: 4rem;
                  height: 4rem;
                  border-radius: 50%;
                  object-fit: cover;
                }
              }

              & > .right {
                display: grid;
                & > p {
                  font-size: 1.3rem;
                  color: #212529;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }

                & > span {
                  font-size: 1.2rem;
                  color: #212529;
                  opacity: 0.7;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
            }

            &.data {
              & > p {
                font-size:1.1rem ; 
                font-wight: 500 ; 
                line-height:22px ; 
                color:#777777 ; 
                text-wrap:wrap !important;
              }
            }

            &.actions {
              display: none;
              align-items: center;
              justify-content: end;
              // grid-template-columns: auto auto auto auto;
              & > .icon {
                font-size: 1.5rem;
                color: #9f9f9f;
                line-height: 0;
              }
            }
          }











        & > .col2 {
             justify-self: flex-start;
             padding-inline: 10px;
             
            &:first-of-type {
              justify-self: start;
            }
            &:last-of-type {
              justify-self: end;
            }

            &.user {
              display: grid;
              align-items: center;
              grid-template-columns: auto 1fr;
              gap: 0.5rem;

              & > .left {
                display: grid;
                align-items: center;
                justify-content: center;

                & > img {
                  width: 4rem;
                  height: 4rem;
                  border-radius: 50%;
                  object-fit: cover;
                }
              }

              & > .right {
                display: grid;
                & > p {
                  font-size: 1.3rem;
                  color: #212529;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }

                & > span {
                  font-size: 1.2rem;
                  color: #212529;
                  opacity: 0.7;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
            }

            &.data {
              & > p {
                font-size:1.1rem ; 
                font-wight: 500 ; 
                line-height:22px ; 
                color:#777777 ; 
                text-wrap:wrap !important;
              }
            }

            &.actions {
              display: none;
              align-items: center;
              justify-content: end;
              // grid-template-columns: auto auto auto auto;
              & > .icon {
                font-size: 1.5rem;
                color: #9f9f9f;
                line-height: 0;
              }
            }
          }
        }
      }
}

   
    }
}
    
  }
`;

export const TransferModelStyle = styled.div`
  // width: 50.6rem;
  height: 58px;
  width: 680px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #fff;
  margin-top: 10rem;
  & > .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 16px;
    background-color: #fff;
    border-bottom: solid 1px #f0f0f0;

    & > h2 {
      font-size: 18px;
      line-height: 26px;
      font-weight: 600;
      color: #012635;
    }
    & > button {
      & > * {
        font-size: 22px;
        color: #012635;
      }
    }
  }

  & > form {
    // padding: 0px 24px;

    & > label {
      & > span {
        // padding-bottom: 2rem;
        font-size: 14px;
        line-height: 22px;
        font-weight: 500;
        // margin-bottom: 4px;
      }
      & > * {
        &:last-child {
          margin-top: 1.2rem;
        }
      }
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 5rem;
    }
      & > .bottom {
    display: grid;
    gap: 2rem;

    & > label,
    & > div.avatar {
      display: grid;
      gap: 0.65rem;
        font-family: 'Inter', sans-serif;


      & > .top {
        & > h6 {
          color: #000000e5;
          font-size: 1.3rem;
          font-weight: 400;
        font-family: 'Inter', sans-serif;


          & > span {
            color: #f4516c;
          }
        }
      }
  }
`;


export const PasswordModelStyle = styled.div`
  // width: 50.6rem;
  height: 58px;
  width: 680px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #fff;
  margin-top: 10rem;
  & > .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 16px;
    background-color: #fff;
    border-bottom: solid 1px #f0f0f0;
    & > h2 {
      font-size: 18px;
      line-height: 26px;
      font-weight: 600;
    }
    & > button {
      & > * {
        font-size: 22px;
        color: #012635;
      }
    }
  }

  & > section {
    // padding: 0rem 2rem;
    & > form {
      & > blockquote {
        display: flex;
        flex-direction: column;
        margin: 5rem 0rem;
        & > label {
          font-size: 14px;
          line-height: 22px;
          font-weight: 500;
          color: #012635;
        }
        & > input {
          border: 1px solid #3a393963;
          border-radius: 0.4rem;
          padding: 0.7rem 1rem;
          &:focus {
            outline: none;
          }
        }
      }
      & > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 2rem;
        gap: 2rem;
      }
    }
  }
`;


export const UserNewStyled = styled.div`
  // padding: 0.3rem 1.3rem 3rem;
  display: grid;
  gap: 0.5rem;
  background-color: white;
  border-radius: 16px;
  align-content: start;
  width: 700px;
  overflow:hidden ; 

  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 2rem;

    & > .left > h1 {
      font-size: 2rem;
      font-weight: 500;
        font-family: 'Inter', sans-serif;

      color: #000000e5;
    }

    & > .right {
      display: grid;
      gap: 1.3rem;
      justify-items: end;

      & > .top {
        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;
          gap: 0.7rem;
          background-color: white;
          transition: background-color 300ms;
          padding: 0.6rem 1.05rem;
          border-radius: 0.5rem;

          & > .icon {
            font-size: 0.9rem;
            line-height: 0;
            color: #fff;
          }

          & > .text {
            font-size: 1.1375rem;
            color: #fff;
          }

          &:hover {
            background-color: #384ad7;
          }
        }
      }
    }
  }

  & > .bottom {
    display: grid;
    gap: 2rem;

    & > label,
    & > div.avatar {
      display: grid;
      gap: 0.65rem;
        font-family: 'Inter', sans-serif;


      & > .top {
        & > h6 {
          color: #000000e5;
          font-size: 1.3rem;
          font-weight: 400;
        font-family: 'Inter', sans-serif;


          & > span {
            color: #f4516c;
          }
        }
      }


      & > .bottom {
        display: grid;
        gap: 0.26rem;

        & > p {
          color: #f4516c;
          font-size: 1.1rem;
        }
      }

      &.avatar > .bottom {
        & > .top {
          
          border-radius: 0.5rem;
          padding: 0.5rem;
          position: relative;
          background-color: #fff;
          cursor: pointer;

          & > input {
            display: none;
          }

          & > .icon {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075);
            font-size: 1.4rem;
            color: #9e9e9e;
          }

          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.5rem;
          }
        }
        & > p {
          color: #212529;
          opacity: 0.8;
        }
      }

      &.input > .top > .text .icon {
        margin-left: 5px;
      }

      &.input > .bottom > input {
        width: 100%

         padding: 1.1rem 4rem 1.1rem 1.5rem;
        border: 0.1rem solid #E3E6EA;
        color: #bbbbbb;
        background-color: transparent;
        font-size: 1.3rem;
        border-radius: 0.40rem;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        font-size: 1.3rem;
        font-size: 1.3rem;
        &:focus {
          border-color: #716aca;
          color: #bbbbbb;
          background-color: #fff;
        }
      }

      &.select > .bottom > select {
        padding: 1.1rem 4rem 1.1rem 1.5rem;
        border: 0.1rem solid #c1c4cc;
        color: #575962;
        background-color: transparent;
        font-size: 1.3rem;
        
        outline: none;
        border-radius: 0.35rem;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("${(p) => p.ChevronDown}");
        background-repeat: no-repeat;
        background-position: calc(100% - 1.5rem) center;
        background-size: 1rem;
        font-size: 1.3rem;

        &:focus {
          border-color: #716aca;
          color: #575962;
          background-color: #fff;
        }
      }
    }

    & > .group {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
      align-items: center;
      justify-content: end;

      & > button:first-of-type {
        padding: 0.85rem 1.5rem;
        font-size: 1.1rem;
        border: 0.1rem solid #c1c4cc;
        font-weight: 500;
        border-radius: 0.4rem;
        transition: background-color 0.3s ease-in-out;
        & > .text {
          font-size: 1.3rem;
        }

        &:not(:disabled):hover {
          background-color: #fff;
        }
      }
    }
  }
`;

export const StyledSelect = styled.select`
width: 100%;
  padding: 1.1rem 4rem 1.1rem 1.5rem;
  border: 0.1rem solid #c1c4cc;
  color: #575962;
  background-color: transparent;
  font-size: 1.3rem;
  font-family: 'Inter', sans-serif;
  outline: none;
    border-radius: 10px;

  transition: background-color 300ms, color 300ms, border-color 300ms;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image:   url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 13.1l-8-8 2.1-2.2 5.9 5.9 5.9-5.9 2.1 2.2z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 1.5rem) center;
  background-size: 1rem;

  &:focus {
    border-color: #716aca;
    color: #575962;
    background-color: #fff;
  }
`;

export const StyledInput = styled.input`
        // font-family: 'Inter', sans-serif;
  // padding: 1.1rem 4rem 1.1rem 1.5rem;
  padding: 0px 12px ; 
  height:48px;
  border: 0.1rem solid #D3D7DD;
  color: #575962;
  background-color: transparent;
  // font-size: 1.3rem;
  outline: none;
  border-radius: 8px;
  transition: background-color 300ms, color 300ms, border-color 300ms;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${(p) => p.ChevronDown});
  background-repeat: no-repeat;
  background-position: calc(100% - 1.5rem) center;
  background-size: 1rem;

  &:focus {
    border-color: #00BD82;
    color: #575962;
    background-color: #fff;
  }
`;


export const AvatarContainer = css`
  .avatar {
    .top {
      margin-bottom: 1rem;
      h6 {
        margin: 0;
        font-size: 1rem;
        font-weight: bold;
        font-family: 'Inter', sans-serif;

      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;

      .top {
        width: 12.5rem;
        height: 12.5rem;
        border-radius: 0.5rem;
        padding: 0.5rem;
        position: relative;
        background-color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        input {
          display: none;
        }

        .icon {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          border-radius: 50%;
          box-shadow: 0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075);
          font-size: 1.4rem;
          color: #9e9e9e;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.5rem;
        }
      }

      p {
        margin-top: 0.5rem;
        color: #212529;
        opacity: 0.8;
        font-size: 0.875rem;
        text-align: center;
      }
    }
  }
`;

export const UserEditStyled = styled.div`
  padding: 1.3rem 1.3rem 3rem;
  display: grid;
  gap: 2.5rem;
  background-color: #f2f3f8;
  min-height: calc(100vh - 7rem);
  min-height: calc(100svh - 7rem);
  align-content: start;

  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 2rem;

    & > .left > h1 {
      font-size: 2rem;
      font-weight: 500;
      color: #000000;
    }

    & > .right {
      display: grid;
      gap: 1.3rem;
      justify-items: end;

      & > .top {
        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;
          gap: 0.7rem;
          background-color: #5867dd;
          transition: background-color 300ms;
          padding: 0.6rem 1.05rem;
          border-radius: 0.5rem;

          & > .icon {
            font-size: 0.9rem;
            line-height: 0;
            color: #fff;
          }

          & > .text {
            font-size: 1.1375rem;
            color: #fff;
          }

          &:hover {
            background-color: #384ad7;
          }
        }
      }
    }
  }

  & > .bottom {
    display: grid;
    gap: 2rem;

    & > label,
    & > div.avatar {
      display: grid;
      gap: 0.65rem;

      & > .top {
        & > h6 {
          color: #212529;
          font-size: 1.3rem;
          font-weight: 400;

          & > .icon {
            margin-left: 5px;
          }

          & > span {
            color: #f4516c;
          }
        }
      }
      & > .bottom {
        display: grid;
        gap: 0.26rem;

        & > p {
          color: #f4516c;
          font-size: 1.1rem;
        }
      }

      &.avatar > .bottom {
        & > .top {
          width: 12.5rem;
          height: 12.5rem;
          border-radius: 0.5rem;
          padding: 0.5rem;
          position: relative;
          background-color: #fff;
          cursor: pointer;

          & > input {
            display: none;
          }

          & > .icon {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075);
            font-size: 1.4rem;
            color: #9e9e9e;
          }

          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.5rem;
          }
        }
        & > p {
          color: #212529;
          opacity: 0.8;
        }
      }

      &.input > .bottom > input {
        padding: 1.1rem 1.5rem;
        border: 0.1rem solid #c1c4cc;
        color: #575962;
        background-color: transparent;
        outline: none;
        border-radius: 0.35rem;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        font-size: 1.3rem;

        &:focus {
          border-color: #716aca;
          color: #575962;
          background-color: #fff;
        }

        &:disabled {
          color: #6f727d;
          background-color: #dcdbdb;
        }
      }

      &.select > .bottom > select {
        padding: 1.1rem 4rem 1.1rem 1.5rem;
        border: 0.1rem solid #c1c4cc;
        color: #575962;
        background-color: transparent;
        outline: none;
        border-radius: 0.35rem;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("${(p) => p.ChevronDown}");
        background-repeat: no-repeat;
        background-position: calc(100% - 1.5rem) center;
        background-size: 1rem;
        font-size: 1.3rem;

        &:focus {
          border-color: #716aca;
          color: #575962;
          background-color: #fff;
        }
      }
    }

    & > .group {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
      align-items: center;
      justify-content: end;

      & > button:first-of-type {
        padding: 0.85rem 1.5rem;
        font-size: 1.1rem;
        border: 0.1rem solid #c1c4cc;
        font-weight: 500;
        border-radius: 0.4rem;
        transition: background-color 0.3s ease-in-out;
        & > .text {
          font-size: 1.3rem;
        }

        &:not(:disabled):hover {
          background-color: #fff;
        }
      }
    }
  }
`;


export const TemplateTop = styled.div`
  display: flex;
  padding: 24px 40px ;
  padding-bottom: 0px ; 
  justify-content:space-between ; 
  align-items: center ; 
  ${theme.queryStatement(900)} {
    flex-direction: column;
    align-items: flex-start ; 
  }

  ${theme.queryStatement(theme.breakpoints.tab)} {
    padding: 15px 20px ;
    padding-bottom: 0px ;
  }

  & > .right {
    display: flex;
    align-items: center;
    gap:1rem;
    ${theme.queryStatement(theme.breakpoints.sm)} {
      padding-top:15px;
      display:grid;
      grid-template-columns: 1fr 1fr;
    } 
    ${theme.queryStatement(900)} {
      padding-top:15px;
    } 
    & > .TemplateC {
     ${theme.queryStatement(900)} {
          display:none;
      } 
    }
  }
  & > .left {
    display: flex ; 
    gap:10px ; 
    align-items:center ; 
  & > .dropDown {
    width: 150px ; 
     ${theme.queryStatement(theme.breakpoints.tab)} {
    width: 130px ;
  }
}
  & > .searchContainer {
    width: 256px ; 
    height:4rem ; 
    border: solid 1px #D3D7DD ; 
    background-color: white ; 
    border-radius: 8px ; 
    display:flex ; 
    align-items:center ; 
    padding: 0px 12px ; 
    gap: 10px ;
    &:hover {
        border: solid 1px #00BD82 ; 
      }
    & > input {
    width:100% ; 
    outline: none ; 
    border: 0px ; 
      
    }
  }
}

`
export const CustomScroll = styled.div`
 


   &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
}
     &::-webkit-scrollbar-track {
    background: #f1f1f1; 
    border-radius: 10px;
}

    &::-webkit-scrollbar-thumb {
    background: #00bd82; 
    border-radius: 10px;
}

  &::-webkit-scrollbar-thumb:hover {
    background: #00bd82; 
}
`;