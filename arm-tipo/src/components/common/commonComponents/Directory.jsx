import {NavLink} from "react-router-dom";
import {Button, notification, Spin, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import React from "react";
import {useTranslation} from "react-i18next";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {GetAddAddress} from "../utils/AddPagesRoutes";
import {GetAddButtonText} from "../utils/AddButtonText";

const Directory = (props) => {

    const {t} = useTranslation();

    const deleteItem = (item) => {
        props.removeItemById(item.id);

        notification['success']({
            message: 'Удалено!',
            description: 'Запись "' + item.name_ru + '" была успешно удалена!',
            placement: 'bottomRight'
        });
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
            title: t('russianName'),
            dataIndex: 'name_ru',
            key: 'name_ru',
            render: (text, item) => <NavLink to={'/' + props.type + '/' + item.id}>{text}</NavLink>,
        },
        {
            title: t('kazakhName'),
            dataIndex: 'name_kz',
            key: 'name_kz',
            render: (text, item) => <NavLink to={'/' + props.type + '/' + item.id}>{text}</NavLink>,
        },
        {
            title: t('actions'),
            key: 'action',
            dataIndex: 'actions',
            render: (action, item) => {
                if (props.isAdmin) {
                    return (
                        <div>
                            {/*<Button style={{margin: '0 5px'}} shape="circle" icon={<EditOutlined/>} type={"primary"}/>*/}
                            <Button
                                style={{margin: '0 5px'}}
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
            {props.isAdmin && (
                <div className={'addButtonBlock'}>
                    <NavLink to={GetAddAddress(props.type)}>
                        <Button
                            type={'danger'}
                            icon={<PlusOutlined/>}
                        >
                            {t(GetAddButtonText(props.type))}
                        </Button>
                    </NavLink>
                </div>
            )}
            <Spin spinning={props.isFetching}>
                <Table
                    columns={columns}
                    dataSource={props.directory}
                    rowKey={'id'}
                />
            </Spin>
        </div>
    )
};

export default Directory;