import {Button, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";

const Genders = (props) => {
    const {t} = useTranslation();

    const columns = [
        {
            title: t('russianName'),
            dataIndex: 'name_ru',
            key: 'name_ru',
            render: text => <a href={'/'}>{text}</a>,
        },
        {
            title: t('kazakhName'),
            dataIndex: 'name_kz',
            key: 'name_kz',
            render: text => <a href={'/'}>{text}</a>,
        },
        {
            title: t('actions'),
            key: 'action',
            dataIndex: 'actions',
            render: actions => (
                <span>
                    <Button style={{margin: '0 5px'}} shape="circle" icon={<EditOutlined/>} type={"primary"}/>
                    <Button style={{margin: '0 5px'}} shape="circle" icon={<DeleteOutlined/>} type={"primary"}/>
                </span>
            )
        }
    ];

    return (
        <div className={'content'}>
            <Spin spinning={props.isFetching}>
                <Table
                    columns={columns}
                    dataSource={props.directory}
                    rowKey={'id'}
                />
            </Spin>
        </div>
    )
};

export default Genders;