import styled from "@emotion/styled";
import { Modal } from "@mui/material";

export const ConfirmModalStyled = styled.div`
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
        max-width: 700px;
        width: 100%;
        background-color: #fff;
        border-radius: 16px;
        /* padding: 3.9rem; */

        display: grid;
        justify-items: center;
        /* gap: 2.8rem; */

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
            width: 100%;
            /* gap: 3.2rem; */

            & > h2 {
                color: #012635;
                font-size: 18px;
                font-weight: 600;
            }
            & > .bottom {
                display: grid;
                justify-items: center;
                /* gap: 4rem; */
                width: 100%;

                & > p {
                    color: #073F56;
                    font-size: 16px;
                    text-align: center;
                }

                & > .group {
                    display: grid;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    grid-template-columns: auto auto;
                    & > button {
                        display: block;
                        padding: 0.8rem 2.7rem;
                        background-color: #3085d6;
                        border-radius: 0.4rem;
                        font-size: 1.3rem;
                        color: #fff;

                        &:hover {
                            background-image: linear-gradient(
                                rgba(0, 0, 0, 0.1),
                                rgba(0, 0, 0, 0.1)
                            );
                        }

                        &:nth-of-type(1) {
                            background-color: #f4516c;
                        }
                    }
                }
            }
        }
    }
`;

export const MUIModalStyled = styled(Modal)`
    & > .MuiModal-backdrop {
        opacity: 0 !important;
        transition: import { ConfirmModalStyled } from './styles';
none;
    }
`;
