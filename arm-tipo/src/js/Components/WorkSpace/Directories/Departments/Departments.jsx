import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import * as axios from "axios";

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

class Departments extends React.Component {
    componentDidMount() {
        if (this.props.departments.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            axios
                .get('http://185.22.66.183:8080/rest/api/departments', config)
                .then(response => {
                    this.props.setDepartments(response.data.data);
                    console.log('departments: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <div className={'content'}>
                <NavLink to={'/addDepartment'}>
                    <Button
                        type="danger"
                        shape="round"
                        icon={<PlusOutlined/>}
                    >
                        Добавить отдел
                    </Button>
                </NavLink>
                <Table columns={columns} dataSource={this.props.departments}/>
            </div>
        )
    }
}

export default Departments;