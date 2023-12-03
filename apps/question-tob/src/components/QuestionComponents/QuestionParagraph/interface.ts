export type QuestionParagraphPropType = {
    text?: string
    isCenter?: boolean

    onChange?: (newProps: QuestionParagraphPropType) => void
    disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropType = {
    text: "一行段落",
    isCenter: false
}
