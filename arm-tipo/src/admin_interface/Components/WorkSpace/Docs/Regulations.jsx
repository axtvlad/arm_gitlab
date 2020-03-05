import React from "react";
import {Table} from 'antd';

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
            <Table columns={columns} dataSource={data}/>
        </div>
    )
};
export default Regulations;
