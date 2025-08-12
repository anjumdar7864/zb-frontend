import styled from "@emotion/styled";

export const MyInputWithEndIconStyled = styled.label`
    display: grid;
    gap: 0.2rem;

    & > .top {
        display: grid;
        gap: 0.65rem;

        & > .top {
            & > span {
                // font-size: 1.2rem;
                font-size:14px ;
                // color: #5e5873;
                 color : #012635 ; 
                font-weight: 500;
            }
        }
        & > .bottom {
            position: relative;
            & > input {
                // padding: 1.1rem 6rem 1.1rem 1.5rem;
                padding: 0px 16px;

                // border-radius: 0.4rem;
                      border-radius: 8px ; 
                           height : 48px ; 
                outline: none;
                color: #575962;
                display: block;
                width: 100%;
                font-size: 1.3rem;
                line-height: 1.25;
                background-clip: padding-box;
                // border: 1px solid #ebedf2;
                //   border: 1px solid #D9D9D9; 
                  border: 1px solid ${({color}) => color ? color : "#D3D7DD"}; 
                font-family: "Inter", sans-serif;

                &:focus {
                    // border-color: #716aca;
                        // border-color: #2E2E2E ;
                        border-color:#5BF1B2 ;
                    color: #575962;
                }
            }

            & > span {
                position: absolute;
                top: 50%;
                right: 1.5rem;
                font-size: 2rem;
                line-height: 0;
                transform: translate(0, -50%);
                cursor: pointer;
            }
        }
    }
    & > .bottom {
        & > p {
            // font-size: 1.04rem;
            font-size: 14px ; 
            font-weight: 400 ;
            // color: #f4516c;
            color : #EA3815 ;
            line-height: 22px ;

            & > ul {
                list-style: none;
            }
        }
    }
`;
