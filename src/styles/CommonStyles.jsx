import styled from '@emotion/styled';
import theme from "@/theme";
export const ContainerFluid = styled.section`
  font-family: Fellix, sans-serif !important;
  ${(props) => props.paddingTop ? `padding-top: ${props.paddingTop};` : ""}
  ${(props) => props.paddingBottom ? `padding-bottom: ${props.paddingBottom};` : ""}
  ${(props) => props.backgroundColor && `background-color: ${props.backgroundColor};`}
    max-width: 1256px; 
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  /* Breakpoints for responsiveness */
  @media (min-width: 576px) {
    // max-width: 540px;
    // padding:auto 5rem
  }
  @media (min-width: 768px) {
    // max-width: 720px;
    // padding:auto 5rem
  }
  @media (min-width: 992px) {
    // max-width: 960px;
    // padding:auto 5rem
  }
  @media (min-width: 1200px) {
    // max-width: 1140px;
    // padding:auto 5rem
  }
  @media (min-width: 1256px) {
    // max-width: 1256px;
    padding-right: 10px;
    padding-left: 10px;
 max-width: 1256px; 
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px; /* You can adjust the thickness here */
  background-color: ${({ color }) => color || 'black'}; /* Default color is black */
  margin: 16px 0; /* Add some space around the line */
`;
export const Flex = styled.div`
   display: ${({ display }) => display || 'flex'};
  font-family: Fellix, sans-serif !important;
  ${({ flex }) => flex && `flex: ${flex};`}
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  position: ${({ position }) => position};
  overflow-x: ${({ overflowX }) => overflowX};
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'stretch'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  gap: ${({ gap }) => gap || '0'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  border: ${({ border }) => border || '0'};

  grid-template-columns: ${({ gridCols }) => gridCols || 'repeat(1, 1fr)'};
  
  top: ${({ top }) => top || 'auto'};
   ${(props) => props.paddingX && `padding-right: ${props.paddingX}; padding-left: ${props.paddingX};`}
  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
  ${(props) => props.paddingY && `padding-top: ${props.paddingY}; padding-bottom: ${props.paddingY};`}
  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop};`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
  ${(props) => props.paddingBottom && `padding-bottom: ${props.paddingBottom};`}
  ${(props) => props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${(props) => props.objectFit && `object-fit: ${props.objectFit};`}
   box-shadow: ${(props) => props.boxShadow || 'none'};
   cursor: ${({ cursor }) => cursor || 'default'};
  font-family: ${({ family }) => family};
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  background-size: ${({ bgSize }) => bgSize || 'cover'};
  background-position: ${({ bgPosition }) => bgPosition || 'center'};
  background-repeat: ${({ bgRepeat }) => bgRepeat || 'no-repeat'};
  /* Handle background color with optional opacity */
  background-color: ${({ bg, bgOpacity }) =>
    bg && (bgOpacity ? `rgba(${hexToRgb(bg)}, ${bgOpacity})` : bg)};
  /* Hide scrollbar but allow scrolling */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
  color: ${({ color }) => color && color};
  border-radius: ${({ radius }) => radius && radius};
    /* Responsive Props */
    @media (max-width: 639px) {
    display: ${({ xsDisplay }) => xsDisplay || "flex"};
    ${({ xsDirection }) => xsDirection && `flex-direction: ${xsDirection};`}
    ${({ xsJustify }) => xsJustify && `justify-content: ${xsJustify};`}
    ${({ xsAlign }) => xsAlign && `align-items: ${xsAlign};`}
    ${({ xsGap }) => xsGap && `gap: ${xsGap};`}
    ${({ xsPadding }) => xsPadding && `padding: ${xsPadding};`}
    ${({ xsMargin }) => xsMargin && `margin: ${xsMargin};`}
    ${({ xsWidth }) => xsWidth && `width: ${xsWidth};`}
    ${({ xsBg }) =>
      xsBg && `background-color: ${xsBg};`}
  }

  @media (min-width: 640px) {
    /* sm */
    display: ${({ smDisplay }) => smDisplay || "flex"};
    ${({ smDirection }) => smDirection && `flex-direction: ${smDirection};`}
    ${({ smJustify }) => smJustify && `justify-content: ${smJustify};`}
    ${({ smAlign }) => smAlign && `align-items: ${smAlign};`}
    ${({ smGap }) => smGap && `gap: ${smGap};`}
    ${({ smPadding }) => smPadding && `padding: ${smPadding};`}
    ${({ smPaddingX }) => smPaddingX && `padding-left: ${smPaddingX}; padding-right: ${smPaddingX};`}
    ${({ smMargin }) => smMargin && `margin: ${smMargin};`}
    ${({ smBg, smBgOpacity }) => smBg && `background-color: ${smBgOpacity ? `rgba(${hexToRgb(smBg)}, ${smBgOpacity})` : smBg};`}
  }
  @media (min-width: 768px) { /* md */
     display: ${({ mdDisplay }) => mdDisplay || 'flex'};
    ${({ mdDirection }) => mdDirection && `flex-direction: ${mdDirection};`}
    ${({ mdWidth }) => mdWidth && `width: ${mdWidth};`}
    ${({ mdJustify }) => mdJustify && `justify-content: ${mdJustify};`}
    ${({ mdAlign }) => mdAlign && `align-items: ${mdAlign};`}
    ${({ mdGap }) => mdGap && `gap: ${mdGap};`}
    ${({ mdPadding }) => mdPadding && `padding: ${mdPadding};`}
    ${({ mdPaddingX }) => mdPaddingX && `padding-left: ${mdPaddingX}; padding-right: ${mdPaddingX};`}
    ${({ mdMargin }) => mdMargin && `margin: ${mdMargin};`}
    ${({ mdBg, mdBgOpacity }) => mdBg && `background-color: ${mdBgOpacity ? `rgba(${hexToRgb(mdBg)}, ${mdBgOpacity})` : mdBg};`}
      top: ${({ mdTop }) => mdTop || 'auto'};
  }
  @media (min-width: 1024px) { /* lg */
  display: ${({ lgDisplay }) => lgDisplay || 'flex'};
    ${({ lgDirection }) => lgDirection && `flex-direction: ${lgDirection};`}
    ${({ lgJustify }) => lgJustify && `justify-content: ${lgJustify};`}
    ${({ lgAlign }) => lgAlign && `align-items: ${lgAlign};`}
    ${({ lgGap }) => lgGap && `gap: ${lgGap};`}
    ${({ lgPadding }) => lgPadding && `padding: ${lgPadding};`}
    ${({ lgPaddingX }) => lgPaddingX && `padding-left: ${lgPaddingX}; padding-right: ${lgPaddingX};`}
    ${({ lgMargin }) => lgMargin && `margin: ${lgMargin};`}
    ${({ lgBg, lgBgOpacity }) => lgBg && `background-color: ${lgBgOpacity ? `rgba(${hexToRgb(lgBg)}, ${lgBgOpacity})` : lgBg};`}
      display: ${({ lgDisplay }) => lgDisplay};
  }
  @media (min-width: 1280px) { /* xl */
    ${({ xlDirection }) => xlDirection && `flex-direction: ${xlDirection};`}
    ${({ xlJustify }) => xlJustify && `justify-content: ${xlJustify};`}
    ${({ xlAlign }) => xlAlign && `align-items: ${xlAlign};`}
    ${({ xlGap }) => xlGap && `gap: ${xlGap};`}
    ${({ xlPadding }) => xlPadding && `padding: ${xlPadding};`}
    ${({ xlPaddingX }) => xlPaddingX && `padding-left: ${xlPaddingX}; padding-right: ${xlPaddingX};`}
    ${({ xlMargin }) => xlMargin && `margin: ${xlMargin};`}
    ${({ xlBg, xlBgOpacity }) => xlBg && `background-color: ${xlBgOpacity ? `rgba(${hexToRgb(xlBg)}, ${xlBgOpacity})` : xlBg};`}
  }
  @media (min-width: 1536px) { /* 2xl */
    ${({ xxlDirection }) => xxlDirection && `flex-direction: ${xxlDirection};`}
    ${({ xxlJustify }) => xxlJustify && `justify-content: ${xxlJustify};`}
    ${({ xxlAlign }) => xxlAlign && `align-items: ${xxlAlign};`}
    ${({ xxlGap }) => xxlGap && `gap: ${xxlGap};`}
    ${({ xxlPadding }) => xxlPadding && `padding: ${xxlPadding};`}
    ${({ xxlMargin }) => xxlMargin && `margin: ${xxlMargin};`}
    ${({ xxlBg, xxlBgOpacity }) => xxlBg && `background-color: ${xxlBgOpacity ? `rgba(${hexToRgb(xxlBg)}, ${xxlBgOpacity})` : xxlBg};`}
  }
`;
/* Utility function to convert hex to RGB */
const hexToRgb = (hex) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `${r}, ${g}, ${b}`;
};
export const Grid = styled.div`
  display: ${({ display }) => display || 'grid'};
  font-family: Fellix, sans-serif !important;
  grid-template-columns: ${({ columns }) => columns || 'repeat(1, 1fr)'};
  ${(props) => props.gridCols && `grid-template-columns: ${props.gridCols};`}
  gap: ${({ gap }) => gap || '0'};
   justify-content: ${({ justify }) => justify || 'flex-start'};
   justify-items: ${({ justifyItems }) => justifyItems || 'start'};
  align-items: ${({ align }) => align || 'stretch'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  margin-top: ${({ marginTop }) => marginTop || '0'};
  background-color: ${({ bg }) => bg && bg};
  font-family: ${({ family }) => family};
 ${({ divideX, divideBorderWidth = '1px', divideBorderColor = 'black' }) =>
    divideX &&
    `
      & > *:not(:last-child) {
        border-right: ${divideBorderWidth} solid ${divideBorderColor};
      }
      @media (max-width: 1023px) {
        & > *:not(:last-child) {
          border-right: none;
        }
      }
    `}
  /* Responsive Props */
  @media (max-width: 640px) { /* sm */
  
    ${({ xsPadding }) => xsPadding && `padding: ${xsPadding};`}
    ${({ xsGap }) => xsGap && `gap: ${xsGap};`}
  }
  @media (min-width: 640px) { /* sm */
   display: ${({ smDisplay }) => smDisplay || 'grid'};
    ${({ smColumns }) => smColumns && `grid-template-columns: ${smColumns};`}
    ${({ smGap }) => smGap && `gap: ${smGap};`}
    ${({ smPadding }) => smPadding && `padding: ${smPadding};`}
    ${({ smMargin }) => smMargin && `margin: ${smMargin};`}
    ${({ smBg }) => smBg && `background-color: ${smBg};`}
  }
  @media (min-width: 768px) { /* md */
    ${({ mdColumns }) => mdColumns && `grid-template-columns: ${mdColumns};`}
    ${({ mdGap }) => mdGap && `gap: ${mdGap};`}
    ${({ mdPadding }) => mdPadding && `padding: ${mdPadding};`}
    ${({ mdMargin }) => mdMargin && `margin: ${mdMargin};`}
    ${({ mdBg }) => mdBg && `background-color: ${mdBg};`}
  }
  @media (min-width: 1024px) { /* lg */
    ${({ lgColumns }) => lgColumns && `grid-template-columns: ${lgColumns};`}
    ${({ lgGap }) => lgGap && `gap: ${lgGap};`}
    ${({ lgPadding }) => lgPadding && `padding: ${lgPadding};`}
    ${({ lgMargin }) => lgMargin && `margin: ${lgMargin};`}
    ${({ lgBg }) => lgBg && `background-color: ${lgBg};`}
  }
  @media (min-width: 1280px) { /* xl */
    ${({ xlColumns }) => xlColumns && `grid-template-columns: ${xlColumns};`}
    ${({ xlGap }) => xlGap && `gap: ${xlGap};`}
    ${({ xlPadding }) => xlPadding && `padding: ${xlPadding};`}
    ${({ xlMargin }) => xlMargin && `margin: ${xlMargin};`}
    ${({ xlBg }) => xlBg && `background-color: ${xlBg};`}
  }

  @media (min-width: 1536px) { /* 2xl */
    ${({ xxlColumns }) => xxlColumns && `grid-template-columns: ${xxlColumns};`}
    ${({ xxlGap }) => xxlGap && `gap: ${xxlGap};`}
    ${({ xxlPadding }) => xxlPadding && `padding: ${xxlPadding};`}
    ${({ xxlMargin }) => xxlMargin && `margin: ${xxlMargin};`}
    ${({ xxlBg }) => xxlBg && `background-color: ${xxlBg};`}
  }
`;
export const Paragraph = styled.p`
  // font-family: Fellix, sans-serif !important;
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  font-weight: ${({ weight }) => weight || 'normal'};
  line-height: ${({ lineHeight }) => lineHeight || '1.5'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  color: ${({ color }) => color || 'inherit'};
  text-align: ${({ align }) => align || 'left'};
  background-color: ${({ bg }) => bg && bg};
  // font-family: ${({ family }) => family};
   font-style: ${({ fontStyle }) => fontStyle || 'normal'};
    ${(props) => props.paddingX && `padding-right: ${props.paddingX}; padding-left: ${props.paddingX};`}
  ${(props) => props.paddingY && `padding-top: ${props.paddingY}; padding-bottom: ${props.paddingY};`}
  /* Responsive Props */
  @media (max-width: 640px) { /* sm */
    ${({ xsFontSize }) => xsFontSize && `font-size: ${xsFontSize};`}
    ${({ xsAlign }) =>  xsAlign && `text-align:${xsAlign};`} 
  }
  @media (min-width: 640px) { /* sm */
    ${({ smFontSize }) => smFontSize && `font-size: ${smFontSize};`}
    ${({ smMargin }) => smMargin && `margin: ${smMargin};`}
    ${({ smPadding }) => smPadding && `padding: ${smPadding};`}
    ${({ smAlign }) => smAlign && `text-align: ${smAlign};`}
    ${({ smBg }) => smBg && `background-color: ${smBg};`}
  }
  @media (min-width: 768px) { /* md */
    ${({ mdFontSize }) => mdFontSize && `font-size: ${mdFontSize};`}
    ${({ mdMargin }) => mdMargin && `margin: ${mdMargin};`}
    ${({ mdPadding }) => mdPadding && `padding: ${mdPadding};`}
    ${({ mdAlign }) => mdAlign && `text-align: ${mdAlign};`}
    ${({ mdBg }) => mdBg && `background-color: ${mdBg};`}
  }
  @media (min-width: 1024px) { /* lg */
    ${({ lgFontSize }) => lgFontSize && `font-size: ${lgFontSize};`}
    ${({ lgMargin }) => lgMargin && `margin: ${lgMargin};`}
    ${({ lgPadding }) => lgPadding && `padding: ${lgPadding};`}
    ${({ lgAlign }) => lgAlign && `text-align: ${lgAlign};`}
    ${({ lgBg }) => lgBg && `background-color: ${lgBg};`}
  }
  @media (min-width: 1280px) { /* xl */
    ${({ xlFontSize }) => xlFontSize && `font-size: ${xlFontSize};`}
    ${({ xlMargin }) => xlMargin && `margin: ${xlMargin};`}
    ${({ xlPadding }) => xlPadding && `padding: ${xlPadding};`}
    ${({ xlAlign }) => xlAlign && `text-align: ${xlAlign};`}
    ${({ xlBg }) => xlBg && `background-color: ${xlBg};`}
  }
  @media (min-width: 1536px) { /* 2xl */
    ${({ xxlFontSize }) => xxlFontSize && `font-size: ${xxlFontSize};`}
    ${({ xxlMargin }) => xxlMargin && `margin: ${xxlMargin};`}
    ${({ xxlPadding }) => xxlPadding && `padding: ${xxlPadding};`}
    ${({ xxlAlign }) => xxlAlign && `text-align: ${xxlAlign};`}
    ${({ xxlBg }) => xxlBg && `background-color: ${xxlBg};`}
  }
`;
const createHeading = (level) => styled[`h${level}`]`
  font-family: Fellix, sans-serif !important;
  font-size: ${({ fontSize }) => fontSize || `${2 - level * 0.25}rem`};
  font-family: ${({ family }) => family};
margin: ${({ margin }) => margin || '0'};
padding: ${({ padding }) => padding || '0'};
color: ${({ color }) => color || 'inherit'};
text-align: ${({ align }) => align || 'left'};
background-color: ${({ bg }) => bg || 'transparent'};
font-weight: ${({ weight }) => weight || 'normal'};
  ${(props) => props.paddingX && `padding-right: ${props.paddingX}; padding-left: ${props.paddingX};`}
  ${(props) => props.paddingY && `padding-top: ${props.paddingY}; padding-bottom: ${props.paddingY};`}
  ${(props) => props.text && `text-align: ${props.text};`}
/* Responsive Props */
@media (max-width: 640px) { /* sm */
    ${({ xsFontSize }) => xsFontSize && `font-size: ${xsFontSize};`}
  }
@media (min-width: 640px) { /* sm */
    ${({ smFontSize }) => smFontSize && `font-size: ${smFontSize};`}
    ${({ smMargin }) => smMargin && `margin: ${smMargin};`}
  ${({ smPadding }) => smPadding && `padding: ${smPadding};`}
  ${({ smAlign }) => smAlign && `text-align: ${smAlign};`}
  ${({ smBg }) => smBg && `background-color: ${smBg};`}
  ${({ smWeight }) => smWeight && `font-weight: ${smWeight};`}
  ${(props) => props.smPaddingX && `padding-right: ${props.smPaddingX}; padding-left: ${props.smPaddingX};`}
  ${(props) => props.smPaddingY && `padding-top: ${props.smPaddingY}; padding-bottom: ${props.smPaddingY};`}
  }
@media (min-width: 768px) { /* md */
    ${({ mdFontSize }) => mdFontSize && `font-size: ${mdFontSize};`}
    ${({ mdMargin }) => mdMargin && `margin: ${mdMargin};`}
  ${({ mdPadding }) => mdPadding && `padding: ${mdPadding};`}
  ${({ mdAlign }) => mdAlign && `text-align: ${mdAlign};`}
  ${({ mdBg }) => mdBg && `background-color: ${mdBg};`}
  ${({ mdWeight }) => mdWeight && `font-weight: ${mdWeight};`}
  ${(props) => props.mdPaddingX && `padding-right: ${props.mdPaddingX}; padding-left: ${props.mdPaddingX};`}
  ${(props) => props.mdPaddingY && `padding-top: ${props.mdPaddingY}; padding-bottom: ${props.mdPaddingY};`}
  }
@media (min-width: 1024px) { /* lg */
    ${({ lgFontSize }) => lgFontSize && `font-size: ${lgFontSize};`}
    ${({ lgMargin }) => lgMargin && `margin: ${lgMargin};`}
  ${({ lgPadding }) => lgPadding && `padding: ${lgPadding};`}
  ${({ lgAlign }) => lgAlign && `text-align: ${lgAlign};`}
  ${({ lgBg }) => lgBg && `background-color: ${lgBg};`}
  ${({ lgWeight }) => lgWeight && `font-weight: ${lgWeight};`}
  ${(props) => props.lgPaddingX && `padding-right: ${props.lgPaddingX}; padding-left: ${props.lgPaddingX};`}
  ${(props) => props.lgPaddingY && `padding-top: ${props.lgPaddingY}; padding-bottom: ${props.lgPaddingY};`}
  }
@media (min-width: 1280px) { /* xl */
    ${({ xlFontSize }) => xlFontSize && `font-size: ${xlFontSize};`}
    ${({ xlMargin }) => xlMargin && `margin: ${xlMargin};`}
  ${({ xlPadding }) => xlPadding && `padding: ${xlPadding};`}
  ${({ xlAlign }) => xlAlign && `text-align: ${xlAlign};`}
  ${({ xlBg }) => xlBg && `background-color: ${xlBg};`}
  ${({ xlWeight }) => xlWeight && `font-weight: ${xlWeight};`}
   ${(props) => props.xlPaddingX && `padding-right: ${props.xlPaddingX}; padding-left: ${props.xlPaddingX};`}
  ${(props) => props.xlPaddingY && `padding-top: ${props.xlPaddingY}; padding-bottom: ${props.xlPaddingY};`}
  }
@media (min-width: 1536px) { /* 2xl */
    ${({ xxlFontSize }) => xxlFontSize && `font-size: ${xxlFontSize};`}
    ${({ xxlMargin }) => xxlMargin && `margin: ${xxlMargin};`}
  ${({ xxlPadding }) => xxlPadding && `padding: ${xxlPadding};`}
  ${({ xxlAlign }) => xxlAlign && `text-align: ${xxlAlign};`}
  ${({ xxlBg }) => xxlBg && `background-color: ${xxlBg};`}
  ${({ xxlWeight }) => xxlWeight && `font-weight: ${xxlWeight};`}
   ${(props) => props.xxlPaddingX && `padding-right: ${props.xxlPaddingX}; padding-left: ${props.xxlPaddingX};`}
  ${(props) => props.xxlPaddingY && `padding-top: ${props.xxlPaddingY}; padding-bottom: ${props.xxlPaddingY};`}
  }
`;
export const H1 = createHeading(1);
export const H2 = createHeading(2);
export const H3 = createHeading(3);
export const H4 = createHeading(4);
export const H5 = createHeading(5);
export const H6 = createHeading(6);
export const P = styled.div`
  font-family: Fellix, sans-serif !important;
  ${(props) => props.fontweight && `font-weight: ${props.fontweight};`}
  ${(props) => props.fontSize && `font-size: ${props.fontSize};`}
${(props) => props.width && `width: ${props.width};`}
${(props) => props.opacity && `opacity: ${props.opacity};`}
${(props) => props.paddingBottom && `padding-bottom: ${props.paddingBottom};`}
${(props) => props.paddingTop && `padding-top: ${props.paddingTop};`}
${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
${(props) => props.paddingRight && `padding-right: ${props.paddingRight};`}
${(props) => props.textAlign && `text-align: ${props.textAlign};`}
${(props) => props.lineHeight && `line-height: ${props.lineHeight};`}
${(props) => props.textWrap && `text-wrap: ${props.textWrap};`}
 font-family: ${({ family }) => family};
  color: ${(props) => props.color};
  /* Media query for larger screens (e.g., desktops) */
  @media (min-width: 1200px) {
    /* ${(props) => props.fontSize && `font-size: calc(${props.fontSize} * 1.2);`} */
  ${(props) => props.paddingBottom && `padding-bottom: calc(${props.paddingBottom} * 1.2);`}
  ${(props) => props.paddingTop && `padding-top: calc(${props.paddingTop} * 1.2);`}
${(props) => props.lineHeight && `line-height: calc(${props.lineHeight} * 1.2);`}
  }
  /* Media query for medium screens (e.g., tablets) */
  @media (max-width: 1200px) {
    ${(props) => props.fontSize && `font-size: calc(${props.fontSize} * 1);`}
  ${(props) => props.paddingBottom && `padding-bottom: calc(${props.paddingBottom} * 1);`}
  ${(props) => props.paddingTop && `padding-top: calc(${props.paddingTop} * 1);`}
${(props) => props.lineHeight && `line-height: calc(${props.lineHeight} * 1);`}
  }
  /* Media query for small screens (e.g., mobile devices) */
  @media (max-width: 768px) {
    ${(props) => props.fontSize && `font-size: calc(${props.fontSize} * 0.8);`}
  ${(props) => props.paddingBottom && `padding-bottom: calc(${props.paddingBottom} * 0.8);`}
  ${(props) => props.paddingTop && `padding-top: calc(${props.paddingTop} * 0.8);`}
${(props) => props.lineHeight && `line-height: calc(${props.lineHeight} * 0.8);`}
${(props) => props.mdTextAlign && `text-align: ${props.mdTextAlign};`}
  }
  /* Media query for very small screens (e.g., extra-small mobile devices) */
  @media (max-width: 480px) {
    ${(props) => props.fontSize && `font-size: calc(${props.fontSize} * 0.7);`}
  ${(props) => props.paddingBottom && `padding-bottom: calc(${props.paddingBottom} * 0.7);`}
  ${(props) => props.paddingTop && `padding-top: calc(${props.paddingTop} * 0.7);`}
${(props) => props.lineHeight && `line-height: calc(${props.lineHeight} * 0.7);`}
  }
`;
export const SpaceX = styled.div`
  display: flex;
  > * + * {
    margin-left: ${({ space }) => space || '1rem'};
  }
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  background-color: ${({ bg }) => bg || 'transparent'};
  /* Responsive Props */
  @media (min-width: 640px) { /* sm */
    > * + * {
      ${({ smSpace }) => smSpace && `margin-left: ${smSpace};`}
    }
    ${({ smPadding }) => smPadding && `padding: ${smPadding};`}
    ${({ smMargin }) => smMargin && `margin: ${smMargin};`}
    ${({ smBg }) => smBg && `background-color: ${smBg};`}
  }
  @media (min-width: 768px) { /* md */
    > * + * {
      ${({ mdSpace }) => mdSpace && `margin-left: ${mdSpace};`}
    }
    ${({ mdPadding }) => mdPadding && `padding: ${mdPadding};`}
    ${({ mdMargin }) => mdMargin && `margin: ${mdMargin};`}
    ${({ mdBg }) => mdBg && `background-color: ${mdBg};`}
  }
  @media (min-width: 1024px) { /* lg */
    > * + * {
      ${({ lgSpace }) => lgSpace && `margin-left: ${lgSpace};`}
    }
    ${({ lgPadding }) => lgPadding && `padding: ${lgPadding};`}
    ${({ lgMargin }) => lgMargin && `margin: ${lgMargin};`}
    ${({ lgBg }) => lgBg && `background-color: ${lgBg};`}
  }
  @media (min-width: 1280px) { /* xl */
    > * + * {
      ${({ xlSpace }) => xlSpace && `margin-left: ${xlSpace};`}
    }
    ${({ xlPadding }) => xlPadding && `padding: ${xlPadding};`}
    ${({ xlMargin }) => xlMargin && `margin: ${xlMargin};`}
    ${({ xlBg }) => xlBg && `background-color: ${xlBg};`}
  }
  @media (min-width: 1536px) { /* 2xl */
    > * + * {
      ${({ xxlSpace }) => xxlSpace && `margin-left: ${xxlSpace};`}
    }
    ${({ xxlPadding }) => xxlPadding && `padding: ${xxlPadding};`}
    ${({ xxlMargin }) => xxlMargin && `margin: ${xxlMargin};`}
    ${({ xxlBg }) => xxlBg && `background-color: ${xxlBg};`}
  }
`;
export const SpaceY = styled.div`
  display: flex;
  flex-direction: column;
  > * + * {
    margin-top: ${({ space }) => space || '1rem'};
  }
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  background-color: ${({ bg }) => bg || 'transparent'};
  /* Responsive Props */
  @media (min-width: 640px) { /* sm */
    > * + * {
      ${({ smSpace }) => smSpace && `margin-top: ${smSpace};`}
    }
    ${({ smPadding }) => smPadding && `padding: ${smPadding};`}
    ${({ smMargin }) => smMargin && `margin: ${smMargin};`}
    ${({ smBg }) => smBg && `background-color: ${smBg};`}
  }
  @media (min-width: 768px) { /* md */
    > * + * {
      ${({ mdSpace }) => mdSpace && `margin-top: ${mdSpace};`}
    }
    ${({ mdPadding }) => mdPadding && `padding: ${mdPadding};`}
    ${({ mdMargin }) => mdMargin && `margin: ${mdMargin};`}
    ${({ mdBg }) => mdBg && `background-color: ${mdBg};`}
  }
  @media (min-width: 1024px) { /* lg */
    > * + * {
      ${({ lgSpace }) => lgSpace && `margin-top: ${lgSpace};`}
    }
    ${({ lgPadding }) => lgPadding && `padding: ${lgPadding};`}
    ${({ lgMargin }) => lgMargin && `margin: ${lgMargin};`}
    ${({ lgBg }) => lgBg && `background-color: ${lgBg};`}
  }
  @media (min-width: 1280px) { /* xl */
    > * + * {
      ${({ xlSpace }) => xlSpace && `margin-top: ${xlSpace};`}
    }
    ${({ xlPadding }) => xlPadding && `padding: ${xlPadding};`}
    ${({ xlMargin }) => xlMargin && `margin: ${xlMargin};`}
    ${({ xlBg }) => xlBg && `background-color: ${xlBg};`}
  }
  @media (min-width: 1536px) { /* 2xl */
    > * + * {
      ${({ xxlSpace }) => xxlSpace && `margin-top: ${xxlSpace};`}
    }
    ${({ xxlPadding }) => xxlPadding && `padding: ${xxlPadding};`}
    ${({ xxlMargin }) => xxlMargin && `margin: ${xxlMargin};`}
    ${({ xxlBg }) => xxlBg && `background-color: ${xxlBg};`}
  }
`;
export const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Fellix, sans-serif !important;
  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop};`}
  ${(props) => props.paddingBottom && `padding-bottom: ${props.paddingBottom};`}
  ${(props) => props.paddingRight && `padding-right: ${props.paddingRight};`}
  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
  ${(props) => props.paddingX && `padding-right: ${props.paddingX}; padding-left: ${props.paddingX};`}
  ${(props) => props.paddingY && `padding-top: ${props.paddingY}; padding-bottom: ${props.paddingY};`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.marginRight && `margin-right: ${props.marginRight};`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft};`}
  ${(props) => props.marginX && `margin-right: ${props.marginX}; margin-left: ${props.marginX};`}
  ${(props) => props.marginY && `margin-top: ${props.marginY}; margin-bottom: ${props.marginY};`}
  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.backgroundColor && `background-color: ${props.backgroundColor};`}
  ${(props) => props.display && `display: ${props.display};`}
  ${(props) => props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`}
  ${(props) => props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${(props) => props.border && `border: ${props.border};`}
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius};`}
  ${(props) => props.boxShadow && `box-shadow: ${props.boxShadow};`}
  ${(props) => props.overflow && `overflow: ${props.overflow};`}
  ${(props) => props.position && `position: ${props.position};`}
  ${(props) => props.top && `top: ${props.top};`}
  ${(props) => props.right && `right: ${props.right};`}
  ${(props) => props.bottom && `bottom: ${props.bottom};`}
  ${(props) => props.left && `left: ${props.left};`}
  ${(props) => props.zIndex && `z-index: ${props.zIndex};`}
  ${(props) => props.gap && `gap: ${props.gap};`}
`;
export const FlexCol = styled.div`
  flex: 1;
  font-family: Fellix, sans-serif !important;
  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop};`}
  ${(props) => props.paddingBottom && `padding-bottom: ${props.paddingBottom};`}
  ${(props) => props.paddingRight && `padding-right: ${props.paddingRight};`}
  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
  ${(props) => props.paddingX && `padding-right: ${props.paddingX}; padding-left: ${props.paddingX};`}
  ${(props) => props.paddingY && `padding-top: ${props.paddingY}; padding-bottom: ${props.paddingY};`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.marginRight && `margin-right: ${props.marginRight};`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft};`}
  ${(props) => props.marginX && `margin-right: ${props.marginX}; margin-left: ${props.marginX};`}
  ${(props) => props.marginY && `margin-top: ${props.marginY}; margin-bottom: ${props.marginY};`}
  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.backgroundColor && `background-color: ${props.backgroundColor};`}
  ${(props) => props.display && `display: ${props.display};`}
  ${(props) => props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`}
  ${(props) => props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${(props) => props.border && `border: ${props.border};`}
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius};`}
  ${(props) => props.boxShadow && `box-shadow: ${props.boxShadow};`}
  ${(props) => props.overflow && `overflow: ${props.overflow};`}
  ${(props) => props.position && `position: ${props.position};`}
  ${(props) => props.top && `top: ${props.top};`}
  ${(props) => props.right && `right: ${props.right};`}
  ${(props) => props.bottom && `bottom: ${props.bottom};`}
  ${(props) => props.left && `left: ${props.left};`}
  ${(props) => props.zIndex && `z-index: ${props.zIndex};`}
    ${(props) => props.gap && `gap: ${props.gap};`}
  /* Full width on small devices */
  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding:10px;
  }
  /* Half width on medium to large devices */
  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
// export const SpaceY = styled.div`
//   & > *:not(:last-child) {
//     margin-bottom: ${(props) => props.spacing || '1rem'};
//   }
// `;
// export const SpaceX = styled.div`
//   display: flex;
//   & > *:not(:last-child) {
//     margin-right: ${(props) => props.spacing || '1rem'};
//   }
// `;
export const StyledParagraph = styled.p`
  /* Typography */
  font-family: Fellix, sans-serif !important;
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: ${(props) => props.lineHeight || '1.5'};
  text-align: ${(props) => props.textAlign || 'left'};
  color: ${(props) => props.color || '#333'};
  /* Text Decorations */
  text-transform: ${(props) => props.textTransform || 'none'};
  text-decoration: ${(props) => props.textDecoration || 'none'};
  letter-spacing: ${(props) => props.letterSpacing || 'normal'};
  white-space: ${(props) => props.whiteSpace || 'normal'};
  word-spacing: ${(props) => props.wordSpacing || 'normal'};
  /* Margins & Padding */
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '0'};
  /* Layout & Display */
  display: ${(props) => props.display || 'block'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  /* Borders */
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.borderRadius || '0'};
  /* Background */
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  /* Box Shadow */
  box-shadow: ${(props) => props.boxShadow || 'none'};
  /* Pseudo-classes */
  // &:hover {
  //   color: ${(props) => props.hoverColor || '#555'};
  // }
  &:active {
    color: ${(props) => props.activeColor || '#777'};
  }
  &:focus {
    outline: none;
    border-color: ${(props) => props.focusBorderColor || '#007bff'};
  }
  /* Media Queries */
  @media (max-width: 768px) {
    font-size: ${(props) => props.responsiveFontSize || '14px'};
  }
`;
// const BaseHeading = styled('h1')`
//   font-weight: ${(props) => props.fontWeight || 'bold'};
//   line-height: ${(props) => props.lineHeight || '1.2'};
//   text-align: ${(props) => props.textAlign || 'left'};
//   color: ${(props) => props.color || '#000'};
//   text-transform: ${(props) => props.textTransform || 'none'};
//   text-decoration: ${(props) => props.textDecoration || 'none'};
//   letter-spacing: ${(props) => props.letterSpacing || 'normal'};
//   margin: ${(props) => props.margin || '0'};
//   padding: ${(props) => props.padding || '0'};
//   border: ${(props) => props.border || 'none'};
//   border-radius: ${(props) => props.borderRadius || '0'};
//   background-color: ${(props) => props.backgroundColor || 'transparent'};
//   box-shadow: ${(props) => props.boxShadow || 'none'};
//   // &:hover {
//   //   color: ${(props) => props.hoverColor || props.color || '#007bff'};
//   // }
//   &:active {
//     color: ${(props) => props.activeColor || props.color || '#0056b3'};
//   }
//   &:focus {
//     outline: none;
//     border-color: ${(props) => props.focusBorderColor || '#007bff'};
//   }
// `;
// // Styled components for each heading level with sizes in rem
// export const H1 = styled(BaseHeading.withComponent('h1'))`
//   font-size: ${(props) => props.fontSize || '2rem'}; /* 32px */
// `;
// export const H2 = styled(BaseHeading.withComponent('h2'))`
//   font-size: ${(props) => props.fontSize || '1.75rem'}; /* 28px */
// `;
// export const H3 = styled(BaseHeading.withComponent('h3'))`
//   font-size: ${(props) => props.fontSize || '1.5rem'}; /* 24px */
// `;
// export const H4 = styled(BaseHeading.withComponent('h4'))`
//   font-size: ${(props) => props.fontSize || '1.25rem'}; /* 20px */
// `;
// export const H5 = styled(BaseHeading.withComponent('h5'))`
//   font-size: ${(props) => props.fontSize || '1.125rem'}; /* 18px */
// `;
// export const H6 = styled(BaseHeading.withComponent('h6'))`
//   font-size: ${(props) => props.fontSize || '1rem'}; /* 16px */
// `;