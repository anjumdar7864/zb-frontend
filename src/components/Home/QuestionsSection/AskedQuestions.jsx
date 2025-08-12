import React, { useState } from "react";
import { AnswerButton, QuestionBox } from "./styles";
import { Flex, Paragraph } from "@/styles/CommonStyles";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const AskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      question: "How does text message lead generation work?",
      answer:
        "Text message lead generation involves using SMS marketing to capture and engage leads effectively, providing high deliverability and response rates.",
    },
    {
      question: "What is the deliverability rate of your text messages?",
      answer:
        "Our text messages have a 98% deliverability rate, ensuring your campaigns reach your audience promptly.",
    },
    {
      question: "How many messages can I send per month?",
      answer:
        "You can send unlimited messages depending on your chosen plan. Contact us for customized packages.",
    },
    {
      question: "Is there a contract or can I cancel at any time?",
      answer:
        "We offer flexible contracts, and you can cancel at any time without penalties.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We use industry-standard encryption and data protection measures to ensure your data remains secure.",
    },
    {
      question: "Is the platform compliant with all regulations?",
      answer:
        "Yes, our platform complies with all relevant regulations, including GDPR and TCPA.",
    },
    {
      question: "What software do call centers use?",
      answer:
        "Call centers typically use CRM and communication software for managing customer interactions efficiently.",
    },
    {
      question: "Can I integrate this platform with my existing CRM?",
      answer:
        "Yes, our platform integrates seamlessly with popular CRMs like Salesforce, HubSpot, and Zoho.",
    },
    {
      question: "How quickly can I start generating leads after signing up?",
      answer:
        "You can start generating leads immediately after setup, which typically takes less than an hour.",
    },
    {
      question: "Can I track the performance of my campaigns?",
      answer:
        "Yes, our platform offers detailed analytics to track and optimize your campaign performance.",
    },
  ];

  // Split the questions array into two halves
  const half = Math.ceil(questions.length / 2);
  const firstHalf = questions.slice(0, half);
  const secondHalf = questions.slice(half);

  return (
    <Flex 
    gap={"24px"}
    direction="column"
   style={{paddingTop:"96px"}}
   xsPadding="32px 0 0 0"
   maxWidth="1440px"
   margin="auto"
    >
      <Paragraph
        weight={"600"}
        fontSize={"36px"}
        xsFontSize={"32px"}
        color={"#012635"}
        align={"center"}
        paddingBottom={"10px"}
      >
        Frequently Asked Questions
      </Paragraph>
      <Flex direction="column" lgDirection="row" gap="16px">
        <Flex gap={"16px"} width={`100%`} mdWidth="100%" direction={"column"}>
          {firstHalf.map((q, index) => (
            <QuestionBox
              key={index}
              style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <Flex
                justify={"space-between"}
                direction="row"
                onClick={() => toggleQuestion(index)}
                cursor="pointer"
              >
                <Paragraph weight={"500"} fontSize={"16px"} color={"#012635"}>
                  {q.question}
                </Paragraph>
                <AnswerButton>
                  {openIndex === index ? (
                    <FiChevronUp size={20} color="#012635" />
                  ) : (
                    <FiChevronDown size={20} color="#012635" />
                  )}
                </AnswerButton>
              </Flex>
              <div
                style={{
                  height: openIndex === index ? "auto" : "0",
                  overflow: "hidden",
                  transition: "height 0.3s ease",
                  paddingTop: openIndex === index ? "10px" : "0",
                }}
              >
                <Paragraph weight={"400"} fontSize={"14px"} color={"#777777"}>
                  {q.answer}
                </Paragraph>
              </div>
            </QuestionBox>
          ))}
        </Flex>

        <Flex gap={"16px"} width={`100%`} mdWidth="100%" direction={"column"}>
          {secondHalf.map((q, index) => (
            <QuestionBox
              key={index + half}
              style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <Flex
                justify={"space-between"}
                direction="row"
                onClick={() => toggleQuestion(index + half)}
                cursor="pointer"
              >
                <Paragraph weight={"500"} fontSize={"16px"} color={"#012635"}>
                  {q.question}
                </Paragraph>
                <AnswerButton>
                  {openIndex === index + half ? (
                    <FiChevronUp size={25} color="#012635" />
                  ) : (
                    <FiChevronDown size={25} color="#012635" />
                  )}
                </AnswerButton>
              </Flex>
              <div
                style={{
                  height: openIndex === index + half ? "auto" : "0",
                  overflow: "hidden",
                  transition: "height 0.3s ease",
                  paddingTop: openIndex === index + half ? "10px" : "0",
                }}
              >
                <Paragraph weight={"400"} fontSize={"14px"} color={"#777777"}>
                  {q.answer}
                </Paragraph>
              </div>
            </QuestionBox>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};