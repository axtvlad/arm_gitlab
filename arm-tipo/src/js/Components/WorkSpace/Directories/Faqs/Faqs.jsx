import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Collapse, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";

const { Panel } = Collapse;

const a1 = `Как-нибудь`;
const a2 = `Да`;
const a3 = `Нет`;

// const columns = [
//     {
//         title: 'Наименование (ru)',
//         dataIndex: 'name_ru',
//         key: 'name_ru',
//         render: text => <a href={'/'}>{text}</a>,
//     },
//     {
//         title: 'Наименование (kz)',
//         dataIndex: 'name_kz',
//         key: 'name_kz',
//         render: text => <a href={'/'}>{text}</a>,
//     },
//     {
//         title: 'Действия',
//         key: 'action',
//         dataIndex: 'actions',
//         render: actions => (
//             <span>
//                 <Button style={{margin: '0 5px'}} shape="circle" icon={<EditOutlined/>} type={"primary"}/>
//                 <Button style={{margin: '0 5px'}} shape="circle" icon={<DeleteOutlined/>} type={"primary"}/>
//             </span>
//         )
//     }
// ];

const Faqs = (props) => {
    return (
        <div className={'content'}>
            <NavLink to={'/addFaq'}>
                <Button
                    type="danger"
                    shape="round"
                    icon={<PlusOutlined/>}
                >
                    Добавить вопрос
                </Button>
            </NavLink>

            <Collapse accordion>
                <Panel header="Как пользоваться данным сервисом?" key="1">
                    <p>{a1}</p>
                </Panel>
                <Panel header="Сервис платный?" key="2">
                    <p>{a2}</p>
                </Panel>
                <Panel header="Нет?" key="3">
                    <p>{a3}</p>
                </Panel>
            </Collapse>
            {/*<Table columns={columns} dataSource={props.statuses}/>*/}
        </div>
    )
};

export default Faqs;