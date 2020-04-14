import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";

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

const Departments = (props) => {
    return (
        <div>
            <NavLink to={'/addDepartment'}>
                <Button
                    type="danger"
                    shape="round"
                    icon={<PlusOutlined/>}
                >
                    Добавить отдел
                </Button>
            </NavLink>
            <Table columns={columns} dataSource={props.departments}/>
        </div>
    )
};

export default Departments;