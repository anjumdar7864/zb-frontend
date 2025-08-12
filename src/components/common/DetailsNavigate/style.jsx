import styled from "@emotion/styled";
import theme from "@/theme";

export const DetailNav = styled.div`
  & > .detail-navigation {
    padding: 3rem 8rem;

    ${theme.queryStatement(theme.breakpoints.md)} {
      padding: 2rem 3rem;
    }
    & > center {
      & > img {
        width: 200px;
      }
    }
    & > h1 {
      text-align: center;
      color: black;
      font-weight: 600;
      font-size: 1.7rem;
    }
    & > div {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      & > .detail-navigation-container {
        & > h2 {
          color: black;
          font-weight: 700;
          font-size: 1.4rem;
          line-height: 3rem;
        }
        & > div {
          & > p {
            color: black;
            font-weight: 300;
            font-size: 1.4rem;
            & > a {
              color: #0563c1;
              text-decoration: underline;
            }
          }
          & > div {
            padding: 0.6rem 0rem;
            & > ul {
              padding-left: 4.4rem;
              color: black;
              & > li {
                font-weight: 300;
                font-size: 1.4rem;
              }
            }
          }
        }
      }
    }
  }
`;

export const OrderNavigateStyle = styled.div`
  & > div {
    padding: 3rem 8rem;
    ${theme.queryStatement(theme.breakpoints.md)} {
      padding: 2rem 3rem;
    }
    & > center {
      & > img {
        width: 200px;
      }
    }
    & > h1 {
      text-align: center;
      color: black;
      font-weight: 600;
      font-size: 1.7rem;
    }
    & > .orderNavigate-data {
      & > div {
        /* margin: 1rem 0rem; */

        & > h2 {
          color: black;
          font-weight: 700;
          font-size: 1.4rem;
          line-height: 3rem;
        }
        & > p {
          color: black;
          font-weight: 300;
          font-size: 1.4rem;
        }

        & > .orderNavigate-data-list {
          padding-top: 1rem;
          padding-bottom: 1rem;
          padding-left: 2rem;
          & > p {
            & > span {
              font-weight: 400;
              margin-right: 0.3rem;
            }
            & > b {
              margin-right: 0.3rem;
              font-size: 1.4rem;
            }
            color: black;
            font-weight: 300;
            font-size: 1.4rem;
          }
        }

        & > .orderNavigate-data-list-sublist {
          padding-top: 1rem;
          padding-bottom: 1rem;
          padding-left: 6rem;
          & > p {
            & > span {
              font-weight: 400;
              margin-right: 0.3rem;
            }
            & > b {
              margin-right: 0.3rem;
              font-size: 1.4rem;
            }
            color: black;
            font-weight: 300;
            font-size: 1.4rem;
          }
        }
      }
    }
  }
`;
