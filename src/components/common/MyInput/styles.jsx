import styled from "@emotion/styled";

export const MyInputStyled = styled.label`
    display: grid;
    gap: 0.2rem;
    width:100%;
    & > .top {
        display: grid;
        gap: 0.65rem;

        & > .top {
            & > span {
                // font-size: 1.2rem;
                font-size: 16px ; 
                // color: #5e5873;
                color : #012635 ; 
                font-weight: 400;
                line-height: 22px ;
            }
        }
        & > .bottom {
            & > input {
                // padding: 1.1rem 1.5rem;
                padding: 0px 16px;
                height : 48px ; 
                // border-radius: 0.4rem;
                 border-radius: 8px ; 
                outline: none;
                // color: #575962;
                color : #012635 ; 

                display: block;
                width: 100%;
                // font-size: 1.3rem;
                font-size: 16px ; 
                line-height: 1.25;
                background-clip: padding-box;
                // border: 1px solid #ebedf2; 
                //  border: 1px solid #D9D9D9; 
                //  border: 1px solid ${({color}) => color ? color : "#D9D9D9"}; 
                 border: 1px solid ${({color}) => color ? color : "#D3D7DD"}; 
                font-family: "Inter", sans-serif;
                align-items: center ;

                &:focus {
                    // border-color: #716aca;
                    border-color: #5BF1B2 ;
                    color: #575962;
                }
            }
        }
    }
    & > .bottom {
        & > p {
            // font-size: 1.04rem;
            // font-size: 10px ; 
            font-size: 16px ;
            font-weight: 400 ;
            line-height: 22px ;
            // color: #f4516c;
            // color : #7c1600 ;
            color : #EA3815 ; 
        }
    }
`;
