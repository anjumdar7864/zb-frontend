const theme = {
  colors: {
    white: "#ffffff",
    black: "#000000",
    primary:"#06AB78",
    secondary:"#012635",
    tertiary: "#2022AE",
    accent: "#4C98F4",
    green:'#1E9B50'
  },

  breakpoints: {
    xs: 400,
    sm: 500,
    md: 650,
    mdd:769,
    lg: 800,
    llg: 825,
    xlg: 990,
    xllg:940,
    tab:1024 ,
    xxllgg: 1000,
    xxllggg: 1100,
    xlgg: 1150,
    // xxlg: 1250,
    xxlg: 1280,
    
    xxllg: 1360,
    // xxlgg: 1450,
    xxlgg: 1440,
    xxxlg: 1500,
    xxxlgg: 1600,
    xxxxlg: 1700,
  },

  queryStatement: (width) => `@media screen and (max-width: ${width}px)`,

  flex: (dir, items, content, gap) => `
        display : flex;
        justify-content : ${content ?? "center"};
        align-items : ${items ?? "stretch"};
        gap : ${gap ?? 0};
    `,

  image: (width) => `
        width : ${width};
        aspect-ratio : 1/1;
        object-fit : cover;
    `,
};

export default theme;