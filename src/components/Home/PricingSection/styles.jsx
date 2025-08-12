
import styled from "styled-components";

export const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px 112px 96px;
  background-color: #ffffff;
  
  @media (max-width: 1024px) {
    padding: 48px 16px;
  }
  @media (max-width: 768px) {
    padding: 48px 16px;
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
  
  @media (max-width: 1280px){
    flex-direction: column;
    gap: 24px;
  }
`;

export const PlanCard = styled.div`
  background-color: ${(props) => props.bgColor || "#ffffff"};
  color: ${(props) => props.textColor || "#000000"};
  border-radius: 8px;
  padding: 24px;
  gap: 24px;
  width: 100%;
  height: 800px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  
  @media (max-width: 1280px){
    height: 100%;
  }
`;

export const PlanTitle = styled.h3`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: ${(props) => props.color || "#000000"};
  margin-bottom: 16px;
`;

export const PlanDescription = styled.p`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: ${(props) => props.color || "#000000"};
  margin-bottom: 16px;
  height: 100px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 16px 0;
`;

export const Price = styled.span`
  font-size: 56px;
  font-weight: 700;
  line-height: 64px;
  color: ${(props) => props.color || "#000000"};
`;

export const PriceNote = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${(props) => props.color || "#012635"};
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
font-size:16px;
font-weight:600;
border-top:1px solid #E8EAED;
padding:16px;
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
    font-size:16x;
    font-weight:400;
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
  font-size:18px;
  font-weight:500;
  &:hover {
    text-decoration: underline;
  }
`;