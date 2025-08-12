import styled from "@emotion/styled";

export const CareBox = styled.div`
 background-color: #F7F8FC;
 border-radius:64px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  padding:4%

`

export const ItemBg = styled.div`
  background: linear-gradient(100.29deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%);
  box-shadow: 0px 24px 48px 0px #151A280D;
  border-radius: 24px;
  padding:9px;
  display:flex;
 align-items:center;
 justify-content: center;
 gap:10px;
 position:absolute;
 bottom:7%;
 left:7%
`

export const Box = styled.div`
  background: ${(props) => props.bg || "0"};
  border: ${(props) => props.border || "0"};
  color: ${(props) => props.color || "0"};
  border-radius:64px;
  display:flex;
 align-items:center;
 justify-content: center;
 flex-direction:column;
 padding:5%;
 text-align:center;
 gap:20px;
 width:100%;
 height:520px



`