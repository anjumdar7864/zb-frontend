import theme from "@/theme";
import styled from "@emotion/styled";
import ProgressBar from "@ramonak/react-progress-bar";

export const SignupWrapper = styled.div`
  width: 100%;
  
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
  background-color: ${(props) => props.bgColor || "transparent"};
  background-image: url(${(props) => props.bgImage || "none"});
  background-size: ${(props) => props.bgSize || "cover"};
  background-repeat: ${(props) => props.bgRepeat || "no-repeat"};
  background-position: ${(props) => props.bgPosition || "center"};
  display: ${(props) => props.display || "block"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || "0"};
  border-radius: ${(props) => props.borderRadius || "0"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  position: ${(props) => props.position || "relative"};
  top: ${(props) => props.top || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};
  z-index: ${(props) => props.zIndex || "1"};
  ${(props) =>
    props.paddingX &&
    `padding-right: ${props.paddingX}; padding-left: ${props.paddingX};`}
  ${(props) =>
    props.paddingY &&
    `padding-top: ${props.paddingY}; padding-bottom: ${props.paddingY};`}
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.maxWidth || "100%"};
  ${(props) =>
    props.paddingX &&
    `padding-right: ${props.paddingX}; padding-left: ${props.paddingX};`}
  ${(props) =>
    props.paddingY &&
    `padding-top: ${props.paddingY}; padding-bottom: ${props.paddingY};`}
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
  background-color: ${(props) => props.bgColor || "transparent"};
  background-image: url(${(props) => props.bgImage || "none"});
  background-size: ${(props) => props.bgSize || "cover"};
  background-repeat: ${(props) => props.bgRepeat || "no-repeat"};
  background-position: ${(props) => props.bgPosition || "center"};
  display: ${(props) => props.display || "block"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || "0"};
  border-radius: ${(props) => props.borderRadius || "0"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  position: ${(props) => props.position || "relative"};
  top: ${(props) => props.top || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};
  z-index: ${(props) => props.zIndex || "1"};
`;

export const StepContainer = styled.div`
  width: 100%;
  display: ${(props) => (props.active ? "block" : "none")};
  animation: ${(props) => (props.active ? "fadeIn 0.5s" : "fadeOut 0.5s")};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(10px);
    }
  }
`;

export const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

//progress bar

export const ProgressContainer = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// export const ProgressCircle = styled.div`
//   width: 120px;
//   height: 120px;
//   position: relative;
//   margin-bottom: ${(props) => props.marginBottom || "2rem"};
// `;

// export const Circle = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
// `;

// export const Mask = styled.div`
//   width: 120px;
//   height: 120px;
//   position: absolute;
//   border-radius: 50%;
//   clip: rect(0px, 60px, 120px, 0px);
//   background-color: ${(props) => props.color || "#2fc3aa"};
//   transform: rotate(
//     ${(props) => props.rotate - 90}deg
//   ); /* Adjusted to start from 12 o'clock */
//   transition: transform 1s ease-in-out;
// `;

// export const FillFix = styled.div`
//   position: absolute;
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
//   clip: rect(0px, 60px, 120px, 0px);
//   background-color: #2fc3aa;
//   transform: rotate(0deg); /* Keep this fixed */
// `;

// export const InsideCircle = styled.div`
//   width: 100px;
//   height: 100px;
//   background: #2f4f4f;
//   border-radius: 50%;
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   color: white;
// `;

// export const ProgressCircle = styled.div`
//   width: 120px;
//   height: 120px;
//   position: relative;
//   margin-bottom: ${(props) => props.marginBottom || "2rem"};
// `;

// export const Circle = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
// `;

// export const Mask = styled.div`
//   width: 120px;
//   height: 120px;
//   position: absolute;
//   border-radius: 50%;
//   clip: rect(0px, 60px, 120px, 0px);
//   background-color: ${(props) => props.color || "#2fc3aa"};
//   transform: rotate(${(props) => props.rotate}deg);
//   transition: transform 1s;
// `;

// export const FillFix = styled.div`
//   position: absolute;
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
//   clip: rect(0px, 60px, 120px, 0px);
//   background-color: #2fc3aa;
//   transform: rotate(180deg);
// `;

// export const InsideCircle = styled.div`
//   width: 100px;
//   height: 100px;
//   background: #2f4f4f;
//   border-radius: 50%;
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   color: white;
// `;

//

// export const ProgressCircle = styled.div`
//   width: 120px;
//   height: 120px;
//   position: relative;
//   margin-bottom: ${(props) => props.marginBottom || "2rem"};
// `;

// export const Circle = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   clip: rect(0px, 120px, 120px, 60px);
// `;

// export const Mask = styled.div`
//   width: 120px;
//   height: 120px;
//   position: absolute;
//   border-radius: 50%;
//   clip: rect(0px, 60px, 120px, 0px);

//   &.full,
//   .circle .fill {
//     background-color: #2fc3aa;
//     transform: rotate(${(props) => (props.progress / 100) * 360}deg);
//     transition: transform 1s;
//   }

//   &.half .fill {
//     background-color: #2fc3aa;
//     transform: rotate(
//       ${(props) =>
//         props.progress >= 50 ? ((props.progress - 50) / 50) * 360 : 0}deg
//     );
//     transition: transform 1s;
//   }
// `;

// export const FillFix = styled.div`
//   background-color: #2fc3aa;
//   clip: rect(0px, 60px, 120px, 0px);
// `;

// export const InsideCircle = styled.div`
//   width: 100px;
//   height: 100px;
//   background: #2f4f4f;
//   border-radius: 50%;
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   color: white;
// `;
