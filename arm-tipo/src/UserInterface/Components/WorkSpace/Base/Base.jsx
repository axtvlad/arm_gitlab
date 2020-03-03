import React from "react";
import Orders from "./Docs/Orders";
import Regulations from "./Docs/Regulations";
import {Tabs} from 'antd';
import {FileDoneOutlined, FileProtectOutlined} from "@ant-design/icons"

const {TabPane} = Tabs;

const Base = (props) => {
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