import {Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Genders = (props) => {
    const {t} = useTranslation();

    const columns = [
        {
            title: t('russianName'),
            dataIndex: 'name_ru',
            key: 'name_ru',
            render: text => <span>{text}</span>,
        },
        {
            title: t('kazakhName'),
            dataIndex: 'name_kz',
            key: 'name_kz',
            render: text => <span>{text}</span>,
        }
    ];

    return (
        <div className={'content'}>
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

export default Genders;