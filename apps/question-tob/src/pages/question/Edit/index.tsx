import React, {FC} from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import {useDispatch} from "react-redux";
import {changeSelectedId} from "../../../store/componentReducer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";

const Edit: FC = (props: Props) => {
  const { loading, error } = useLoadQuestionData();
  const dispatch = useDispatch();
  const clearSelectedId = () => {
    dispatch(changeSelectedId(""));
  };
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#fff", height: "40px" }}>
        <EditHeader />
      </div>
      <div className={styles["container-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles["canvas-wrapper"]}>
              <div style={{ height: "900px" }}>
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {};

export default Edit;
