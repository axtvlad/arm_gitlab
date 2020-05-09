import {Button, Dropdown, Menu, Spin} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import React from "react";

import {Table, Tag, Space} from 'antd';

const {Column, ColumnGroup} = Table;

/*const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];*/
const menu = (
    <Menu>
        <Menu.Item>
            <a href='/'>
                Редактировать
            </a>
        </Menu.Item>
        <Menu.Item>
            <a href='/'>
                Удалить
            </a>
        </Menu.Item>
    </Menu>
);

const Users = (props) => {
    return (
        <div>
            <Spin spinning={props.isFetching}>

                <Table dataSource = {props.users}>
                    {props.users.map(user =>
                        <div>
                            <ColumnGroup title="Name">
                                <Column title="First Name" dataIndex={user.firstName} key="firstName"/>
                                <Column title="Last Name" dataIndex={user.lastName} key="lastName"/>
                            </ColumnGroup>
                            <Column title="Email" dataIndex={user.email} key="email"/>
                            <Column title="Phone" dataIndex={user.phone} key="phone"/>
                            <Column
                                title="Tags"
                                dataIndex="tags"
                                key="tags"
                                render={tags => (
                                    <>
                                        {tags.map(tag => (
                                            <Tag color="blue" key={tag}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </>
                                )}
                            />

                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <a>Invite {record.lastName}</a>
                                        <a>Delete</a>
                                    </Space>
                                )}
                            />
                        </div>)};
                </Table>

            </Spin>
        </div>
    )
}

export default Users