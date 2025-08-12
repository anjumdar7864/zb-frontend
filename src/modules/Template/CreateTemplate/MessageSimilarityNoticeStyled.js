import styled from "@emotion/styled";
import color from "@/styles/color";

export const MessageSimilarityNoticeStyled = styled.div`
  width: 95vw;
  max-width: 80rem;
  background-color: ${color.BackgroundColor};
  text-align: center;

  & > .middle {
    padding: 2.5rem;
    display: grid;
    gap: 1.5rem;
    align-content: start;

    & > .top {
      display: grid;
      align-content: start;
      & > .icon {
        color: ${color.Warning}
      }
      & > h2 {
        margin: 2rem 0;
        font-weight: 500;
      }

      & > .note {
        font-size: 1.4rem;
      }
      & > .link {
        font-size: 1.4rem;
        & > a {
          color: ${color.Primary};
          &:hover {
            text-decoration: underline;
          }
        }
      }
      & > strong {
        margin-top: 1rem;
        font-size: 1.25rem;
        letter-spacing: .02rem;
      }
    }

  }

  & > .bottom {
    padding: 1.3rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;

    & > button {
      display: grid;
      align-items: center;
      justify-content: center;
      grid-template-columns: auto auto;
      gap: 0.7rem;
      background-color: ${color.ButtonBackground};
      transition: background-color 300ms;
      padding: 0.6rem 1.05rem;
      border-radius: 0.5rem;
      font-size: 1.1375rem;
      color: ${color.SecondaryText};

      &:hover {
        background-color: ${color.ButtonBackgroundHover};
      }
    }
  }
`;