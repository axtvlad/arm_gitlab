import {NavLink} from "react-router-dom";
import {Button, Spin, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import React from "react";

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
    }
];

const Categories = (props) => {
    return (
        <div className={'content'}>
            {props.isAdmin && (
                <NavLink to={'/addCategory'}>
                    <Button
                        type="danger"
                        shape="round"
                        icon={<PlusOutlined/>}
                    >
                        Добавить категорию
                    </Button>
                </NavLink>
            )}
            <Spin spinning={props.isFetching}>
                <Table
                    columns={columns}
                    dataSource={props.categories}
                    rowKey={'id'}
                />
            </Spin>
        </div>
    )
};

export default Categories;