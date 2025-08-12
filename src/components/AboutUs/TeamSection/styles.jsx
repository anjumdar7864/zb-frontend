import styled from "@emotion/styled";

export const TeamContainer = styled.div`
  background-color:#012635;
  border-radius:64px 64px 0px 0px;
  width:100%;
   padding-right: 12%;
  padding-left: 12%;
  padding-top:5%;
  margin-top:5%
`

export const ImgBox = styled.div`
  padding-top: ${(props) => props.pt || "0"};
 border-radius:16px;
 position:relative;
 height:auto;
 object-fit:cover;
`

export const TopDiv = styled.div`
 background: linear-gradient(105.33deg, rgba(200, 220, 255, 0.5) 0%, rgba(180, 200, 255, 0.3) 100%);
 box-shadow: 0px 24px 48px 0px #151A280D;
 border-radius:16px;
 padding:10px;
 position:absolute;
 top: ${(props) => props.top || "0"};
 left:6%;
 width:90%;
 text-align:center
`
export const StyledImg= styled.img`
  border-radius:16px;
   

`
export const LearnButton =styled.button`
  background-color:white;
  border-radius:32px;
  padding:10px;
  width:50%

`
export const TeamBox = styled.div`
  background-color:#1A3B49;
  border-radius:32px;
 padding:20px;
 width:420px;

 

`
export const TeamImgBox = styled.img`
  border-radius:32px;
 
`