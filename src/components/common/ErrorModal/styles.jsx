import styled from "@emotion/styled";

export const ErrorModalStyled = styled.div`
    z-index: 9997;
    position: fixed;
    min-height: 100vh;
    min-height: 100svh;
    display: grid;
    align-items: center;
    width: 100%;

    & > .overlay {
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 9998;
        position: fixed;
        z-index: 0;
        inset: 0;
    }

    & > .box {
        z-index: 9999;
        position: relative;
        margin: 0 auto;
        max-width: 41.6rem;
        width: 100%;
        background-color: #fff;
        border-radius: 0.6rem;
        padding: 3.9rem;

        display: grid;
        justify-items: center;
        gap: 2.8rem;

        & > .top {
            & > .icon {
                display: grid;
                line-height: 0;
                align-items: center;
                justify-content: center;
                font-size: 7.1rem;
            }
        }
        & > .bottom {
            display: grid;
            justify-items: center;
            gap: 3.2rem;

            & > h2 {
                color: #575962;
                font-size: 1.7rem;
                font-weight: 500;
                text-align: center;
                text-transform: none;
                word-wrap: break-word;
            }
            & > .bottom {
                display: grid;
                justify-items: center;
                // gap: 4rem;
              
                width:100% ; 
                & > p {
                    color: #6f727d;
                    font-size: 1.4rem;
                }
             & > div {
            display:flex ; 
            justify-content: end ; 
            padding:16px ; 
            border-top: solid 1px #F0F0F0 ;  
             width:100% ; 

              & > button {
                    display: block;
                    // padding: 0.8rem 2.7rem;
                    background-color: #3085d6;
                    border-radius: 0.4rem;
                    font-size: 1.3rem;
                    color: #fff;
                    width:100px ; 
                    height:40px ; 

                    &:hover {
                        background-image: linear-gradient(
                            rgba(0, 0, 0, 0.1),
                            rgba(0, 0, 0, 0.1)
                        );
                    }
                }
             }
               
            }
        }
    }
`;
