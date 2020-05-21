import {Space, Spin, Table} from "antd";
import React from "react";

const {Column, ColumnGroup} = Table;

const Users = (props) => {
    return (
        <div>
            <Spin spinning={props.isFetching}>
                <Table dataSource={props.users}>
                    {props.users.map(user =>
                        <div key={user.id}>
                            <ColumnGroup title="Name">
                                <Column title="First Name" dataIndex={user.firstName} key="firstName"/>
                                <Column title="Last Name" dataIndex={user.lastName} key="lastName"/>
                            </ColumnGroup>
                            <Column title="Email" dataIndex={user.email} key="email"/>
                            <Column title="Phone" dataIndex={user.phone} key="phone"/>
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <a href={'/'}>Invite {record.lastName}</a>
                                        <a href={'/'}>Delete</a>
                                    </Space>
                                )}
                            />
                        </div>
                    )}
                </Table>
            </Spin>
        </div>
    )
};

export default Users