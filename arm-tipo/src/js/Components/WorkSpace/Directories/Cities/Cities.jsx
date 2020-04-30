import {Button, Table} from "antd";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import React from "react";
import {NavLink} from "react-router-dom";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
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

class Cities extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.cities.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            axios
                .get('http://185.22.66.183:8080/rest/api/cities', config)
                .then(response => {
                    this.props.setCities(response.data.data);
                    console.log('cities: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <div className={'content'}>
                <NavLink to={'/AddCity'}>
                    <Button
                        type="danger"
                        shape="round"
                        icon={<PlusOutlined/>}
                    >
                        Добавить город
                    </Button>
                </NavLink>
                <Table columns={columns} dataSource={this.props.cities}/>
            </div>
        )
    }
}

export default Cities;