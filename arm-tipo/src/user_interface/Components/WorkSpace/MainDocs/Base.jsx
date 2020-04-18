import React from "react";
import Orders from "./Orders";
import Regulations from "./Regulations";
import {Tabs} from 'antd';
import FileDoneOutlined from "@ant-design/icons/lib/icons/FileDoneOutlined";
import FileProtectOutlined from "@ant-design/icons/lib/icons/FileProtectOutlined";

const {TabPane} = Tabs;

const Base = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <FileDoneOutlined/>
                                Приказы
                        </span>
                    }
                    key="1"
                >
                    <Orders/>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <FileProtectOutlined/>
                                Постановления
                        </span>
                    }
                    key="2"
                >
                    <Regulations/>
                </TabPane>
            </Tabs>
        </div>
    )
};

export default Base;