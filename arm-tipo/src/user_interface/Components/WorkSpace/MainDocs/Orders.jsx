import React from "react";
import {Button, Table, Tag} from 'antd';
import {NavLink} from "react-router-dom";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const columns = [
    {
        title: 'Название (ru)',
        dataIndex: 'name_ru',
        key: 'name_ru',
        render: text => <NavLink to={'/doc/' + data[0].key}>{text}</NavLink>
    },
    {
        title: 'Номер документа',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: 'Отдел',
        dataIndex: 'department_id',
        key: 'department_id',
    },
    {
        title: 'Статус',
        key: 'status',
        dataIndex: 'statuses',
        render: statuses => (
            <span>
                {statuses.map(status => {
                    let color = status.length > 5 ? 'geekblue' : 'green';
                    if (status === 'Утратил силу') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
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

const data = [
    {
        key: '1',
        name: 'Приказ 1',
        statuses: ['Актуальный'],
        department: 'МОН РК',
        number: '243-1a',
        pub_date: '20.01.2020'
    },
    {
        key: '2',
        name: 'Приказ 2',
        statuses: ['Новый'],
        department: 'МОН РК',
        number: '321',
        pub_date: '04.05.2019'
    },
    {
        key: '3',
        name: 'Приказ 3',
        statuses: ['Утратил силу'],
        department: 'МОН РК',
        number: '53/2',
        pub_date: '19.03.2016'
    },
    {
        key: '4',
        name: 'Приказ 4',
        statuses: ['Утратил силу'],
        department: 'МОН РК',
        number: '53/3',
        pub_date: '19.03.2016'
    },
];

const Orders = () => {
    return (
        <div>
            <NavLink to={'/addMainDoc'}>
                <Button
                    style={{margin: '0 10px 15px'}}
                    type="danger"
                    shape="round"
                    icon={<PlusOutlined/>}
                >
                    Добавить новый приказ
                </Button>
            </NavLink>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
};
export default Orders;
