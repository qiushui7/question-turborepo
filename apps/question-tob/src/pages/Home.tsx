import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import styles from "./Home.module.scss";

const { Title, Paragraph } = Typography;

const Home: FC = (props: Props) => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问题 100 份，发布问卷 90 份， 收到答卷 980份
        </Paragraph>
        <div>
          <Button type={"primary"} onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

type Props = {};

export default Home;