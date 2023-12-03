import React, { ChangeEvent, FC, useState } from "react";
import styles from "./EditHeader.module.scss";
import { Button, Input, message, Space, Typography } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import EditToolBar from "./EditToolBar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "../../../store/pageInfoReducer";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuestionService } from "../../../services/question";

const { Title } = Typography;

const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  };

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    );
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button
        onClick={() => setEditState(true)}
        icon={<EditOutlined />}
        type={"text"}
      />
    </Space>
  );
};

const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList } = useGetComponentsInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    { manual: true },
  );

  // 快捷键
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });

  // 自定保存（不是定期保存，不是定时器）
  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    },
  );

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
};

const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentsInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, // 标志着问卷已经被发布
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success("发布成功");
        nav("/question/stat/" + id); // 发布成功，跳转到统计页面
      },
    },
  );

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  );
};

const EditHeader: FC<Props> = (props) => {
  const nav = useNavigate();
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type={"link"}
              icon={<LeftOutlined />}
              onClick={() => nav(-1)}
            >
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

type Props = {};

export default EditHeader;
