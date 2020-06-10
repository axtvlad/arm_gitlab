import {Button, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Directory = (props) => {

    const {t} = useTranslation();

    let fromState = {
        specialization: props.wps.specialization,
        semester: props.wps.semester
    }

    console.log(fromState)

    const specialization = {
        programmer: {
            key: 'programmer',
            name: t('programmer')
        },
        operator: {
            key: 'operator',
            name: t('operator')
        }
    }
    const {Option} = Select;

    const columns = [
        {
            title: t('subject'),
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title: t('hoursPerWeek'),
            dataIndex: 'hours',
            key: 'hours'
        }
    ];

    const updateSpecialization = (e) => {
        props.updateSpecialization(e);
    };

    const updateSemester = (e) => {
        props.updateSemester(e);
    };

    const getData = () => {
        props.getSubjectsHours(fromState)
    }

    return (
        <div className={'content'} style={{textAlign: 'left'}}>
            <Button
                style={{margin: 10}}
                href={'https://drive.google.com/file/d/1ry9omQqImJj2_uzqxOEagD4F12AYWH7v/view?usp=sharing'}
                target={'_blank'}
            >
                {t("downloadRup")}
            </Button>
            <Select
                defaultValue={props.wps.specialization}
                style={{width: 400, margin: 10}}
                onChange={(e) => {
                    updateSpecialization(e)
                }}
            >
                <Option value={specialization.operator.key}>{specialization.operator.name}</Option>
                <Option value={specialization.programmer.key}>{specialization.programmer.name}</Option>
            </Select>
            <Select
                style={{margin: 10}}
                defaultValue={props.wps.semester}
                onChange={(e) => {
                    updateSemester(e)
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
            <Button
                style={{margin: 10}}
                onClick={getData}
                type={"danger"}
            >
                Получить данные
            </Button>
            {props.wps.subjects.length ?
                <>
                    <div>Всего предметов: {props.wps.subjects.length}</div>
                    <Table
                        columns={columns}
                        dataSource={props.wps.subjects}
                        rowKey={'id'}
                    />
                </>
                : <Spin/>}
        </div>
    )
};

export default Directory;