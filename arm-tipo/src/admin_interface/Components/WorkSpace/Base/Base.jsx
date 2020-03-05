import React from "react";
import Orders from "../Docs/Orders";
import Regulations from "../Docs/Regulations";
import {Button, Tabs} from 'antd';
import FileDoneOutlined from "@ant-design/icons/lib/icons/FileDoneOutlined";
import FileProtectOutlined from "@ant-design/icons/lib/icons/FileProtectOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {NavLink} from "react-router-dom";

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
            <NavLink to={'/addMainDoc'}>
                <Button
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined/>}
                />
            </NavLink>
        </div>
    )
};

export default Base;