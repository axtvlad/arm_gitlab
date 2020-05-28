import {Space, Spin, Table} from "antd";
import React from "react";
import {NavLink} from "react-router-dom";
import PlusOutlined from "@ant-design/icons/es/icons/PlusOutlined";
import Button from "../../../../../node_modules/antd/lib/button/button";
import {GetAddButtonText} from "../../../common/utils/AddButtonText";
import {useTranslation} from "react-i18next";
import {GetAddAddress} from "../../../common/utils/AddPagesRoutes";

const {Column} = Table;

const Users = (props) => {
    const {t} = useTranslation();
    return (
        <div className={'content'}>
            <div className={'addButtonBlock'}>
                <NavLink to={GetAddAddress(props.type)}>
                    <Button
                        type={'danger'}
                        icon={<PlusOutlined/>}
                    >
                        {t(GetAddButtonText(props.type))}
                    </Button>
                </NavLink>
            </div>
            <Spin spinning={props.isFetching}>
                <Table dataSource={props.users}>
                    <Column title="First Name" dataIndex={'firstName'} key={'firstName'}/>
                    <Column title="Last Name" dataIndex={'lastName'} key={'lastName'}/>
                    <Column title="Email" dataIndex={'email'} key={'email'}/>
                    <Column title="Phone" dataIndex={'phone'} key={'phone'}/>
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <a href={'/'}>Delete {record.firstName}</a>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
        </div>
    )
};

export default Users