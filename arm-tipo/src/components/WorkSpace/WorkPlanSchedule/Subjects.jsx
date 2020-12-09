import {Button, Form, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Subjects = ({wps, getSubjects}) => {
    const {t} = useTranslation();
    const {Option} = Select;

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

    const onSubmit = (formData) => {
        getSubjects(formData)
    };

    return (
        <div style={{textAlign: 'left'}}>
            <Spin spinning={wps.isFetching}>
                <Form
                    onFinish={onSubmit}
                    name="advanced_search"
                    initialValues={{specialization: wps.specialization, semester: wps.semester}}
                >
                    <Form.Item name={'specialization'}>
                        <Select style={{width: 400, margin: 10}}>
                            <Option value={specialization.operator.key}>{specialization.operator.name}</Option>
                            <Option value={specialization.programmer.key}>{specialization.programmer.name}</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name={'semester'}>
                        <Select
                            style={{margin: 10}}
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
                    </Form.Item>

                    <Button
                        style={{margin: 10}}
                        type={"danger"}
                        htmlType={'submit'}
                        block
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