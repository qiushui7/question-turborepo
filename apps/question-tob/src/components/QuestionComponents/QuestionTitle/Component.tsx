import React, {FC} from "react";
import {QuestionTitleDefaultProps, QuestionTitlePropsType} from "./interface";
import {Typography} from "antd";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (props) => {
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props };

  const genFontSize = (level: number): string => {
    if (level === 1) return "24px";
    if (level === 2) return "20px";
    if (level === 3) return "16px";
    return "16px";
  };

  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? "center" : "start",
          marginBottom: "0",
          fontSize: genFontSize(level),
        }}
      >
        {text}
      </Title>
    </div>
  );
};

export default QuestionTitle;
