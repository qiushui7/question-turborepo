import {Button, Result, Spin} from "antd";
import React, {FC, useState} from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import {useNavigate} from "react-router-dom";
import {useTitle} from "ahooks";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";

type Props = {};

const Stat: FC = (props: Props) => {
  const nav = useNavigate();
  const { loading, error } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");

  useTitle(`问卷统计 - ${title}`);

  const LoadingELem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );

  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ flex: "1" }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles["content-wrapper"]}>
        {loading && LoadingELem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  );
};

export default Stat;
