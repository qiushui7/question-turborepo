import {FC} from "react";
import QuestionInputConf, {QuestionInputPropsType} from "./QuestionInput";
import QuestionTitleConf, {QuestionTitlePropsType} from "./QuestionTitle";
import QuestionParagraphConf, {QuestionParagraphPropType,} from "./QuestionParagraph";
import QuestionInfoConf, {QuestionInfoPropsType} from "./QuestionInfo";
import QuestionTextareaConf, {QuestionTextareaPropsType,} from "./QuestionTextarea";
import QuestionRadioConf, {QuestionRadioPropsType, QuestionRadioStatPropsType,} from "./QuestionRadio";
import QuestionCheckboxConf, {QuestionCheckboxPropsType, QuestionCheckboxStatPropsType,} from "./QuestionCheckbox";

export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

type ComponentStatPropsType = QuestionRadioStatPropsType &
  QuestionCheckboxStatPropsType;

export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?: FC<ComponentStatPropsType>;
};

const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

export const componentConfGroup = [
  {
    groupId: "textGroup",
    groupName: "文本显示",
    components: [QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf],
  },
  {
    groupId: "inputGroup",
    groupName: "用户输入",
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: "chooseGroup",
    groupName: "用户选择",
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

export const textTypes = componentConfGroup[0].components.map((c) => {
  return c.type;
});

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
