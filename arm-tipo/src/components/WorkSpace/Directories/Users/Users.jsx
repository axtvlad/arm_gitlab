import {Space, Spin, Table} from "antd";
import React from "react";
import {NavLink} from "react-router-dom";
import PlusOutlined from "@ant-design/icons/es/icons/PlusOutlined";
import Button from "../../../../../node_modules/antd/lib/button/button";
import {GetAddButtonText} from "../../../common/utils/AddButtonText";
import {useTranslation} from "react-i18next";
import {GetAddAddress} from "../../../common/utils/AddPagesRoutes";

const Users = (props) => {
    const {t} = useTranslation();

    const {Column} = Table;

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
                    <Column title={t('firstName')} dataIndex={'firstName'} key={'firstName'}
                        render={(text, record) => {
                            console.log(record);
                            return (
                        <Space size="middle">
                            <NavLink to={'/' + props.type + '/' + record.userId}>{record.firstName}</NavLink>
                        </Space>
                    )}}/>
                    <Column title={t('lastName')} dataIndex={'lastName'} key={'lastName'}/>
                    <Column title={t('email')} dataIndex={'email'} key={'email'}/>
                    <Column title={t('phone')} dataIndex={'phone'} key={'phone'}/>
                    <Column
                        title={t('actions')}
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