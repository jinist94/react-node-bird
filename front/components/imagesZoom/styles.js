import styled, { createGlobalStyle } from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 6000;
  background-color: #494949;
`;

export const Header = styled.header`
  header: 44px;
  background-color: white;
  position: reletive;
  padding: 0;
  text-align: center;
  z-index: 5000;
  &h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
  &button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 15px;
    cursor: pointer;
  }
`;

export const SlickWrapper = styled.div`
height:carc(100% - 44pzx)
background-color:#898989;
`;
export const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;
  &img {
    margin: 0 auto;
    max-height: 700px;
  }
`;

export const Indicator = styled.div`
text-align: center;
&>div{
    width:75px;
    height: 38px;
    line-height:38px;
    border-radius:15px;
    background-color:
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
}`;

// style을 전역으로 넣고 싶을 때
export const Global = createGlobalStyle`
.slick-slide{
    display:inline-block;
}`;
