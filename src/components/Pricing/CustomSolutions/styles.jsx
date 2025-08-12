import Assets from "@/assets";
import theme from "@/theme";
import styled from "@emotion/styled";

export const CustomSolutionBox = styled.div`
  background-color:#012635;
  border-radius:36px;
  padding:5%;
`

export const ItemBox = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius:8px;
  height:40px;
  text-align:center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:10px;
  width:100% ;
  cursor:pointer;   

`
export const ButtonBox = styled.div`
  background-color:white;
  border-radius:32px;
  text-align:center;
  padding:2%;
  font-size:18px;
  cursor:pointer;

`

export const TopSection = styled.div`
 background-image:url(${Assets.Images.bg});
 background-repeat:no-repeat;
 background-size:cover;
  height: 369px;
 width:100%;
  border-radius:24px;
  display:flex;
 align-items:center;
 justify-content:center;
 flex-direction:column;
 gap:20px;
 padding:20px
  


`
export const LogoWrapper = styled.div`
 width:48px;
 height:48px;
 border-radius:15px;
 background-color:white;
 display:flex;
 align-items:center;
 justify-content:center;


 `

 export const Button = styled.div`
 border-radius:32px;
 background-color:white;
 width:192px;
 height:48px;
 color:#151A28;
 font-size:18px;
 font-weight:500;
  display:flex;
 align-items:center;
 justify-content:center;
 cursor:pointer

`