import { Divider, Flex, H2, Paragraph } from "@/styles/CommonStyles";
import React from "react";
import theme from "@/theme";
import Components from "@/components";
import { Link, useNavigate, useLocation } from "react-router-dom";
export default function PrixingCard({ data ,...rest }) {
  const navigate = useNavigate();
  const handleClick = (data) => {
    navigate("/signup", { state: data });
  };
  const icons = {
    featured: (
      <svg
        width="42"
        height="40"
        viewBox="0 0 42 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.1"
          d="M21.3223 40C32.368 40 41.3223 31.0457 41.3223 20C41.3223 8.9543 32.368 0 21.3223 0C10.2766 0 1.32227 8.9543 1.32227 20C1.32227 31.0457 10.2766 40 21.3223 40Z"
          fill="#F49C17"
        />
        <path
          d="M25.4726 27.7798L21.3226 25.2698L17.1726 27.7698C16.4126 28.2298 15.4826 27.5498 15.6826 26.6898L16.7826 21.9698L13.1126 18.7898C12.4426 18.2098 12.8026 17.1098 13.6826 17.0398L18.5126 16.6298L20.4026 12.1798C20.7426 11.3698 21.9026 11.3698 22.2426 12.1798L24.1326 16.6398L28.9626 17.0498C29.8426 17.1198 30.2026 18.2198 29.5326 18.7998L25.8626 21.9798L26.9626 26.6998C27.1626 27.5598 26.2326 28.2398 25.4726 27.7798Z"
          fill="#F49C17"
        />
      </svg>
    ),
    basic: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_33_1652)">
          <g clip-path="url(#clip1_33_1652)">
            <g opacity="0.5">
              <path
                d="M12 14.6669C14.2091 14.6669 16 12.8761 16 10.6669C16 8.45785 14.2091 6.66699 12 6.66699C9.79086 6.66699 8 8.45785 8 10.6669C8 12.8761 9.79086 14.6669 12 14.6669Z"
                fill={
                  (data?.theme == "primary" && theme.colors.primary) ||
                  (data?.theme == "secondary" && theme.colors.tertiary) ||
                  (data?.theme == "tertiary" && theme.colors.white)
                }
              />
              <path
                d="M22.6667 14.6668C24.1394 14.6668 25.3333 13.4729 25.3333 12.0002C25.3333 10.5274 24.1394 9.3335 22.6667 9.3335C21.1939 9.3335 20 10.5274 20 12.0002C20 13.4729 21.1939 14.6668 22.6667 14.6668Z"
                fill={
                  (data?.theme == "primary" && theme.colors.primary) ||
                  (data?.theme == "secondary" && theme.colors.tertiary) ||
                  (data?.theme == "tertiary" && theme.colors.white)
                }
              />
            </g>
            <path
              d="M12 17.3335C6.43452 17.3335 4.49785 18.3059 4 22.4022C6.14321 24.2283 8.94023 25.3335 12 25.3335C15.0598 25.3335 17.8568 24.2283 20 22.4022C19.5022 18.3059 17.5655 17.3335 12 17.3335Z"
              fill={
                (data?.theme == "primary" && theme.colors.primary) ||
                (data?.theme == "secondary" && theme.colors.tertiary) ||
                (data?.theme == "tertiary" && theme.colors.white)
              }
            />
            <path
              d="M27.9998 20.7126C26.583 21.9197 24.7378 22.6543 22.7182 22.6666L22.6469 22.0805C22.4366 20.3496 21.9564 18.7039 20.8701 17.4067C21.3944 17.355 21.9902 17.3335 22.6664 17.3335C26.3767 17.3335 27.6679 17.9818 27.9998 20.7126Z"
              fill={
                (data?.theme == "primary" && theme.colors.primary) ||
                (data?.theme == "secondary" && theme.colors.tertiary) ||
                (data?.theme == "tertiary" && theme.colors.white)
              }
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_33_1652">
            <rect width="32" height="32" fill="white" />
          </clipPath>
          <clipPath id="clip1_33_1652">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    tick: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="20"
        height="20"
        viewBox="0 0 26 26"
      >
        <path
          d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"
          fill={
            (data?.theme == "primary" && theme.colors.primary) ||
            (data?.theme == "secondary" && theme.colors.tertiary) ||
            (data?.theme == "tertiary" && theme.colors.white)
          }
        ></path>
      </svg>
    ),
  };
  return (
    <Flex
      direction={`column`}
      gap={`1rem`}
      width={`100%`}
      border={`thin solid silver`}
      bg={
        (data?.theme == "primary" && theme.colors.white) ||
        (data?.theme == "secondary" && theme.colors.white) ||
        (data?.theme == "tertiary" && theme.colors.secondary)
      }
      color={data?.theme == "tertiary" && theme.colors.white}
      padding={`1.5rem`}
      {...rest}
    >
      <Flex
        direction={`row`}
        align={`center`}
        width={`100%`}
        justify={`space-between`}
      >
        <H2
          color={
            (data?.theme == "primary" && theme.colors.primary) ||
            (data?.theme == "secondary" && theme.colors.tertiary) ||
            (data?.theme == "tertiary" && theme.colors.white)
          }
        >
          {data?.title}
        </H2>
        {data?.featured && <Paragraph>{icons.featured}</Paragraph>}
      </Flex>
      <Paragraph fontSize={`1.2rem`}>{data?.description}</Paragraph>
      <Flex dir="row" gap={`0.5rem`} align={`baseline`}>
        <Paragraph fontSize={`2rem`}>${data?.price}</Paragraph>
        <Paragraph fontSize={`1rem`}>/{data?.duration}</Paragraph>
      </Flex>
      <Components.Common.Button
        // onClick={() => navigate("/signup")}
        onClick={() => handleClick(data)}
        bgColor={
          (data?.theme == "primary" && theme.colors.primary) ||
          (data?.theme == "secondary" && theme.colors.tertiary) ||
          (data?.theme == "tertiary" && theme.colors.white)
        }
        color={data?.theme == "tertiary" && theme.colors.black}
        text="Get Access"
        style={{ borderRadius: `5px` }}
      />
      <Flex direction="row" gap={`0.5rem`} align={`center`}>
        <div>{icons.basic}</div>
        <Paragraph fontSize={`1.2rem`} gap={`0.5rem`}>
          {data?.subDescription}
        </Paragraph>
      </Flex>
      <Divider color={`silver`} />
      <Paragraph fontSize={`1.2rem`}>{data?.subTitle}</Paragraph>
      <Flex direction={`column`} gap={`0.5rem`} flex={`1`}>
        {data?.features.map((item, index) => (
          <Flex key={index} direction="row" align={`center`} gap={`0.5rem`}>
            <div>{icons.tick}</div>
            <Paragraph fontSize={`1rem`} gap={`0.5rem`}>
              {item}
            </Paragraph>
          </Flex>
        ))}
      </Flex>
      <Flex direction="row" align={`center`} justify={`center`} gap={`0.5rem`}>
        <Paragraph
          fontSize={`1.2rem`}
          gap={`0.5rem`}
          onClick={() => {
            navigate("/pricing");
          }}
        >
          <a>See More</a>
        </Paragraph>
        <div>
          <img src="./icons/arrow-left.svg" />
        </div>
      </Flex>
    </Flex>
  );
}
