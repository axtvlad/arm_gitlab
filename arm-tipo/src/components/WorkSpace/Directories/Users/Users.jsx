import {Space, Spin, Table} from "antd";
import React from "react";

const {Column} = Table;

const Users = (props) => {
    return (
        <div>
            <Spin spinning={props.isFetching}>
                <Table dataSource={props.users}>
                    {props.users.map(user =>
                        <div key={user.id}>
                            {console.log(user)}
                            <Column title="First Name" dataIndex={'firstName'} key={'firstName'}/>
                            <Column title="Last Name" dataIndex={'lastName'} key={'lastName'}/>
                            <Column title="Email" dataIndex={'email'} key={'email'}/>
                            <Column title="Phone" dataIndex={'phone'} key={'phone'}/>
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <a href={'/'}>Delete {record.firstName}</a>
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