import theme from "@/theme";
import styled from "@emotion/styled";


export const LoginStyled = styled.section`

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
// width:50% ;
// background-color: red ; 
flex-grow: 1 ;
display:flex ; 
justify-content:center ;
// align-items:center ;
overflow:auto ; 
padding-top:30px ; 
    ${theme.queryStatement(theme.breakpoints.tab)} {
     width:100% ;
     padding: 0px 1.5rem;
    }


 & > section {
height:100% ; 
display:flex ; 
flex-direction: column;
    //   padding: 2rem 3rem;
      border-radius: 1rem;
      background-color: white;
    //   background-color:green ;
      width:80% ;
      max-width: 434px ;

      ${theme.queryStatement(theme.breakpoints.xxllggg)} {
        width: 100%;
        // padding: 4rem 3rem;
      }

      /* width: 50%; */

      /* & > .top {
        background-color: white;
        ${theme.queryStatement(theme.breakpoints.xlg)} {
          max-width: 65rem;
          margin: 0 auto;
          width: 100%;
        }
        & > a > img {
          width: 17.25rem;
        }
      } */
      & > .bottom {
        /* background-color: white;
        display: grid;
        gap: 1.95rem; */

        & > .top {
          display: flex;
          // align-items: center;
          justify-content: center;
          flex-direction: column;
          & > a > img {
            width: 17.25rem;
            /* margin-bottom: rem; */
          }
          & > h1 {
            color: #212529;
            font-size: 2rem;
            text-align: center;
            font-weight: 500;
            line-height: 1.2;
            padding-bottom: 2rem;
          }
        }

        & > .bottom {
          & > form {
            /* max-width: 39rem; */
            display: grid;
            gap: 2.5rem;
            width: 100%;
            margin: 0 auto;

            /* ${theme.queryStatement(theme.breakpoints.xxlg)} {
              max-width: 30rem;
            }

            ${theme.queryStatement(theme.breakpoints.xlg)} {
              max-width: 60rem;
            }
            ${theme.queryStatement(theme.breakpoints.xxllggg)} {
              max-width: 55rem;
            } */

            & > .top {
              display: grid;
              gap: 1.95rem;

              & > .item {
                display: grid;
               
                align-content: start;
                & > a {
                 margin-top: 5px ;
                  // justify-self: end;
                  // font-size: 1.3rem;
                  font-size: 14px;
                  // color: #5867dd;
                  // color: #2E2E2E ;
                  color:#012635 ; 
                     font-family:Fellix, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif ;
                  &:hover {
                    text-decoration: underline;
                    color: #012635  ;
                  }
                }
              }
            }

            & > .bottom {
              display: grid;
              gap: 1.7rem;

              & > .top {
                display: grid;
                gap: 1.3rem;
              }
              & > .bottom {
                & > button {
                  position: relative;
                  width: 100%;
                  // background-color: #5867dd;
                  background-color: #00B388;
                  padding: 1.1rem 1.5rem;
                  height:56px ;
                  // font-size: 1.3rem;
                  font-size:16px ;
                  color: #fff;
                  // border-radius: 0.35rem;
                  border-radius : 8px ;
                  transition: background-color 300ms;
                  &:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                  }

                  &:not(:disabled):hover {
                    // background-color: #384ad7;
                    background-color: #006B51;
                  }

                  & > .extra {
                    visibility: hidden;
                  }

                  & > .text {
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    transition: left 300ms;
                  }

                  & > .icon {
                    color: #fff;
                    font-size: 1.2rem;
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: calc(50% + 1.5rem);
                    transform: translate(-50%, calc(-50% + 0.25rem));
                    opacity: 0;
                    transition: left 300ms, opacity 300ms;
                  }

                  &:not(:disabled):hover {
                    & > .text {
                      left: calc(50% - 1rem);
                    }
                    & > .icon {
                      left: calc(50% + 3rem);
                      opacity: 1;
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