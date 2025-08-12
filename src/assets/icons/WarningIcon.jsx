// const WarningIcon = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 256 256"
//       width={80}
//       height={80}
//       color="#f8bb86"
//     >
//       <rect width="256" height="256" fill="none"></rect>
//       <circle
//         cx="128"
//         cy="128"
//         r="96"
//         fill="none"
//         stroke="#f8bb86"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         stroke-width="8"
//       ></circle>
//       <line
//         x1="128"
//         y1="80"
//         x2="128"
//         y2="136"
//         fill="none"
//         stroke="#f8bb86"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         stroke-width="8"
//       ></line>
//       <rect
//         x="122" // Adjust the x-coordinate to center the square
//         y="168" // Adjust the y-coordinate to center the square
//         width="12" // Set the width of the square
//         height="12" // Set the height of the square
//         fill="#f8bb86" // Change this to your desired color
//       ></rect>
//     </svg>
//   );
// };
// export default WarningIcon;

import { FaCircleExclamation } from "react-icons/fa6";


const WarningIcon = () => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 45 45"
    //   width={44}
    //   height={44}
    //   color="#FF5D3E"
    // >
    //   <g clipPath="url(#clip0)">
    //     <path
    //       d="M40.6936 20.6518L24.185 4.14148C23.6697 3.62929 22.9728 3.3418 22.2462 3.3418C21.5197 3.3418 20.8227 3.62929 20.3075 4.14148L3.80749 20.6518C3.2953 21.167 3.00781 21.864 3.00781 22.5905C3.00781 23.3171 3.2953 24.014 3.80749 24.5293L20.3161 41.0396C20.8313 41.5518 21.5283 41.8393 22.2548 41.8393C22.9813 41.8393 23.6783 41.5518 24.1936 41.0396L40.7022 24.5293C41.2144 24.014 41.5019 23.3171 41.5019 22.5905C41.5019 21.864 41.2144 21.167 40.7022 20.6518H40.6936ZM20.8712 14.3405C20.8712 13.9759 21.0161 13.6261 21.274 13.3683C21.5318 13.1104 21.8816 12.9655 22.2462 12.9655C22.6109 12.9655 22.9607 13.1104 23.2185 13.3683C23.4764 13.6261 23.6212 13.9759 23.6212 14.3405V23.9655C23.6212 24.3302 23.4764 24.6799 23.2185 24.9378C22.9607 25.1957 22.6109 25.3405 22.2462 25.3405C21.8816 25.3405 21.5318 25.1957 21.274 24.9378C21.0161 24.6799 20.8712 24.3302 20.8712 23.9655V14.3405ZM22.2462 32.2155C21.8383 32.2155 21.4396 32.0946 21.1004 31.8679C20.7612 31.6413 20.4968 31.3192 20.3407 30.9423C20.1846 30.5654 20.1438 30.1508 20.2234 29.7507C20.303 29.3506 20.4994 28.9831 20.7878 28.6946C21.0763 28.4062 21.4438 28.2098 21.8439 28.1302C22.244 28.0506 22.6587 28.0914 23.0355 28.2475C23.4124 28.4036 23.7345 28.668 23.9611 29.0072C24.1878 29.3464 24.3087 29.7451 24.3087 30.153C24.3087 30.7 24.0914 31.2247 23.7046 31.6114C23.3179 31.9982 22.7933 32.2155 22.2462 32.2155Z"
    //       fill="#FF5D3E"
    //     />
    //   </g>
    //   <defs>
    //     <clipPath id="clip0">
    //       <rect width="44" height="44" fill="white" transform="translate(0.246094 0.591797)" />
    //     </clipPath>
    //   </defs>
    // </svg>
    <div style={{backgroundColor:"#FDF5E0" , borderRadius:"50%"  , width:"100px" , height:"100px" , display:"flex" , justifyContent:"center" , alignItems:"center"}}>
    <FaCircleExclamation size={36} color="#F49C17" />

    </div>
  );
};

export default WarningIcon;