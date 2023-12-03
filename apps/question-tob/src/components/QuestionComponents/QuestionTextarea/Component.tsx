import React, { FC } from "react";
import {
  QuestionTextareaDefaultProps,
  QuestionTextareaPropsType,
} from "./interface";
import { Input, Typography } from "antd";

const { TextArea } = Input;

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionTextareaPropsType> = (props) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};

type Props = {};

export default QuestionInput;
