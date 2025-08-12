import theme from "@/theme";
import styled from "@emotion/styled";

export const QuestionWrapper = styled.div`
  padding: 64px 112px !important;
  background-color: #f7f8fc;
  display: flex;
  @media (max-width: 1024px) {
    display: flex;
    padding: 56px 16px !important;
    width: 100%;
  }
`;
export const Container = styled.div`
  display: flex;
  background-color: #012635;
  padding: 48px;
  gap: 48px;
  border-radius: 32px;
  width: 100%;
  height: 424px;
  @media (max-width: 1280px) {
    flex-direction: column;
    height: 100%;
    padding: 32px;
    gap: 32px;
    height: 100%;
  }

  @media (max-width: 1280px) {
    height: 100%;
  }
`;
export const FirstChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1280px) {
    align-items: center;
  }
`;
export const QuestionHeader = styled.div`
  display: flex;
  width: 180px;
  height: 34px;
  justify-content: space-between;
  align-item: center;
  border-radius: 40px;
  gap: 12px;
  padding: 4px 20px;
  background-color: #ffffff;
 
  @media (max-width: 1280px) {
    gap: 8px;
    height:32px;
  }
`;
export const QuestionTitle = styled.div`
  font-size: 38px;
  font-weight: 600;
  line-height: 46px;
  color: #ffffff;
  @media (max-width: 1280px) {
    font-size: 32px;
  }
`;

export const SecondChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;
export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  alignitems: "center";
  gap: 8px;
`;
export const ChildWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-item: center;
  gap: 8px;
  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;
export const Button = styled.button`
  width: 49%;
  height: 48px;
  padding: 8px 12px;
  gap: 8px;
  border-radius: 8px;
  /* background-color: #ffffff1a; */
  background-color:${({active})=> active ? theme.colors.primary : `#ffffff1a` } ; 
  text-align: center;
  align-items: center;
  color: #ffffff;
  @media (max-width: 1280px) {
    width: 100%;
  }
`;
export const Otherbutton = styled.button`
  width: 100%;
  height: 48px;
  padding: 8px 12px;
  gap: 8px;
  border-radius: 8px;
  background-color: #ffffff1a;
  text-align: center;
  align-items: center;
  color: #ffffff;
`;
export const Nextbutton = styled.button`
  width: 100%;
  height: 48px;
  padding: 8px 12px;
  gap: 8px;
  border-radius: 8px;
  background-color: #ffffff;
  text-align: center;
  align-items: center;
  color: #012635;
`;
