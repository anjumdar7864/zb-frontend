import theme from "@/theme";
import styled from "@emotion/styled";

export const PageNotFoundStyled = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    padding: 10rem 3rem 10.4rem;
    gap: 6.6rem;

    & > .top {
        & > img {
            max-width: 80vw;
            width: 40rem;
        }
    }
    & > .bottom {
        display: grid;
        align-items: center;
        justify-items: center;
        gap: 1.9rem;
        & > h1 {
            color: #212529;
            font-size: 2rem;
            font-weight: 500;
            letter-spacing: 0.0596rem;
        }

        & > p {
            color: #333;
            text-align: center;
            font-size: 1.3rem;
            line-height: 1.54;
            letter-spacing: 0.0396rem;
            max-width: 48.1rem;
        }

        & > a {
            display: inline-block;
            padding: 0.64rem 1.1rem;
            color: ${theme.colors.white};
            font-family: fellix;
            font-size: 1.3rem;
            font-weight: 400;
            border-radius: 0.5rem;
            border: 0.1rem solid #5867dd;
            background-color: #5867dd;

            transition: background 300ms, border 300ms;
            &:hover {
                background-color: #384ad7;
                border: 0.1rem solid #384ad7;
            }
        }
    }
`;
