import {Button, Form, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Exams = ({wps, getExams}) => {
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

    const examsColumns = [
        {
            title: t('exam'),
            dataIndex: 'exam',
            key: 'exam'
        }, {
            title: t('semester'),
            dataIndex: 'semester',
            key: 'semester'
        }
    ];

    const onSubmit = (formData) => {
        getExams(formData);
    }

    return (
        <div style={{textAlign: 'left'}}>
            <Spin spinning={wps.isFetching}>
                <Form
                    name="advanced_search"
                    onFinish={onSubmit}
                    initialValues={{specialization: specialization.operator.key}}
                >
                    <Form.Item
                        name={'specialization'}
                    >
                        <Select
                            style={{width: 400, margin: 10}}
                        >
                            <Option value={specialization.operator.key}>{specialization.operator.name}</Option>
                            <Option value={specialization.programmer.key}>{specialization.programmer.name}</Option>
                        </Select>
                    </Form.Item>

                    <Button
                        style={{margin: 10}}
                        htmlType={'submit'}
                        type={"danger"}
                        block
                    >
                        {t('getData')}
                    </Button>

                    {wps.exams.length !== 0 &&
                    <>
                        <div> {t('examsCount') + ':'} {wps.exams.length}</div>
                        <Table
                            columns={examsColumns}
                            dataSource={wps.exams}
                            rowKey={'id'}
                        />
                    </>
                    }
                </Form>
            </Spin>
        </div>
    )
};

export default Exams;