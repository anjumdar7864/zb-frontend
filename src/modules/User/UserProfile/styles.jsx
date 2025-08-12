import theme from "@/theme";
import styled from "@emotion/styled";

export const EditContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
  padding-inline:4rem;
`;

export const Card = styled.div`
 background-color:white;
 border: 1px solid #E0E0E0;
 border-radius:10px;
//  padding:20px;
 width:100%;

 & > .RoleBadge{
  padding-inline:1rem;
  padding-block:0.5rem;
  border:1px solid #A69FEA;
  background-color:#E1DDF8;
  border-radius:2rem;
 }
`
export const Card2 = styled.div`
 background-color:white;
 border: 1px solid #E0E0E0;
 border-radius:10px;
 width:100%;

 & > .RoleBadge{
  padding-inline:1rem;
  padding-block:0.5rem;
  border:1px solid #A69FEA;
  background-color:#E1DDF8;
  border-radius:2rem;
 }
`

export const PicBox = styled.div`
 border: 1px solid #E0E0E0;
 border-radius:7px;
 display:flex;
 align-items:center;
 flex-direction:column;
 justify-content:space-between;
 background-color:white;
 width:492px;
 height:236px;

 & > h6{
  color:#012635;
  font-weight:500;
  font-size:1.2rem;
 }
`

export const UploadPicButton = styled.button`
  border-top: 1px solid #E0E0E0;
  width:100%;
  border-bottom-left-radius:7px;
  border-bottom-right-radius:7px;
  color:#073F56;
  font-size:16px;
  font-weight:400;
  padding:10px;
  text-align: center;
  cursor:pointer;


`

export const FilterBox = styled.div`
  background-color:#FFFFFF;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius:7px;
  padding:15px;
  display:flex;
  align-items:center;
  gap:5px;
  justify-content:space-between;
  cursor:pointer;
  position:relative;
  width:100%;
`
export const IMG = styled.div`
  padding-top:50px;
  width:100px;
  height:100px;
  object-fit:cover
`
export const ExpandableDiv = styled.div`
  overflow: hidden;
  position:absolute;
  width:100%;
  top:70px;
    background-color:#FFFFFF;
  border-right: 1px solid rgba(224, 224, 224, 1);
  border-left: 1px solid rgba(224, 224, 224, 1);
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  border-radius:7px;
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  transition: max-height 0.5s ease;
`;

export const Option = styled.div`
color: ${({ s }) => {
    if (s === "Active") return "black";
    if (s === "Suspended") return "black";
    if (s === "On-Hold") return "black";
    return "#666666";
  }};
`;


export const SubscriptionBox = styled.div`
 background-color: ${({ select }) => (select ? '#1E9B50' : '#F0F0F0')};  
  color: ${({ select }) => (select ? 'white' : '#2E2E2E')};
  border-radius: 20px;
  padding: 15px;
  width: 200px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  
`

export const PackageBox = styled.div`
  background-color: ${({ select }) => (select ? 'white' : '#1E9B50')};
  color: ${({ select }) => (select ? '#1E9B50' : 'white')};
  border-radius: 100px;
  padding: 5px;
  height: 25px;
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
 

`
export const ChangePasswordBtn = styled.button`
  border: 1px solid #1E9B50;
  color:#198E48;
  border-radius:7px;
  padding:10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:95px


`


export const CreateNewCategoryModalStyled = styled.form`
  width: 80vw;
  max-width:60.6rem;
  background-color: white;
  border-radius:0.8rem;
  & > .top {
    border-top-left-radius:0.8rem;
    border-top-right-radius:0.8rem;
    border-collapse: separate; 
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding-inline: 1.95rem;
    padding-block: 1rem;
    background-color: #fff;
    & > h2 {
      font-size: 2rem;
      color: #012635;
      font-weight: 600;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > button {
      font-size: 1.6rem;
      color: #212529;
      opacity: 0.6;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
  & > .middle {
    padding: 1.95rem;
    padding-top: 0rem;
    padding-bottom: 3rem;
    display: flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    gap: 0.5rem;
    & > p {
      color: #012635;
      font-size: 1.3rem;
      font-weight: 500;
    }
    & > .item {
      display: grid;
      gap: 0.25rem;

      & > p {
        font-size: 1.1rem;
        color: #f4516c;
      }

      & > input {
        padding: 1.1rem 1.5rem;
        border: 0.1rem solid #D3D7DD;
        color: #575962;
        background-color: transparent;
        outline: none;
        border-radius: 0.8rem;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        width: 100%;
        font-size: 1.3rem;

        &:focus {
          border-color: #00BD82;
          color: #575962;
          background-color: #fff;
        }

        &:disabled {
          border-color: #f4f5f8;
          color: #6f727d;
          background-color: #f4f5f8;
        }
      }

      & > select {
        padding: 1.1rem 4rem 1.1rem 1.5rem;
        border: 0.1rem solid #c1c4cc;
        color: #575962;
        background-color: transparent;
        outline: none;
        border-radius: 0.35rem;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("${(p) => p.icon}");
        background-repeat: no-repeat;
        background-position: calc(100% - 1.5rem) center;
        background-size: 1rem;
        width: 100%;
        font-size: 1.3rem;

        &:focus {
          border-color: #00BD82;
          color: #575962;
          background-color: #fff;
        }
      }
    }
  }
  & > .bottom {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
    align-items: center;
    justify-content: end;
    background-color: white;
    border-top: 1px solid #F0F0F0;
    padding-inline: 1.95rem;
    padding-block: 1rem;
    border-bottom-left-radius:0.8rem;
    border-bottom-right-radius:0.8rem;

    & > .button{
      padding: 0.85rem 2.5rem;
      font-size: 1.2rem;
      border: 0.1rem solid #777777;
      font-weight: 500;
      border-radius: 0.8rem;
      transition: background-color 0.3s ease-in-out;
        color: #777777;
      & > .text {
        font-size: 1.3rem;
      }

      &:not(:disabled):hover {
        background-color: #fff;
      }
    }

     & > .buttonSave{
      padding: 0.85rem 2.5rem;
      font-size: 1.2rem;
      border: 0.1rem solid #00BD82;
      font-weight: 500;
      border-radius: 0.8rem;
      transition: background-color 0.3s ease-in-out;
      background-color: #00BD82;
      color:  #fff;
      & > .text {
        font-size: 1.3rem;
        color:  #fff;
      }

      &:not(:disabled):hover {
        background-color: #fff;
      }
    }
  }
`;