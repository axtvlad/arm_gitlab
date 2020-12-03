import {Button, Form, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Exams = ({wps}) => {
    const {t} = useTranslation();
    const {Option} = Select;
    const [form] = Form.useForm();

    const fromState = {
        specialization: wps.specialization
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

    const examsColumns = [
        {
            title: t('exam'),
            dataIndex: 'exam',
            key: 'exam'
        },
        {
            title: t('semester'),
            dataIndex: 'semester',
            key: 'semester'
        }
    ];

    const updateSpecialization = (e) => {
        updateSpecialization(e);
    };

    const getExams = () => {
        getExams(fromState);
    }

    return (
        <div style={{textAlign: 'left'}}>
            <Spin spinning={wps.isFetching}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                >
                    <div>
                        <Select
                            defaultValue={wps.specialization}
                            style={{width: 400, margin: 10}}
                            onChange={(e) => {
                                updateSpecialization(e)
                            }}
                        >
                            <Option value={specialization.operator.key}>{specialization.operator.name}</Option>
                            <Option value={specialization.programmer.key}>{specialization.programmer.name}</Option>
                        </Select>
                        <Button
                            style={{margin: 10}}
                            onClick={getExams}
                            type={"danger"}
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
                        </>}
                    </div>
                </Form>
            </Spin>
        </div>
    )
};

export default Exams;