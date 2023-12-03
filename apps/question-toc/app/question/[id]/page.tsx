import { getQuestion } from "@/services/question"
import { getComponent } from "@/components/QuestionComponents"
import styles from "@/styles/Question.module.scss"

export default async function Question({ params }: { params: { id: string } }) {
    const { errno, data, msg = "" } = await getQuestion(params.id)
    // 数据错误
    if (errno !== 0) {
        return (
            <>
                <h1>错误</h1>
                <p>{msg}</p>
            </>
        )
    }

    const {
        id,
        title = "",
        desc = "",
        isDeleted,
        isPublished,
        componentList = []
    } = data || {}

    // 已经被删除的，提示错误
    if (isDeleted) {
        return (
            <>
                <h1>{title}</h1>
                <p>该问卷已经被删除</p>
            </>
        )
    }

    // 尚未发布的，提示错误
    if (!isPublished) {
        return (
            <>
                <h1>{title}</h1>
                <p>该问卷尚未发布</p>
            </>
        )
    }

    // 遍历组件
    const ComponentListElem = (
        <>
            {componentList.map((c) => {
                const ComponentElem = getComponent(c)
                return (
                    <div key={c.fe_id} className={styles.componentWrapper}>
                        {ComponentElem}
                    </div>
                )
            })}
        </>
    )

    return (
        <>
            <form method="post" action="/api/answer">
                <input type="hidden" name="questionId" value={id} />

                {ComponentListElem}

                <div className={styles.submitBtnContainer}>
                    {/* <input type="submit" value="提交"/> */}
                    <button type="submit">提交</button>
                </div>
            </form>
        </>
    )
}
