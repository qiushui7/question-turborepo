import React, { ChangeEvent, FC, useEffect, useState } from "react"
import { Input } from "antd"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { LIST_SEARCH_PARAM_KEY } from "../constant"

const { Search } = Input
const ListSearch: FC = (props: Props) => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [value, setValue] = useState("")
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
        setValue(curVal)
    }, [searchParams])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handleSearch = (value: string) => {
        nav({
            pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${value}`
        })
    }
    return (
        <>
            <Search
                size={"large"}
                allowClear
                value={value}
                placeholder={"输入关键字"}
                onSearch={handleSearch}
                onChange={handleChange}
                style={{ width: "200px" }}
            />
        </>
    )
}

type Props = {}

export default ListSearch
