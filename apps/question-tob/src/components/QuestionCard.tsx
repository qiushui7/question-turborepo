import React, {FC, useState} from "react";
import styles from "./QuestionCard.module.scss";
import {Button, Divider, message, Modal, Popconfirm, Space, Tag} from "antd";
import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationOutlined,
    LineChartOutlined,
    StarOutlined,
} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {useRequest} from "ahooks";
import {duplicateQuestionService, updateQuestionService,} from "../services/question";

type Props = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const { confirm } = Modal;

const QuestionCard: FC<Props> = (props) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props;
  const nav = useNavigate();

  const [isStarState, setIsStarState] = useState(isStar);
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      return await updateQuestionService(_id, { isStar: isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success("已更新");
      },
    },
  );
  const { loading: duplicatedLoading, run: duplicate } = useRequest(
    async () => {
      return await duplicateQuestionService(_id);
    },
    {
      manual: true,
      onSuccess(result: any) {
        message.success("复制成功");
        nav(`/question/edit/${result.id}`);
      },
    },
  );
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      return await updateQuestionService(_id, { isDeleted: true });
    },
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        setIsDeletedState(true);
      },
    },
  );
  const del = () => {
    confirm({
      title: "确定删除该问卷吗？",
      icon: <ExclamationOutlined />,
      onOk: deleteQuestion,
    });
  };
  if (isDeletedState) return null;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={
                isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`
              }
            >
              <Space>
                {isStarState && <StarOutlined style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color={"processing"}>已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}
              <span>答案：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type={"text"}
                size={"small"}
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type={"text"}
                size={"small"}
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                问卷统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                icon={<StarOutlined />}
                type={"text"}
                size={"small"}
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title={"确定复制该问卷？"}
                okText={"确定"}
                cancelText={"取消"}
                onConfirm={duplicate}
                disabled={duplicatedLoading}
              >
                <Button
                  icon={<CopyOutlined />}
                  type={"text"}
                  size={"small"}
                  disabled={!isPublished}
                >
                  复制
                </Button>
              </Popconfirm>
              <Button
                icon={<DeleteOutlined />}
                type={"text"}
                size={"small"}
                onClick={del}
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
