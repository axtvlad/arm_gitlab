import {Space, Spin, Table} from "antd";
import React from "react";
import {NavLink} from "react-router-dom";
import PlusOutlined from "@ant-design/icons/es/icons/PlusOutlined";
import Button from "../../../../../node_modules/antd/lib/button/button";
import {GetAddButtonText} from "../../../common/utils/AddButtonText";
import {useTranslation} from "react-i18next";
import {GetAddAddress} from "../../../common/utils/AddPagesRoutes";

const Users = ({type, isFetching, users}) => {
    const {t} = useTranslation();
    const {Column} = Table;

    return (
        <div className={'content'}>
            <div className={'addButtonBlock'}>
                <NavLink to={GetAddAddress(type)}>
                    <Button
                        type={'danger'}
                        icon={<PlusOutlined/>}
                    >
                        {t(GetAddButtonText(type))}
                    </Button>
                </NavLink>
            </div>
            <Spin spinning={isFetching}>
                <Table dataSource={users}>
                    <Column
                        title={t('firstName')}
                        dataIndex={'firstName'}
                        key={'firstName'}
                        render={(text, record) =>
                            <Space size="middle">
                                <NavLink
                                    to={'/' + type + '/' + record.userId}>{record.firstName}</NavLink>
                            </Space>
                        }
                    />
                    <Column title={t('lastName')} dataIndex={'lastName'} key={'lastName'}/>
                    <Column title={t('email')} dataIndex={'email'} key={'email'}/>
                    <Column title={t('phone')} dataIndex={'phone'} key={'phone'}/>
                    <Column
                        title={t('actions')}
                        key="action"
                        render={(text, record) =>
                            <Space size="middle">
                                <a href={'/'}>Delete {record.firstName}</a>
                            </Space>
                        }
                    />
                </Table>
            </Spin>
        </div>
    )
};

export default Users