import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: 100px 112px !important;

  @media (max-width: 1024px) {
    padding: 56px 16px !important;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 96px !important;
  align-items: center;

  @media (min-width: 768px) {
    gap: 64px !important;
  }
`;
export const SearchBarWrapper = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
`;
export const Heading = styled.h1`
  font-size: 32px;
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

export const ButtonWrapper = styled.div`
  width: 100%;
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  background: linear-gradient(70%, #00bd82, 100%, #00bd82, 70%);

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 22px;
    box-shadow: 0px 0px 94px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    background: none;
  }
`;

export const TrustedBySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
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