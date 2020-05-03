import {Button, Spin, Table} from "antd";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import React from "react";
import {NavLink} from "react-router-dom";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const columns = [
    {
        title: 'Наименование (ru)',
        dataIndex: 'name_ru',
        key: 'name_ru',
        render: text => <a href={'/'}>{text}</a>,
    },
    {
        title: 'Наименование (kz)',
        dataIndex: 'name_kz',
        key: 'name_kz',
        render: text => <a href={'/'}>{text}</a>,
    },
    {
        title: 'Действия',
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

const Cities = (props) => {
    return (
        <div className={'content'}>
            <NavLink to={'/addCity'}>
                <Button
                    type="danger"
                    shape="round"
                    icon={<PlusOutlined/>}
                >
                    Добавить город
                </Button>
            </NavLink>
            <Spin spinning={props.isFetching}>
                <Table
                    rowKey={'id'}
                    columns={columns}
                    dataSource={props.cities}
                />
            </Spin>
        </div>
    )
};

export default Cities;