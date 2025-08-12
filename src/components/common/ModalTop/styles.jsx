// import styled from "@emotion/styled";
// import { Modal } from "@mui/material";

// export const ModalTopStyled = styled(Modal)`
//   & > .MuiModal-backdrop {
//     opacity: 0 !important;
//     transition: none;
//   }

//   & > .container {
//     outline: none;
//     & > .overlay {
//       position: fixed;
//       /* z-index: 1300; */
//       /* z-index: 999999999999; */
//       z-index: 1000;
//       background-color: rgba(0, 0, 0, 0.5);
//       inset: 0;
//     }

//     & > .box {
//       /* z-index: 1300; */
//       z-index: 1000;
//       /* z-index: 9999999999999; */
//       position: relative;
//       margin: 2.5rem auto;
//       margin: auto auto;
//       width: fit-content;
//     }
//   }
// `;


import styled from "@emotion/styled";
import { Modal } from "@mui/material";

export const ModalTopStyled = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  & > .MuiModal-backdrop {
    opacity: 0 !important;
    transition: none;
  }

  & > .container {
    outline: none;
    position: relative;

    & > .overlay {
      position: fixed;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.5);
      inset: 0;
    }

    & > .box {
      z-index: 1000;
      position: relative;
      margin: auto;
      width: fit-content;
    }
  }
`;
