import {NavLink} from "react-router-dom";
import {Button, Spin, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import React from "react";
import {useTranslation} from "react-i18next";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";

const Directory = (props) => {
    const {t} = useTranslation();

    /**
     *  Для обычного пользователя собираем таблицу из 2 колонок:
     *      1) Наименование на русском
     *      2) Наименования не казахском
     *
     *  dataIndex и key - ключи, по которым производится поиск данных из принимаемых параметров
     */
    const userColumns = [
        {
            title: t('russianName'),
            dataIndex: 'name_ru',
            key: 'name_ru',
            render: text => <a href={'/'}>{text}</a>,
        },
        {
            title: t('kazakhName'),
            dataIndex: 'name_kz',
            key: 'name_kz',
            render: text => <a href={'/'}>{text}</a>,
        }
    ];

    /**
     *  Для администратора/эксперта собираем таблицу из 3 колонок:
     *      1) Наименование на русском
     *      2) Наименования не казахском
     *      3) Действия (совершаемые над записью: редактирование и удаление)
     *
     *  render - отрисовыавет элементы в каждой строке записи
     */
    const adminColumns = [
        ...userColumns,
        {
            title: t('actions'),
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

    return (
        <div className={'content'}>
            {props.isAdmin && (
                <NavLink to={'/'}>
                    <Button
                        type="danger"
                        shape="round"
                        icon={<PlusOutlined/>}
                    >
                        Добавить новую запись
                    </Button>
                </NavLink>
            )}
            <Spin spinning={props.isFetching}>
                <Table
                    columns={props.isAdmin ? adminColumns : userColumns}
                    dataSource={props.directory}
                    rowKey={'id'}
                />
            </Spin>
        </div>
    )
};

export default Directory;