import styled from "@emotion/styled";
import theme from "@/theme";
import Assets from "@/assets";

export const ContainerQuestion = styled.div`
  width: 100%;
  height: auto;
  padding: 96px 112px 160px 112px;
  background-color: #f7f8fc;
  @media (max-width: 1024px) {
    padding: 48px 16px;
  }
`;

export const TopSection = styled.div`
  background-image: url(${Assets.Images.bg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 1440px;
  margin: auto;
  gap: 24px;
  padding: 48px 24px;
  @media (max-width: 1024px) {
    padding: 24px 16px;
    gap: 24px;
  }
`;
export const LogoWrapper = styled.div`
  width: 185px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Button = styled.div`
  border-radius: 40px;
  background-color: #ffffff;
  width: 180px;
  height: 48px;
  color: #012635;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
export const QuestionBox = styled.div`
  background-color: white;
  height: auto;
  border-radius: 8px;
  padding: 15px;
  width: 96%;
`;
export const AnswerButton = styled.div`
  background-color: ${theme.colors.primary};
  height: 32px;
  width: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Media query for medium screens (e.g., tablets) */
  @media (max-width: 1200px) {
    height: 28px;
    width: 28px;
    border-radius: 14px;
  }

  /* Media query for small screens (e.g., mobile devices) */
  @media (max-width: 768px) {
    height: 24px;
    width: 24px;
    border-radius: 12px;
  }

  /* Media query for very small screens (e.g., extra-small mobile devices) */
  @media (max-width: 480px) {
    height: 20px;
    width: 20px;
    border-radius: 10px;
  }
`;