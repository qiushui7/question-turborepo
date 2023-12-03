type PropsType = {
    errno: number
    data?: {
        id: string
        title: string
        desc?: string
        js?: string
        css?: string
        isPublished: boolean
        isDeleted: boolean
        componentList: Array<any>
    }
    msg?: string
}

export const getQuestion = async (id: string): Promise<PropsType> => {
    // 根据 id 获取问卷数据
    const data = await fetch(`http://localhost:8080/api/question/${id}`)
    return data.json().then((res) => res)
}
