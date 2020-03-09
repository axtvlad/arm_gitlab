import React from "react";
import {Button, Table} from 'antd';
import {NavLink} from "react-router-dom";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href={'/doc/' + data[0].key}>{text}</a>,
    },
    {
        title: 'Отдел',
        dataIndex: 'department',
        key: 'department',
    },
];

const data = [
    {
        key: '1',
        name: 'Постановление 1',
        department: 'МОН РК',
        pub_date: '20.01.2020'
    },
    {
        key: '2',
        name: 'Постановление 2',
        department: 'МОН РК',
        pub_date: '04.05.2019'
    },
    {
        key: '3',
        name: 'Постановление 3',
        department: 'МОН РК',
        pub_date: '19.03.2016'
    },
    {
        key: '4',
        name: 'Постановление 4',
        department: 'МОН РК',
        pub_date: '19.03.2016'
    },
];

const Regulations = (props) => {
    return (
        <div>
            <NavLink to={'/addMainDoc'}>
                <Button
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined/>}
                />
            </NavLink>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
};
export default Regulations;
