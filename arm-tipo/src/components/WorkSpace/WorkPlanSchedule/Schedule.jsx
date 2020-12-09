import {Button, Form, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";
import {WpsScheduleKeys} from "../../common/utils/constants";

const Schedule = ({wps, getSchedule}) => {
    const {t} = useTranslation();
    const {Option} = Select;

    const scheduleColumns = [
        {
            title: t('month'),
            dataIndex: 'month',
            key: 'month'
        },
        {
            title: t('dayFrom'),
            dataIndex: 'dayFrom',
            key: 'dayFrom'
        },
        {
            title: t('dayTo'),
            dataIndex: 'dayTo',
            key: 'dayTo'
        }
    ];

    const onSubmit = (formData) => {
        console.log(formData)
        getSchedule(formData);
    }

    return (
        <div style={{textAlign: 'left'}}>
            <Spin spinning={wps.isFetching}>
                <Form
                    onFinish={onSubmit}
                    name="advanced_search"
                    initialValues={{key: wps.scheduleKey, course: wps.course}}
                >
                    <Form.Item
                        name={'key'}
                    >
                        <Select
                            style={{width: 400, margin: 10}}
                        >
                            <Option value={WpsScheduleKeys.k}>{t('vacation')}</Option>
                            <Option value={WpsScheduleKeys.bm}>{t('baseModule')}</Option>
                            <Option value={WpsScheduleKeys.dp}>{t('diplomaProject')}</Option>
                            <Option value={WpsScheduleKeys.ia}>{t('finalExamination')}</Option>
                            <Option value={WpsScheduleKeys.moo}>{t('moo')}</Option>
                            <Option value={WpsScheduleKeys.pa}>{t('intermediateExamination')}</Option>
                            <Option value={WpsScheduleKeys.pdn}>{t('holidays')}</Option>
                            <Option value={WpsScheduleKeys.pm}>{t('profModule')}</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name={'course'}
                    >
                        <Select
                            style={{margin: 10}}
                            value={wps.course}
                        >
                            <Option value={1}>1 курс</Option>
                            <Option value={2}>2 курс</Option>
                            <Option value={3}>3 курс</Option>
                            <Option value={4}>4 курс</Option>
                        </Select>

                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{margin: 10}}
                            type={"danger"}
                            block
                            htmlType={'submit'}
                        >
                            {t('getData')}
                        </Button>
                    </Form.Item>

                    {wps.schedule.length !== 0 &&
                    <Table
                        columns={scheduleColumns}
                        dataSource={wps.schedule}
                        rowKey={'id'}
                    />
                    }
                </Form>
            </Spin>
        </div>
    )
};

export default Schedule;