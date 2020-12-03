import {Button, Form, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Subjects = ({wps, updateSpecialization, updateSemester, getSubjects}) => {
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const {Option} = Select;

    const fromState = {
        specialization: wps.specialization,
        semester: wps.semester
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

    const updateSpecializationEv = (e) => {
        updateSpecialization(e);
    };

    const updateSemesterEv = (e) => {
        updateSemester(e);
    };

    const getSubjectsEv = () => {
        getSubjects(fromState)
    };

    return (
        <div style={{textAlign: 'left'}}>
            <Spin spinning={wps.isFetching}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                >
                    <Select
                        defaultValue={wps.specialization}
                        style={{width: 400, margin: 10}}
                        onChange={(e) => {
                            updateSpecializationEv(e)
                        }}
                    >
                        <Option value={specialization.operator.key}>{specialization.operator.name}</Option>
                        <Option value={specialization.programmer.key}>{specialization.programmer.name}</Option>
                    </Select>
                    <Select
                        style={{margin: 10}}
                        defaultValue={wps.semester}
                        onChange={(e) => {
                            updateSemesterEv(e)
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
                        onClick={getSubjectsEv}
                        type={"danger"}
                    >
                        {t('getData')}
                    </Button>
                    {wps.subjects.length !== 0 &&
                    <>
                        <div>{t('subjectsCount')}{wps.subjects.length}</div>
                        <Table
                            columns={subjectsColumns}
                            dataSource={wps.subjects}
                            rowKey={'id'}
                        />
                    </>}
                </Form>
            </Spin>
        </div>
    )
};

export default Subjects;