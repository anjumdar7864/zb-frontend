import styled from "styled-components";

export const FirstChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-with: 50%;
  gap: 32px;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

// Section Title
export const SectionTitle = styled.h4`
  font-size: 38px;
  line-height: 46px;
  font-weight: 600;
  color: #ffffff;
  @media (max-width: 1024px) {
    font-size: 32px;
  }
`;

// Subtitle
export const Subtitle = styled.p`
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
`;
export const SubHeading = styled.h5`
  font-size: 24px;
  line-height: 46px;
  font-weight: 600;
  color: #ffffff;
`;
// Price Wrapper
export const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  text-align: center;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Price
export const Price = styled.span`
  font-size: 56px;
  font-weight: 700;
  line-height: 64px;
  color: #5bf1b2;
`;

// Price Note
export const PriceNote = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  color: #5bf1b2;
`;

// Split Note
export const SplitNote = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  color: #ffffff;
`;

// Description
export const Description = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  color: rgba(255, 255, 255, 0.7);
`;

// Button Wrapper
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

// Button
export const Button = styled.button`
  width: 150px;
  height: 48px;
  background-color: ${(props) => (props.primary ? "#ffffff" : "transparent")};
  color: ${(props) => (props.primary ? "#012635" : "#ffffff")};
  font-size: 18px;
  font-weight: 500;
  border: ${(props) => (props.primary ? "none" : "1px solid #ffffff")};
  border-radius: 40px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
  &:hover {
    opacity: 0.9;
  }
`;

export const SecondChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #1f2937; /* Matches Figma design */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  width: 50%;
  max-with: 50%;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const IncludedItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  color: white;
  .icon-parent {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 18px;
  }
  .icon {
    width: 20px;
    height: 20px;
    background: #5bf1b2;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: "✔";
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;
    }
  }
`;

export const SubItems = styled.ul`
  padding-left: 32px;
  display: flex;
  flex-direction: column;
`;

export const SubItem = styled.li`
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  list-style: none;

  &::before {
    content: "•";
    font-size: 20px;
    color: #ffffff;
    margin-right: 8px;
  }
`;
