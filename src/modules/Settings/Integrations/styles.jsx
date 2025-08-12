import theme from "@/theme";
import styled from "@emotion/styled";

export const IntegrationStyleMain = styled.div`
  padding: 0rem 40px;
  & > .grid-section {
    margin-top: 2rem;
    padding-inline: 3.6rem;
    padding-bottom: 3.6rem;
    background-color: #fff;
    border-radius: 0.6rem;
    margin-bottom: 6rem;
    border:1px solid #E0E0E0;
    & > .header{
      width:100%;
      padding-block:3.4rem;
      display:flex;
      align-items:center;
      justify-content:space-between;
      & > div{
        & > h6{
          font-size:2rem;
          color:#012635;
        }
        & > .SliderContainer{
          border:1px solid #D3D7DD;
          padding:10px;
          width:280px;
          height:50px;
          border-radius:5rem;
          display:flex;
          align-items:center;
          justify-content:space-between;
          position:relative;
          cursor:pointer;
          transition:0.4s all;
          & > .integration{
            width:140px;
            height:50px;
            display:flex;
            align-items:center;
            justify-content:center;
          transition:0.4s all;
            & > p{
              color:#777777;
            }
          }
            
          & > .AbsoluteContainer{
            width:130px;
            height:40px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#00BD82;
            position:absolute;
            border-radius:5rem;
          transition:0.4s all;
            & > p{
              color:white;
            }
          }
          & > .apiKey{
            width:140px;
            height:50px;
            display:flex;
            align-items:center;
            justify-content:center;
          transition:0.4s all;
            & > p{
              color:#777777;
            }
          }
        }
      }
    }
    & > .grid{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2rem;
      ${theme.queryStatement(theme.breakpoints.xxxlg)} {
        grid-template-columns: repeat(3, 1fr);
      }
      ${theme.queryStatement(theme.breakpoints.xlgg)} {
        grid-template-columns: repeat(2, 1fr);
      }
      ${theme.queryStatement(theme.breakpoints.md)} {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    & > .bottom {
        max-width:100%;
        overflow:auto;
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


      & > .table {
        display: grid;
        background-color:white ; 
        width: ${(p) => p.tableWidth}px;
        // overflow-x: auto;



        & > .row {
          display: grid;
          grid-template-columns: 
          minmax(100px, 5fr)
          minmax(100px, 1.5fr)
          minmax(100px, 0.5fr);
          gap: 0rem;
          padding: 1rem 1.3rem;
          align-items: center;

          

            background-color:white

                    &:nth-of-type(odd) {
              // background-color: #f9f9f9 !important;
            }

            &:nth-of-type(even) {
              // background-color: #e9e9e9 !important;
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
`;

// Components

export const IntegrationCardStyle = styled.div`
  border-radius: 2px;
  overflow: hidden;
  transition: 0.3s ease-in-out;
  border: 1px solid #E0E0E0;
  border-radius:0.6rem;
  // &:hover {
  //   box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.1),
  //     5px 5px 10px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.1);
  // }

  
  & > .Image-section {
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    padding-inline:1.5rem;
    padding-top:1.5rem;
    & > .Image{
      height:5.2rem;
      width:9rem;
    }
    & > .otherActions{
      display:flex;
      align-items:center;
    }
   }

  & > .banner-section {
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
      padding: 6rem 0rem;
      height: 20rem;
      width: 20rem;
      object-fit: contain;
    }
  }

  & > .content-section {
    padding: 1.2rem 1.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    & > button {
      background-color: #5867dd;
      border-color: #5867dd;
      color: white;
      font-size: 1.2rem;
      font-weight: 300;
      border-radius: 0.3rem;
      padding: 0.4rem 1.2rem;
    }

    & > h5 {
      font-size: 1.4rem;
      font-weight: 600;
      color: #15141E;
    }
    & > p {
      font-size: 1.1rem;
      font-weight: 400;
      color: #71717A;
      line-height: 1.95rem;
      margin-top: 0.5rem;
    }

    & > div {
      display: flex;
      align-items: center;
      & > div {
        display: flex;
        align-items: center;
        /* background-color: #34bfa3; */
        color: white;
        font-size: 1.2rem;
        padding: 0.3rem 0.7rem;
        border-radius: 2rem;
        margin-right: 1.6rem;
        font-weight: 300;
        & > * {
          &:first-child {
            margin-right: 0.3rem;
          }
        }
      }

      & > button {
        font-size: 1.3rem;
        font-weight: 300;
        color: blue;
      }
    }
  }
`;

// Zapir Model Style

export const ZapireModelStyle = styled.div`
  background-color: white;
  width: 38rem;
  /* border-radius: 0.7rem; */
  margin-top: 8rem;
  max-height: 80vh;
  overflow-y: hidden;
  overflow-y: scroll;
  padding: 2rem 2.5rem;

  ::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }

  /* Track (background of the scrollbar) */
  ::-webkit-scrollbar-track {
    background: white; /* Color of the track */
    border-top-right-radius: 0.7;
    display: none;
  }

  /* Handle (thumb) */
  ::-webkit-scrollbar-thumb {
    background: #888; /* Color of the thumb */
    border-radius: 5px; /* Rounded corners */
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color of the thumb on hover */
  }

  & > div {
    text-align: right;
    & > * {
      font-size: 2rem;
      cursor: pointer;
    }
  }
  & > section {
    & > header {
      height: 15rem;
      width: 15rem;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      & > a {
        text-align: center;
        & > img {
          width: 80%;
        }
      }
    }
    & > center {
      & > h6 {
        margin-top: 2rem;
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 3rem;
      }
    }
    & > p {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 2rem;

      & > a {
        color: #4040cf;
        text-decoration: none;
        font-weight: 500;
      }
    }

    & > div {
      margin-top: 2rem;
      & > label {
        font-size: 1.2rem;
        font-weight: 400;
        display: block;
        margin-bottom: 0.7rem;
      }
      & > section {
        display: flex;
        align-items: center;
        gap: 1rem;
        & > input {
          width: 80%;
          padding: 0.7rem 1rem;
          border-radius: 0.3rem;
          border: 1px solid #81818147;
          font-size: 1.1rem;
          font: 400;
          &:focus {
            outline-color: #2a2a8da6;
          }
        }
        & > button {
          width: 20%;
          background-color: #5867dd;
          border-color: #5867dd;
          padding: 0.7rem 1.05rem;
          border-radius: 0.4rem;
          color: white;
          font-weight: 500;
        }
      }
    }
  }

  & > blockquote {
    margin-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > button {
      padding: 0.6rem;
      width: 8rem;
      border-radius: 0.4rem;
      font-size: 1.1rem;
      font-weight: 400;
    }
    & > * {
      &:first-child {
        border: 1px solid #81818147;
        margin-right: 1rem;
      }
      &:last-child {
        background-color: #5867dd;
        border-color: #5867dd;
        border: 1px solid;
        color: white;
      }
    }
  }
`;


export const CreateNewModalStyled = styled.div`
  // width: 75vw;
  width:680px ; 
  // max-width: 54.6rem;
  max-width:680px ; 
  background-color: #fff;
  border-radius: 12px 12px;
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 8px 16px 8px 16px;
    background-color: #fff;
    border-radius: "12px 12px 0 0";

    & > h2 {
      font-size: 18px;
      line-height: "600";
      color: #012635;
      font-weight: 600;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > button {
      font-size: 1.6rem;
      color: #212529;
      opacity: 0.6;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }
  }


  & > .warning{
      padding:1rem;
    & > .warningInner{
      background:#D6E7FC;
      padding:0.8rem;
      border-radius:0.5rem;
      display:flex;
      align-items:center;
      & > p{
        margin-left:10px;
        color:#012635;
      }
      & > .Dismiss{
        margin-right:10px;
        margin-left:10px;
        color:#012635;
        margin-top:0;
        cursor:pointer;
      }
    }
  }
  & > .bottom {
    & > .top {
      padding: 26px 24px;
      display: grid;
      gap: 2rem;

      & > .row-flex {
        & > #paddingLess {
          & > input {
            padding: 0.5rem 1rem;
            ${theme.queryStatement(theme.breakpoints.xxxlgg)} {
              padding: 0.65rem 1rem;
            }
            ${theme.queryStatement(theme.breakpoints.xxlg)} {
              padding: 0.7rem 1rem;
            }
            ${theme.queryStatement(theme.breakpoints.xxlg)} {
              padding: 0.85rem 1rem;
            }
            ${theme.queryStatement(theme.breakpoints.lg)} {
              padding: 0.98rem 1rem;
            }
            ${theme.queryStatement(theme.breakpoints.sm)} {
              padding: 1.1rem 1rem;
            }
          }
        }
      }

      & > .row {
        display: grid;
        grid-template-columns: 1fr;
        align-content: center;
        align-items:flex-end;
        gap: 1.5rem;
        & > button {
                border: 0.1rem solid #00BD82;
                color: #00BD82;
                background-color: transparent;
                outline: none;
                border-radius: 10px;
                transition: background-color 300ms, color 300ms,
                  border-color 300ms;
                width: 100%;
                font-size: 1.3rem;
                height:50px
              }
        .dropdown-search {
          & > div {
            position: relative;

            & > div {
              position: absolute;
              width: 100%;
              margin-top: 0rem;
              border: 0.1rem solid #c1c4cc;
              border-radius: 0.35rem;
              padding: 0.6rem 0.4rem;
              height: 150px;
              overflow-y: hidden;
              overflow-y: scroll;
              background-color: white;
              &::-webkit-scrollbar {
                width: 5px;
                border-radius: 2rem;
              }

              /* Track */
              &::-webkit-scrollbar-track {
                background: #f1f1f1;
                display: none;
              }

              /* Handle */
              &::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 2rem;
              }

              /* Handle on hover */
              &::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
              & > p {
                font-size: 1.3rem;
                padding: 1rem 1.4rem;
                border-radius: 0.35rem;
                margin: 1px 0rem;
                cursor: pointer;
                &:hover {
                  background-color: #80808045;
                }
              }
            }

            /* & > label {
              display: grid;
              gap: 0.3rem;
              align-content: start;
              &.col2 {
                grid-column: 1/-1;
              }

              & > .text {
                font-size: 1.3rem;
                color: #212529;
              }
               
              & > input {
                padding: 1.1rem 1.5rem;
                border: 0.1rem solid #c1c4cc;
                color: #575962;
                background-color: green;
                background-color: transparent;
                outline: none;
                border-radius: 10px;
                transition: background-color 300ms, color 300ms,
                  border-color 300ms;
                width: 100%;
                font-size: 1.3rem;
         
                &:focus {
                  border-color: #00BD82;
        
                  color: #575962;
                  background-color: #fff;
                }

                &:disabled {
                  border-color: #f4f5f8;
                  color: #6f727d;
                  background-color: #f4f5f8;
                }
              }


             
              & > p {
                font-size: 1.1rem;
                color: #f4516c;
              }
            } */
          }
        }

        & > label {
          display: grid;
          gap: 0.3rem;
          align-content: start;

          &.col2 {
            grid-column: 1/-1;
          }

          & > .text {
            font-size: 14px;
            color: #012635;
            line-height: 22px;
            font-weight: 500;
          }
          & > input {
            padding: 0px 1.5rem;
            height:48px ; 
            border: 0.1rem solid #d3d7dd;
            color: #575962;
            background-color: transparent;
            outline: none;
            border-radius: 8px;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            width: 100%;
            font-size: 1.3rem;
            
            &:focus {
              border-color: #00BD82;
              color: #575962;
              background-color: #fff;
            }

            &:disabled {
              border-color: #f4f5f8;
              color: #6f727d;
              background-color: #f4f5f8;
            }
          }
          & > p {
            font-size: 1.1rem;
            color: #f4516c;
          }
        }
      }
    }
    & > .bottom {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
      align-items: center;
      justify-content: end;
      padding: 16px;
      background-color: #fff;

      & > button:first-of-type {
        padding: 0.85rem 1.5rem;
        font-size: 1.1rem;
        border: 0.1rem solid #c1c4cc;
        font-weight: 500;
        border-radius: 8px;
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