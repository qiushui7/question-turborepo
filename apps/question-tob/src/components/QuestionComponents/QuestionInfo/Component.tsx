import React, {FC} from "react";
import {QuestionInputPropsType} from "../QuestionInput";
import {QuestionInfoDefaultProps} from "./interface";
import {Typography} from "antd";

const { Title, Paragraph } = Typography;

const QuestionInfo: FC<QuestionInputPropsType> = (props) => {
  const { title = "", desc = "" } = { ...QuestionInfoDefaultProps, ...props };

  const descTextList = desc.split("\n");

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {descTextList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

type Props = {};

export default QuestionInfo;
