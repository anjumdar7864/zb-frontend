import styled from "@emotion/styled";

export const MySwitchStyled = styled.label`
    display: grid;
    width: 100%;
    gap: 1.2rem;
    grid-template-columns: auto 1fr;
    align-content: start;
    cursor: pointer;
    user-select: none;

    & > .left {
        & > img {
            width: 2rem;
        }
    }
    & > .right {
        & > span {
            color: #575962;
            font-size: 1.3rem;

            & a {
                color: #5867dd;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;
