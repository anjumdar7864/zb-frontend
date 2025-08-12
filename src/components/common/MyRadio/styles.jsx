import styled from "@emotion/styled";

export const MyRadioStyled = styled.label`
    display: grid;
    width: 100%;
    gap: 1.2rem;
    grid-template-columns: auto 1fr;
    align-content: start;
    cursor: pointer;
    user-select: none;

    & > img {
        width: 1.8rem;
    }
    & > span {
        color: #575962;
        font-size: 1.3rem;
    }
`;
