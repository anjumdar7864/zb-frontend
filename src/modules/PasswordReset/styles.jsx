import theme from "@/theme";
import styled from "@emotion/styled";

export const PasswordResetStyled = styled.section`
    ${theme.queryStatement(theme.breakpoints.xlg)} {
        background-image: url("${(p) => p.bgImage2}");
        background-position: center center;
        background-size: cover;
        min-height: 100vh;
        min-height: 100svh;

        padding: 6rem 9rem;
    }

    ${theme.queryStatement(theme.breakpoints.md)} {
        padding: 6rem 2rem;
        display: grid;
        align-content: center;
    }

    & > .left {
        width: calc(100% - 36%);
        padding: 10rem 12rem 4rem 5rem;
        display: grid;
        gap: 9rem;

        ${theme.queryStatement(theme.breakpoints.xlg)} {
            width: 100%;
            background-color: #fff;

            padding: 6rem 4rem;
            border-radius: 1rem;
            gap: 6rem;
        }

        ${theme.queryStatement(theme.breakpoints.sm)} {
            padding: 4rem 3rem;
        }

        & > .top {
            ${theme.queryStatement(theme.breakpoints.xlg)} {
                max-width: 65rem;
                margin: 0 auto;
                width: 100%;
            }
            & > a > img {
                width: 17.25rem;
            }
        }
        & > .bottom {
            display: grid;
            gap: 1.95rem;

            & > .top {
                & > h1 {
                    color: #212529;
                    font-size: 2rem;
                    text-align: center;
                    font-weight: 500;
                    line-height: 1.2;
                }
            }

            & > .bottom {
                & > form {
                    max-width: 39rem;
                    display: grid;
                    gap: 4.2rem;
                    width: 100%;
                    margin: 0 auto;

                    ${theme.queryStatement(theme.breakpoints.xxlg)} {
                        max-width: 30rem;
                    }

                    ${theme.queryStatement(theme.breakpoints.xlg)} {
                        max-width: 60rem;
                    }

                    & > .top {
                        display: grid;
                        gap: 1.95rem;
                    }

                    & > .bottom {
                        display: grid;
                        gap: 1.7rem;

                        & > .bottom {
                            & > button {
                                position: relative;
                                width: 100%;
                                background-color: #5867dd;
                                padding: 1.1rem 1.5rem;
                                font-size: 1.3rem;
                                color: #fff;
                                border-radius: 0.35rem;
                                transition: background-color 300ms;
                                &:disabled {
                                    opacity: 0.65;
                                    cursor: not-allowed;
                                }

                                &:not(:disabled):hover {
                                    background-color: #384ad7;
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
                                    left: calc(50% + 4rem);
                                    transform: translate(
                                        -50%,
                                        calc(-50% + 0.25rem)
                                    );
                                    opacity: 0;
                                    transition: left 300ms, opacity 300ms;
                                }

                                &:not(:disabled):hover {
                                    & > .text {
                                        left: calc(50% - 1rem);
                                    }
                                    & > .icon {
                                        left: calc(50% + 6rem);
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
    & > .right {
        position: fixed;
        height: 100vh;
        background-image: url("${(p) => p.bgImage}");
        background-position: center center;
        background-size: cover;
        overflow: hidden;
        top: 0;
        right: 0;

        width: 36%;

        padding: 7.5rem 2.6rem 2.6rem;
        display: grid;
        gap: 5rem;
        align-content: start;

        ${theme.queryStatement(theme.breakpoints.xlg)} {
            display: none;
        }

        & > .top {
            & > span {
                color: #f8f9fa;
                text-shadow: 1px 1px 1px #333;
                font-size: 2.2rem;
                text-align: center;
                display: block;
                font-weight: 500;
            }
        }
        & > .bottom {
            display: grid;
            gap: 12rem;

            & > img {
                width: 100%;
            }
        }
    }
`;
