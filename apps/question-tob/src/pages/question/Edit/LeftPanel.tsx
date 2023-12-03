import React, {FC} from "react";
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import ComponentLib from "./ComponentLib";
import Layers from "./Layers";

const LeftPanel: FC<Props> = (props) => {
  const tabsItems = [
    {
      key: "componentLib",
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: "layers",
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ];
  return <Tabs defaultActiveKey={"componentLib"} items={tabsItems} />;
};

type Props = {};

export default LeftPanel;
