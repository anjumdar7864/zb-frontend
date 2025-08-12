import styled from "@emotion/styled";

export const StyleWellCome = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 7.4rem);
  & > section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & > img {
      height: 14rem;
      width: 20rem;
    }
    & > h1 {
      margin: 2rem 0rem;
      font: 6rem;
      text-transform: uppercase;
      letter-spacing: 1.5rem;
    }
    & > p {
      font-size: 1.4rem;
      text-transform: uppercase;
    }
  }
`;
