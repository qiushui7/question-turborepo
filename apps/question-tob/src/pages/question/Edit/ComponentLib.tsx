import React, { FC, useCallback } from "react"
import { componentConfGroup, ComponentConfType } from "../../../components/QuestionComponents"
import { Typography } from "antd"
import styles from "./ComponentLib.module.scss"
import { useDispatch } from "react-redux"
import { addComponent } from "../../../store/componentReducer"
import { nanoid } from "@reduxjs/toolkit"

const { Title } = Typography

const GenComponent = (c: ComponentConfType) => {
    const { title, type, Component, defaultProps } = c
    const dispatch = useDispatch()
    const handleClick = useCallback(() => {
        dispatch(
            addComponent({
                fe_id: nanoid(),
                title,
                type,
                props: defaultProps
            })
        )
    }, [])

    return (
        <div key={type} className={styles.wrapper} onClick={handleClick}>
            <div className={styles.component}>
                <Component />
            </div>
        </div>
    )
}

const Lib: FC<Props> = (props) => {
    return (
        <>
            {componentConfGroup.map((group, index) => {
                const { groupId = "", groupName = "", components } = group
                return (
                    <div key={groupId}>
                        <Title
                            level={3}
                            style={{
                                fontSize: "16px",
                                marginTop: index > 0 ? "20px" : "0px"
                            }}
                        >
                            {groupName}
                        </Title>
                        <div>{components.map((c) => GenComponent(c))}</div>
                    </div>
                )
            })}
        </>
    )
}

type Props = {}

export default Lib
