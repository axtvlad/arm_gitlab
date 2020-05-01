import React from 'react'
import {Button, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {NavLink} from "react-router-dom";
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

class Types extends React.Component {
    componentDidMount() {
        if (this.props.types.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            axios
                .get('http://185.22.66.183:8080/rest/api/types', config)
                .then(response => {
                    this.props.setTypes(response.data.data);
                    console.log('types: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <div className={'content'}>
                <NavLink to={'/addType'}>
                    <Button
                        type="danger"
                        shape="round"
                        icon={<PlusOutlined/>}
                    >
                        Добавить тип документа
                    </Button>
                </NavLink>
                <Table columns={columns} dataSource={this.props.types}/>
            </div>
        )
    }
}

export default Types;