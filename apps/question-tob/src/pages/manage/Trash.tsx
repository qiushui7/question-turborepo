import React, {FC, useState} from "react";
import {useRequest, useTitle} from "ahooks";
import {Button, Empty, message, Modal, Space, Spin, Table, Tag, Typography,} from "antd";
import styles from "./common.module.scss";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import {useLoadQuestionListData} from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
import {deleteQuestionsService, updateQuestionService,} from "../../services/question";

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = (props: Props) => {
  useTitle("小涛问卷 - 回收站");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success("恢复成功");
        refresh();
        setSelectedIds([]);
      },
    },
  );
  const { run: deleteQuestion } = useRequest(
    async () => {
      return await deleteQuestionsService(selectedIds);
    },
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      },
    },
  );
  const del = () => {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后不可以找回",
      onOk: () => {
        deleteQuestion();
      },
    });
  };
  const dataColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color={"processing"}>已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];
  const tableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type={"primary"} disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={dataColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description={"暂无数据"} />}
        {!loading && list.length > 0 && tableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

type Props = {};

export default Trash;
