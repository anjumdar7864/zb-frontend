import styled from "@emotion/styled";
import theme from "@/theme";

export const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: #012635;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 112px 80px 112px;

  @media (max-width: 768px) {
    padding: 48px 16px;
  }
`;

export const ImageWrapper = styled.div`
  width: 115px;
  height: 87px;

  & > .footerLogo {
    @media (max-width: 1000px) {
      width: 180px;
      height: 50px;
    }
  }
`;

export const LogoWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff1a;
  cursor: pointer;
`;

export const Flex = styled.div`
  width: 100%;
  display: grid;
  gap: ${(props) => props.gap || "2rem"};
  max-width: 1256px;
  padding: 0 20px; /* Add right and left padding */

  /* Large screens: 4 columns per row */
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    /* Medium screens: 1 column full width, then 2 columns per row with equal width */
    grid-template-columns: 1fr 1fr;
    & > :nth-child(1) {
      grid-column: span 2; /* First element spans 2 columns */
    }
  }

  @media (max-width: 425px) {
    /* Small screens: 1 column per row, with right and left padding */
    grid-template-columns: 1fr;
    & > * {
      grid-column: span 2; /* Ensure all items take up full width */
    }
    padding: 0 15px; /* Adjust padding for small screens */
  }
`;
export const ShowIcon = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  position: relative;
  top: 245px;
  left: 18px;
  @media (max-width: 1000px) {
    display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  top: 0;
  left: 0;
    }
`;
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || "1rem"};
  width: 100%; /* Full width for all screen sizes */

  @media (max-width: 1200px) {
    /* Equal width for all columns except the first */
    width: 100%;
  }

  @media (max-width: 768px) {
    /* Same width behavior for mobile screens */
    width: 100%;
  }

  @media (max-width: 425px) {
    /* For small screens */
    width: 100%;
  }
`;

export const Divider = styled.div`
  display: none;
  height: 0.01rem;
  background-color: #ffffff26;
  margin: 5px 0;

  @media (max-width: 425px) {
    display: block;
  }
`;

export const FooterBottom = styled.div`
  width: 100%;
  max-width: 1256px;
  border-top: 1px solid #ffffff26;
  margin-top: 4rem;
  padding-top: 25px;
  display: flex;
  gap: 7%;
  flex-direction: row;

  /* Padding for larger screens */
  padding: 2rem;

  @media (max-width: 1200px) {
    /* For medium screens */
    padding: 3rem;
  }

  @media (max-width: 768px) {
    /* For tablet screens */
    padding: 4rem;
    flex-direction: column;
    gap: 20px;
    border-top: 1px solid #ffffff;
  }

  @media (max-width: 425px) {
    /* For small screens */
    padding: 2.5rem;
    flex-direction: column;
    margin-top: 0rem;
    border: none;
    gap: 0px;

    /* Move the copyright message to the bottom */
    > :first-child {
      order: 2; /* Move copyright to the last position */
      margin-top: 10px; /* Add some margin for better spacing */
    }

    /* Ensure the FlexRow with links appears first */
    > :nth-child(2) {
      order: 1;
    }
  }
`;

export const FlexRowExtra = styled.div`
  display: flex;
  gap: ${(props) => props.gap || "10px"};
  flex-direction: row; /* Default to row for larger screens */

  @media (max-width: 768px) {
    flex-direction: column !important;

    gap: 24px;
  }
`;