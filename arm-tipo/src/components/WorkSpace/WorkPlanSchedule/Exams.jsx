import {Button, Form, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Exams = (props) => {

    const {t} = useTranslation();
    const [form] = Form.useForm();

    let fromState = {
        specialization: props.wps.specialization
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
        props.updateSpecialization(e);
    };

    const getExams = () => {
        props.getExams(fromState);
    }

    return (
        <div style={{textAlign: 'left'}}>
            <Spin spinning={props.wps.isFetching}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                >
                    <div>
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
                        <Button
                            style={{margin: 10}}
                            onClick={getExams}
                            type={"danger"}
                        >
                            {t('getData')}
                        </Button>
                        {props.wps.exams.length !== 0 &&
                        <>
                            <div> { t('examsCount') + ':'} {props.wps.exams.length}</div>
                            <Table
                                columns={examsColumns}
                                dataSource={props.wps.exams}
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