import styled from "@emotion/styled";

export const SortIconStyled = styled.span`
  width: 1.3rem;
  height: 1.3rem;
  display: inline-block;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    transition: opacity 300ms;
    position: absolute;
    inset: 0;
    height: 1.2rem;
    width: 1rem;
    margin: 0rem 0.3rem;
    &:nth-of-type(1) {
      opacity: ${(p) => (p.isSorted ? 0 : 1)};
    }
    &:nth-of-type(2) {
      opacity: ${(p) => (!p.isSorted || p.direction === -1 ? 0 : 1)};
    }
    &:nth-of-type(3) {
      opacity: 0;
    }
    &:nth-of-type(4) {
      opacity: ${(p) => (!p.isSorted || p.direction === 1 ? 0 : 1)};
    }
    &:nth-of-type(5) {
      opacity: 0;
    }
  }

  &:hover > img {
    &:nth-of-type(1) {
      opacity: ${(p) => (p.isSorted ? 0 : 1)};
    }
    &:nth-of-type(2) {
      opacity: 0;
    }
    &:nth-of-type(3) {
      opacity: ${(p) => (!p.isSorted || p.direction === -1 ? 0 : 1)};
    }
    &:nth-of-type(4) {
      opacity: 0;
    }
    &:nth-of-type(5) {
      opacity: ${(p) => (!p.isSorted || p.direction === 1 ? 0 : 1)};
    }
  }
`;
