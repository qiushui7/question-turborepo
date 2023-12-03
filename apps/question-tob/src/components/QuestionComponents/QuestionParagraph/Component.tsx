import React, { FC } from "react";
import { QuestionParagraphPropType } from "./interface";
import { QuestionTitleDefaultProps } from "../QuestionTitle";
import { Typography } from "antd";

const { Paragraph } = Typography;

const QuestionParagraph: FC<QuestionParagraphPropType> = (props) => {
  const { text = "", isCenter = false } = {
    ...QuestionTitleDefaultProps,
    ...props,
  };

  const textList = text.split("\n");

  return (
    <Paragraph
      style={{ textAlign: isCenter ? "center" : "start", marginBottom: "0" }}
    >
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  );
};

export default QuestionParagraph;
