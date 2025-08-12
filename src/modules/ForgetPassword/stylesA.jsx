import theme from "@/theme";
import styled from "@emotion/styled";

export const ForgetPasswordStyled = styled.section`
height:100vh ;
display:flex ; 


& > .left {
// width:50% ;
width: 750px ; 
// background-color: #C9EDE4 ;
background-color:#F1F3F8 ;
display: flex;
flex-direction:column ; 
    // justify-content: end;
    // align-items: center;

       ${theme.queryStatement(theme.breakpoints.tab)} {
     display:none ;
    }
        ${theme.queryStatement(theme.breakpoints.xxlgg)} {
     display:none ;
    }
& > .left_img{
flex-grow: 1 ; 
// background-color: red ; 
display: flex ;
align-items: end ;
justify-content:end ; 


& > div {

// background-color:green ; 

& > .left_text{
display:flex ; 
justify-content: center ; 
font-size:40px ; 
// line-height:48px ;
font-weight: 400 ; 
color: #151A28 ; 
 font-family:Fellix, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif ;
}
}

}


& > .logo {
padding: 40px 40px ;
}

& > .body {
margin-top:40px ;

& > .welcome-text {
font-size: 38px ;
font-weight : 700 ; 
color : #2E2E2E ;
text-align: center

}

& > .image-body {
display: grid ;
justify-content: center ;
}
}

}


& > .right {
width:50% ;
display:flex ; 
justify-content:center ;
// align-items:center ;
padding-top:30px ; 
overflow:auto ; 

    ${theme.queryStatement(theme.breakpoints.tab)} {
     width:100% ;
     padding: 0px 1.5rem;
    }
         ${theme.queryStatement(theme.breakpoints.xxlgg)} {
            width:100% ;
     padding: 0px 1.5rem;
        }
     
 & > section {
    //   padding: 2rem 3rem;
      border-radius: 1rem;
      background-color: white;
         width:80% ;
      max-width: 435px ;
      display:flex ; 
flex-direction: column;
      & > .top {
        ${theme.queryStatement(theme.breakpoints.xlg)} {
          // max-width: 65rem;
          max-width: 435px ;
          margin: 0 auto;
          width: 100%;
        }
         
      }
      & > .bottom {
        display: grid;
        // gap: 1.95rem;
        max-width: 60rem;
        margin: 0 auto;

        & > .top {
          & > header {
            margin-bottom: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            & > h1 {
              color: #212529;
              font-size: 2rem;
              text-align: left;
              font-weight: 500;
              line-height: 1.2;
              margin-top: 1.4rem;
            }
            & > a > img {
              width: 17.25rem;
            }
          }

          & > p {
            font-size: 1.3rem;
            color: #212529;
            font-weight: 300;
          }
        }

        & > .bottom {
          & > form {
            display: grid;
            gap: 4rem;
            width: 100%;

            & > .top {
              display: grid;
              gap: 1.95rem;
            }

            & > .bottom {
              display: grid;
              gap: 1.7rem;

              & > .top {
                display: grid;
                gap: 1.3rem;
              }
              & > .bottom {
                // display: grid;
                align-items: center;
                justify-content: end;
                grid-template-columns: auto auto;
                gap: 0.5rem;

                & > button {
                  width: 100%;
                //   background-color: transparent;
                 background-color: #00B388;
                  height:56px ;
                  padding: 1.1rem 1.5rem;
                //   border-radius: 0.35rem;
                   border-radius : 8px ;
                  transition: background-color 300ms;
                //   border: 0.1rem solid #384ad7;

                  &:has(.icon) {
                    display: grid;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    grid-template-columns: auto auto;
                  }

                  & > .text {
                    // font-size: 1.3rem;
                    font-size:16px ;
                    // color: #384ad7;
                    color:white ;
                    transition: color 300ms;
                  }

                  & > .icon {
                    color: #384ad7;
                    font-size: 1.2rem;
                    line-height: 0;
                    transition: color 300ms;
                  }

                  &:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                  }

                  &:not(:disabled):hover {
                    // background-color: #384ad7;
                     background-color: #006B51;

                    & > .text {
                      color: #fff;
                    }
                    & > .icon {
                      color: #fff;
                    }
                  }

                  &:nth-of-type(2) {
                    border: 0.1rem solid #5867dd;
                    background-color: #5867dd;
                    padding: 1.1rem 5rem;
                    & > .text {
                      color: #fff;
                    }

                    &:not(:disabled):hover {
                      border: 0.1rem solid #384ad7;
                      background-color: #384ad7;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

}


`
export const ButtonEmail = styled.div`
& > button {
  width: 100%;
//   background-color: transparent;
 background-color: #00B388;
  height:56px ;
  padding: 1.1rem 1.5rem;
//   border-radius: 0.35rem;
   border-radius : 8px ;
  transition: background-color 300ms;
//   border: 0.1rem solid #384ad7;

  &:has(.icon) {
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    grid-template-columns: auto auto;
  }

  & > .text {
    // font-size: 1.3rem;
    font-size:16px ;
    // color: #384ad7;
    color:white ;
    transition: color 300ms;
  }

  & > .icon {
    color: #384ad7;
    font-size: 1.2rem;
    line-height: 0;
    transition: color 300ms;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    // background-color: #384ad7;
     background-color: #006B51;

    & > .text {
      color: #fff;
    }
    & > .icon {
      color: #fff;
    }
  }
    `