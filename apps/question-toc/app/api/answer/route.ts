import { NextRequest } from "next/server"
import { postAnswer } from "@/services/answer"

function genAnswerInfo(reqBody: any) {
    const answerList: any[] = []
    for (let key of reqBody.entries()) {
        if (key[0] === "questionId") continue
        answerList.push({
            componentId: key[0],
            value: key[1]
        })
    }

    return {
        questionId: reqBody.questionId || "",
        answerList
    }
}

export async function POST(req: NextRequest) {
    // 获取并格式化表单数据
    const formData = await req.formData()
    console.log(formData)
    const answerInfo = genAnswerInfo(formData)

    console.log("answerInfo", answerInfo)

    try {
        // 提交到服务端 Mock
        const resData = await postAnswer(answerInfo)
        if (resData.errno === 0) {
            // 如果提交成功了
            return Response.redirect(new URL("/success", req.url))
        } else {
            // 提交失败了
            return Response.redirect(new URL("/fail", req.url))
        }
    } catch (err) {
        return Response.redirect(new URL("/fail", req.url))
    }

    // res.status(200).json({ errno: 0 })
}
