import Assets from "@/assets";
import styled from "@emotion/styled";


export const ContainerApply = styled.div`

  width:100%;
  height:auto;
  padding: 10% 12%;

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
 padding:40px;
 padding-left:10%;
 padding-right:10%
  

`

export const Button = styled.div`
 border-radius:32px;
 background-color:white;
 width:220px;
 height:48px;
 color:#151A28;
 font-size:18px;
 font-weight:500;
  display:flex;
 align-items:center;
 justify-content:center;
 cursor:pointer

`