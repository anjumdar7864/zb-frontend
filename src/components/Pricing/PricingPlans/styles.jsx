import styled from "@emotion/styled";

export const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 0 112px 0;
  background-color: #f7f8fc;

  @media (max-width: 1024px) {
    padding: 48px 16px;
  }
  @media (max-width: 768px) {
    padding: 48px 16px;
  }
`;
export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-item: center;
  gap: 15px;
  position: relative;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
  }
`;
export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  background-color: ${(props) => props.bgColor || "#151a28"};
  color: #ffffff;
  border-radius: 32px;
  width: 100%;
  max-width: 50%;

  @media (max-width: 1024px) {
    max-width: 100%;
    flex-direction: column;
  }
`;
export const SecondButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-item: flex-end;
  gap: 15px;
  position: relative;
  top: 180px;
  @media (max-width: 1424px) {
    top: 0;
  }
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    top: 0;
  }
`;
export const Title = styled.h2`
  font-size: 38px;
  line-height: 46px;
  font-weight: 600;
  text-align: center;
  color: #012635;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const PlansWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 32px;
  max-width: 1440px;
  margin: auto;
  @media (max-width: 1280px) {
    flex-direction: column;
    gap: 24px;
    border: none;
    border-radius: 0;
  }
`;

export const PlanCard = styled.div`
  background-color: ${(props) => props.bgColor || "#ffffff"};
  color: ${(props) => props.textColor || "#000000"};
  border-radius: ${(props) =>
    props.borderRadius || "0"}; /* Apply conditional border radius */
  padding: 24px;
  gap: 24px;
  width: 100%;
  height: 800px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;

  @media (max-width: 1280px) {
    height: 100%;
    border-radius: 16px;
  }
`;

export const PlanTitle = styled.h3`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: ${(props) => props.color || "#000000"};
  margin-bottom: 16px;
`;
export const SubHeading = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #073f56;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;
export const PlanDescription = styled.p`
  font-size: 16px;
  line-height: 24px;
  height: 96px;
  font-weight: 500;
  color: ${(props) => props.color || "#000000"};
  margin-bottom: 16px;
`;

// Description
export const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: ${(props) => props.textColor || "rgba(255, 255, 255, 0.7)"};
`;
export const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 16px 0;
`;

export const Price = styled.span`
  font-size: 38px;

  font-weight: 700;
  line-height: 64px;
  color: ${(props) => props.color || "#5BF1B2"};
  @media (min-width: 768px) {
    font-size: 56px;
  }
`;

export const PriceNote = styled.span`
  font-size: 10px;
  font-weight: 500;
  line-height: 24px;
  color: ${(props) => props.textColor || "#012635"};
  @media (min-width: 768px) {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const SubscribeButton = styled.button`
  background-color: ${(props) => props.bgColor || "#28a745"};
  color: ${(props) => props.textColor || "#ffffff"};
  font-size: 16px;
  font-weight: 500;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  height: 48px;

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 500px) {
    width: 100%;
  }

  &:hover {
    background-color: ${(props) => props.hoverColor || "#218838"};
  }

  margin-bottom: 24px;
`;
export const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding: 16px;
  color: ${(props) => props.textColor || "#5bf1b2"};
`;
export const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  li {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16x;
    font-weight: 400;
    &::before {
      content: "✔";
      color: ${(props) => props.iconColor || "#28a745"};
    }
  }
`;

export const SeeMore = styled.a`
  display: block;
  margin-top: 16px;
  color: ${(props) => props.color || "#007bff"};
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;
export const SubItems = styled.ul`
  padding-left: 32px;
  display: flex;
  flex-direction: column;
`;

export const SubItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  color: #e1f3ee;
  list-style: none;

  &::before {
    content: "•";
    font-size: 20px;
    color: #e1f3ee;
    margin-right: 8px;
  }
`;
export const FirstChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1024px) {
    height: 100%;
  }
`;
export const SectionTitle = styled.h4`
  font-size: 32px;
  line-height: 46px;
  font-weight: 700;
  color: ${(props) => props.textColor || "#ffffff"};
  @media (max-width: 1024px) {
    font-size: 24px;
  }
`;
export const Wrapper = styled.div`
  padding: 64px 112px  !important;
  background-color: #f7f8fc;
  gap: 24px;
  display: flex;
  width: 100%;
  flex-direction: row;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 56px 16px !important;
    gap: 40px;
    width: 100%;
  }
`;

// Section Title
export const NoteTitle = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.textColor || "#ffffff"};
`;
export const Note = styled.h4`
  font-size: 16px;
  font-weight: 500;
  position: relative;
  top: 180px;
  color: ${(props) => props.textColor || "#ffffff"};
  @media (max-width: 1420px) {
    top: 0;
  }
`;
// Split Note
export const SplitNote = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  color: #ffffff;
`;

// Button
export const Button = styled.button`
  width: 266.5px;
  height: 48px;
  background-color: ${(props) => props.bgColor || "transparent"};
  color: ${(props) => props.textColor || "#ffffff"};
  font-size: 18px;
  font-weight: 500;
  border: ${(props) => props.borderColor || "1px solid #ffffff"};
  border-radius: 12px;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 100%;
  }
  &:hover {
    opacity: 0.9;
  }
`;

export const SecondChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  @media (max-width: 1024px) {
    height: 100%;
  }
`;

export const IncludedItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.textColor || "#E1F3EE"};

  .icon-parent {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 16px;
    color: ${(props) => props.textColor || "#E1F3EE"};
  }
  .icon {
    width: 20px;
    height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: "✔";
      font-size: 14px;
      color: ${(props) => props.textColor || "#5bf1b2"};
      font-weight: bold;
    }
  }
`;
export const TrustWrapper = styled.div`
  padding: 64px 112px 0 !important;
  background-color: #ffffff;

  @media (max-width: 1024px) {
    padding: 56px 16px !important;
  }
`;

export const TrustedBySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin: auto;
  gap: 24px;
`;

export const TrustedByText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #777777;
  line-height: 22px;
  text-align: center;
  opacity: 50%;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  img {
    max-width: 100%;
  }
`;

export const DesktopLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  width: 100%;
  padding: 10px;
  height: 60px;

  img {
    max-width: 100%;
  }
`;
export const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  // padding: 64px 112px 0;
  // background-color: #ffffff;
  max-width: 1440px;
  margin: auto;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 48px 16px;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 262px;
  background-color: #f7f8fc;
  border-radius: 16px;
  gap: 32px;
  padding: 24px;
  @media (max-width: 1280px) {
    height: 26%;
  }
`;
export const CardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-item: center;
  width: 100%;
`;
export const ChildContent = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #073f56;
`;
