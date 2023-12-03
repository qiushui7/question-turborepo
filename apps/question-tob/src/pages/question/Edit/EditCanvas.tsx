import React, { FC, MouseEvent } from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import {
  changeSelectedId,
  ComponentInfoType,
  moveComponent,
} from "../../../store/componentReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<Props> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentsInfo();
  const dispatch = useDispatch();
  useBindCanvasKeyPress();
  const handleClick = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ newIndex, oldIndex }));
  };

  const componentListWithId = componentList.map((c) => {
    return {
      ...c,
      id: c.fe_id,
    };
  });
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((c) => {
            const { fe_id, isLocked } = c;
            const wrapperDefaultClassName = styles["component-wrapper"];
            const selectedClassName = styles.selected;
            const lockedClassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            });
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(e) => handleClick(e, fe_id)}
                >
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

type Props = {
  loading: boolean;
};

export default EditCanvas;
