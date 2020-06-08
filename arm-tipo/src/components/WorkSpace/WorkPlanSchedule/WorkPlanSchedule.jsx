import {Button, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const specialization = {
    programmer: {
        key: 'programmer',
        name: 'Техник-программист'
    },
    operator: {
        key: 'operator',
        name: 'Специалист по обработке цифровой информации'
    }
}

const Directory = (props) => {
    const {t} = useTranslation();

    const {Option} = Select;

    const columns = [
        {
            title: 'Дисциплина',
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title: 'часов в неделю',
            dataIndex: 'hours',
            key: 'hours'
        }
    ];

    return (
        <div className={'content'} style={{textAlign: 'left'}}>
            <Button
                style={{margin: 10}}
                href={'https://drive.google.com/file/d/1ry9omQqImJj2_uzqxOEagD4F12AYWH7v/view?usp=sharing'}
                target={'_blank'}
            >
                Скачать РУП ВТ и ПО 2020
            </Button>
            <Select
                defaultValue={specialization.operator.key} s
                tyle={{width: 400, margin: 10}}
                onChange={() => {
                }}
            >
                <Option value={specialization.operator.key}>{specialization.operator.name}</Option>
                <Option value={specialization.programmer.key}>{specialization.programmer.name}</Option>
            </Select>
            <Select
                style={{margin: 10}}
                defaultValue={1}
                onChange={() => {
                }}
            >
                <Option value={1}>1 семестр</Option>
                <Option value={2}>2 семестр</Option>
                <Option value={3}>3 семестр</Option>
                <Option value={4}>4 семестр</Option>
                <Option value={5}>5 семестр</Option>
                <Option value={6}>6 семестр</Option>
                <Option value={7}>7 семестр</Option>
                <Option value={8}>8 семестр</Option>
            </Select>
            <Spin spinning={props.wps.isFetching}>
                <Table
                    columns={columns}
                    dataSource={props.wps.subjects}
                    rowKey={'id'}
                />
            </Spin>
        </div>
    )
};

export default Directory;