import {Button, Form, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Subjects = (props) => {

    const {t} = useTranslation();
    const [form] = Form.useForm();

    let fromState = {
        specialization: props.wps.specialization,
        semester: props.wps.semester
    };

    console.log(fromState);

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

    const subjectsColumns = [
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

    const getSubjects = () => {
        props.getSubjects(fromState)
    };

    return (
        <div style={{textAlign: 'left'}}>
            <Spin spinning={props.wps.isFetching}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                >
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
                        onClick={getSubjects}
                        type={"danger"}
                    >
                        Получить данные
                    </Button>
                    {props.wps.subjects.length !== 0 &&
                    <>
                        <div>Всего предметов: {props.wps.subjects.length}</div>
                        <Table
                            columns={subjectsColumns}
                            dataSource={props.wps.subjects}
                            rowKey={'id'}
                        />
                    </>}
                </Form>
            </Spin>
        </div>
    )
};

export default Subjects;