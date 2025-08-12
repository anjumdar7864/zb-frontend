import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: 64px 112px !important;
  background-color: #f7f8fc;
  gap: 64px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 56px 16px !important;
    gap: 40px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
max-width:1440px ; 
margin:auto ; 
  @media (min-width: 768px) {
    gap: 64px !important;
  }
`;

export const Heading = styled.h1`
  font-size: 38px;
  font-weight: 600;
  line-height: 1;
  color: #012635;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 56px;
  }
`;

export const Subheading = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #073f56;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px;
  // max-width: 1440px;
  // margin: auto;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #d3d7dd;
  height: 88px;
  justify-content: space-between;
  @media (max-width: 1024px) {
    flex-direction: column;
    height:100%;
  }
`;

export const DurationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #e0e0e0;
  max-width: 33%;
  width: 100%;
  background-color: #FCFCFF;
  border-radius: 16px;
  padding: 8px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  height: 56px;
  @media (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
    justify-content: space-between;
  }
`;

export const CountryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #e0e0e0;
  max-width: 33%;
  width: 100%;
  background-color: #FCFCFF;
  border-radius: 16px;
  padding: 8px;
  gap: 8px;
  justify-content: space-between;
  @media (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
    justify-content: space-between;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #777777;
`;

export const CountryText = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: #000000;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #e0e0e0;
  max-width: 33%;
  width: 100%;
  background-color: #FCFCFF;
  border-radius: 16px;
  padding: 8px;
  gap: 8px;
  justify-content: space-between;
  @media (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
    justify-content: space-between;
   
  }
`;

export const DurationButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border-radius: 8px;
  padding: 4px 12px;
  height: 40px;
  width: 180px;

  font-size: 14px;
  font-weight: 400;
  border: none;
  cursor: pointer;
  @media (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
    justify-content: space-between;
   
  }
`;

export const AnnualText = styled.div`
  color: ${(props) => props.textColor};
  font-size: 14px;
  padding: 8px;
  font-weight: 400;
  text-align: center;
  align-item: center;
`;
export const AnnualPercentage = styled.div`
  color: ${(props) => props.textColor};
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  align-item: center;
  border: ${(props) => props.borderColor};
  padding: 2px 12px;
  border-radius: 24px;
`;
export const MonthlyText = styled.div`
  color: ${(props) => props.textColor};
  font-size: 14px;
  padding: 8px;
  font-weight: 400;
  text-align: center;
  align-item: center;
`;