import styled from "@emotion/styled";
import theme from "@/theme";

export const HeaderSidebarStyled = styled.div`
  height: 100vh;

  & > .top {
    position: sticky;
    z-index: 990;
  }
  & > .bottom {
    margin-top: 0.2rem;
    /* height: calc(100vh - 5.5em); */
    display: flex;

    & > .left {
      position: absolute;
      z-index: 100;
      background-color: #fff;
      z-index: 1000;
      overflow-y: hidden;
      overflow-y: scroll;
      box-shadow: 3px 3px 6px -3px #0000001a;

      &::-webkit-scrollbar {
        width: 0.4rem;
      }

      &::-webkit-scrollbar-track {
        background-color: #fff;
      }

      &::-webkit-scrollbar-thumb {
        background: #dedfe7;
      }
    }
    & > .right {
      /* height: calc(100vh - 6.9rem); */
      overflow-y: hidden;
      overflow-y: scroll;
      margin-left: 6rem;
      width: 100%;
      padding-left: 1rem;
      padding-bottom: 0rem;

      background-color: #f2f3f8;
      height: calc(100vh - 7.4rem);

      /* Target the scrollbar */
      ::-webkit-scrollbar {
        width: 10px; /* Width of the scrollbar */
      }

      /* Track (background of the scrollbar) */
      ::-webkit-scrollbar-track {
        background: #f1f1f1; /* Color of the track */
      }

      /* Handle (thumb) */
      ::-webkit-scrollbar-thumb {
        background: #888; /* Color of the thumb */
        border-radius: 1px; /* Rounded corners */
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555; /* Color of the thumb on hover */
      }
    }
  }
`;
