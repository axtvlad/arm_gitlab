import {NavLink} from "react-router-dom";
import {Button, Spin, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import React from "react";
import {useTranslation} from "react-i18next";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {GetAddAddress} from "../utils/AddPagesRoutes";
import {GetAddButtonText} from "../utils/AddButtonText";
import classes from './Directory.module.css'
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";

const Directory = ({removeItemById, type, isAdmin, isFetching, directory}) => {
    const {t} = useTranslation();

    const deleteItem = (item) => {
        removeItemById(item.id);
    };

    /**
     *  Собираем таблицу из 3-х колонок:
     *      1) Наименование на русском
     *      2) Наименование на казахском
     *      3) Действия (совершаемые над записью: редактирование и удаление)
     *
     *  dataIndex и key - ключи, по которым производится поиск данных из принимаемых параметров
     */
    const columns = [
        {
            title: t('Наименование на русском'),
            dataIndex: 'name_ru',
            key: 'name_ru',
            render: (text, item) => <NavLink to={`/${type}/${item.id}`}>{text}</NavLink>,
        },
        {
            title: t('Наименование на казахском'),
            dataIndex: 'name_kz',
            key: 'name_kz',
            render: (text, item) => <NavLink to={`/${type}/${item.id}`}>{text}</NavLink>,
        },
        {
            title: t('actions'),
            key: 'action',
            dataIndex: 'actions',
            render: (action, item) => {
                if (isAdmin) {
                    return (
                        <div>
                            <Button
                                style={{margin: '0 5px'}}
                                shape="circle"
                                icon={<EditOutlined/>}
                                type={"primary"}
                            />
                            <Button
                                className={classes.button}
                                onClick={() => deleteItem(item)}
                                shape="circle"
                                icon={<DeleteOutlined/>}
                                type={"primary"}
                            />
                        </div>
                    )
                }
            }
        }
    ];

    return (
        <div className={'content'}>
            {isAdmin && (
                <div className={'addButtonBlock'}>
                    <NavLink to={GetAddAddress(type)}>
                        <Button
                            type={'danger'}
                            icon={<PlusOutlined/>}
                        >
                            {t(GetAddButtonText(type))}
                        </Button>
                    </NavLink>
                </div>
            )}
            <Spin spinning={isFetching}>
                <Table
                    columns={columns}
                    dataSource={directory}
                    rowKey={'id'}
                />
            </Spin>
        </div>
    )
};

export default Directory;