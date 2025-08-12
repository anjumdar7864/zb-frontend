import styled from "@emotion/styled";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const ExportProspectPageStyle = styled.div`
  padding: 24px 40px 40px 40px;
  width: 100%;
  & > blockquote {
    background-color: #ffffff;
    border-radius: 8px;
    width: 100%;
  }
`;

export const ExportCampaignStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px 24px;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: ${({ marginTop }) => marginTop || "0"};
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #012635;
  margin: 0;
`;

export const Dropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 5px;
  border: 1px solid #d3d7dd;
  transition: background-color 0.3s;
  max-width: 400px;
  height: 48px;
`;

export const ParagraphText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #777777;
  margin: 0;
`;

export const ArrowIcon = styled(MdOutlineKeyboardArrowDown)`
  font-size: 24px;
  color: #777777;
  transition: transform 0.3s;

  ${({ isOpen }) =>
    isOpen &&
    `
    transform: rotate(180deg);
  `}
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  flex: 1;
  max-width: 196px;
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 4px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  gap: 4px;
`;

export const InfoIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin: 0;
`;


export const MultiSelectorDropDownStyle = styled.div`
  position: relative;
  /* display: flex;
    flex-direction: column;
    gap: 10px; */
  & > div {
    border: 1px solid #D3D7DD;
    padding: 12px;
    border-radius: 8px;
    margin-top: 10px;
    & > div{
      display: flex;
      & > input {
      border: none;
      width: 100%;
      padding: 0.1rem 0rem;
      font-size: 14px;
      &::placeholder {
        font-size: 1.1rem;
      }
      &:focus {
        outline: none;
      }
    }
    }
  
    & > div {
      /* display: flex; */
    }
  }

  & > section {
    background-color: white;
    max-height: 22rem;
    border: 1px solid #4e4d4d50;
    overflow-y: hidden;
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.3rem 0.6rem;
    border-radius: 0.5rem;
    z-index: 1000000;
    /* Target the scrollbar */
    ::-webkit-scrollbar {
      width: 6px; /* Width of the scrollbar */
    }

    /* Track (background of the scrollbar) */
    ::-webkit-scrollbar-track {
      background: #f1f1f1; /* Color of the track */
      display: none;
    }

    /* Handle (thumb) */
    ::-webkit-scrollbar-thumb {
      background: #888; /* Color of the thumb */
      border-radius: 5px; /* Rounded corners */
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;

export const CompaignModelStyle = styled.div`
    width: 800px;
    border-radius: 0.5rem;
    background-color: white;

    & > * {
      &:first-child {
        background-color: #8080804c;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem 2rem;
        & > h1 {
          font-weight: 500;
          font-size: 1.5rem;
        }
      }
      &:nth-child(2) {
        padding: 2rem 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > p {
          font-size: 1.1rem;
          color: #808080ac;
        }
        & > div {
          display: flex;
          align-items: center;
          justify-content: center;
          & > input {
            border: none;
            border-bottom: 1px solid #808080ac;
            width: 22rem;
            &:focus {
              outline: none;
            }
          }
          & > * {
            &:last-child {
              margin-left: -1.5rem;
              font-size: 1.8rem;
              color: #808080ac;
              cursor: pointer;
            }
          }
        }
      }
      &:nth-child(3) {
        padding: 1rem 2rem;

        z-index: 100;
        & > * {
          &:first-child {
            width: 100%;
            & > div {
              display: flex;

              align-items: center;
              background-color: #d3d3d3;
              border-radius: 2px;
              padding: 0.8rem 1rem;
              margin-bottom: 1rem;

              & > p {
                width: 190px;
                line-height: 0px;
              }
              & > div {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                & > p {
                  line-height: 1rem;
                }

                & > * {
                  &:last-child {
                    margin-top: -0.1rem;
                  }
                }
              }
            }
          }
          &:last-child {
            height: 400px;
            overflow: hidden;
            overflow-y: scroll;

            /* Target the scrollbar */
            ::-webkit-scrollbar {
              width: 6px; /* Width of the scrollbar */
            }

            /* Track (background of the scrollbar) */
            ::-webkit-scrollbar-track {
              background: #f1f1f1; /* Color of the track */
            }

            /* Handle (thumb) */
            ::-webkit-scrollbar-thumb {
              background: #888; /* Color of the thumb */
              border-radius: 5px; /* Rounded corners */
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
              background: #555; /* Color of the thumb on hover */
            }
            & > * {
              :nth-of-type(2n + 1) {
                background-color: #f4f3fb !important;
              }
            }
            & > div {
              display: flex;
              align-items: center;
              padding: 1.2rem 1rem;
              & > p {
                width: 200px;
              }
              & > div {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                & > div {
                  display: flex;
                  align-items: center;
                  & > * {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 30px;
                    width: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    & > * {
                      font-size: 1.7rem;
                      color: white;
                    }
                  }
                }
              }
            }
          }
        }
      }
`;



export const TagsItemStyle = styled.div`
  transition: 0.3s ease-in-out;
  max-width: 400px;
  height: 48px;
  border-radius: 8px;
  /* border: 1px solid #d3d7dd; */
  padding: 4px;
  & > h6 {
    padding: 0.5rem 0.8rem;
    margin: 0.2rem 0rem;
    cursor: pointer;
    font-weight: 400;
    color: #777777;
    font-size: 14px;
  }

  &:hover {
    background-color: #8888887d;
  }
`;

export const TagsStyle = styled.div`
  display: inline-block;
  & > section {
    background-color: #5867dd;
    color: white;
    border-radius: 3rem;
    padding: 0.3rem 0.5rem;
    margin: 0.3rem 0.2rem;
    display: flex;
    align-items: center;
    & > p {
      font-size: 1.2rem;
      margin: 0rem 0.5rem;
      font-weight: 500;
      line-height: 0.8rem;
    }
    & > * {
      transition: 0.3s all;
      &:first-child {
        font-size: 1.2rem;
      }
      &:last-child {
        position: relative;
        cursor: pointer;
        margin-right: -1.5rem;
        font-size: 1.3rem;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    }

    &:hover {
      & > * {
        &:first-child {
          opacity: 0;
          margin-left: -1.3rem;
        }
        &:last-child {
          margin-right: 0.2rem;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition: opacity 0.5s, visibility 0s linear 0.3s; /* Add transition properties */
        }
      }
    }
  }
`;
export const StyledCheckbox = styled.input`
  border: 1px solid #d3d7dd !important;
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0.6;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const StatusName = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #777777;
  margin: 0 8px 0 0;
`;

export const TimePeriodContainer = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TimePeriodRow = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
`;

export const TimeOption = styled.div`
  padding: 13px 10px;
  border-radius: 5px;
  border: ${({ active }) =>
    active ? "1px solid #012635" : "1px solid #d3d7dd"};
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#f1f1f1" : "transparent")};
  transition: background-color 0.3s, border 0.3s;
  font-size: 48px;
  width: 112px;
  @media (max-width: 550px) {
    padding: 4px 4px;
    text-align: center;
  }
`;

export const CustomDatePicker = styled.div`
  display: flex;
  max-width: 170px;
  height: 48px;
  .rs-picker-toggle {
    padding: 12px 16px !important;
    height: 100%;
    box-sizing: border-box;
  }
  .rs-input-group.rs-input-group-inside {
    padding: 7px;
  }
  .rs-picker-toggle-input {
    padding: 12px 16px !important;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    color: #777777;
  }
`;

export const EmailSection = styled.div`
  margin-top: 18px;
`;
export const EmailText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #777777;
  margin: 0;
`;
export const ExportButtonContainer = styled.div`
  margin-top: 24px;
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #00bd82;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;
  width: 174px;
  height: 48px;
  text-align: center;
  justify-content: center;
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }

  svg {
    font-size: 18px;
  }
`;
