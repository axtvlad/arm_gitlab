import {Button, Form, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";
import {WpsScheduleKeys} from "../../common/utils/constants";

const Schedule = ({wps}) => {
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const {Option} = Select;

    const fromState = {
        schedule: wps.schedule,
        specialization: wps.specialization,
        course: wps.course,
        key: wps.scheduleKey
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

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

    const updateScheduleKey = (e) => {
        updateScheduleKey(e);
    };

    const updateCourse = (e) => {
        updateCourse(e);
    }

    const getSchedule = () => {
        getSchedule(fromState);
    }

    return (
        <div style={{textAlign: 'left'}}>
            <Spin spinning={wps.isFetching}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                >
                    <Select
                        value={wps.scheduleKey}
                        style={{width: 400, margin: 10}}
                        onChange={updateScheduleKey}
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
                    <Select
                        style={{margin: 10}}
                        value={wps.course}
                        onChange={updateCourse}
                    >
                        <Option value={1}>1 курс</Option>
                        <Option value={2}>2 курс</Option>
                        <Option value={3}>3 курс</Option>
                        <Option value={4}>4 курс</Option>
                    </Select>
                    <Button
                        style={{margin: 10}}
                        onClick={getSchedule}
                        type={"danger"}
                    >
                        {t('getData')}
                    </Button>
                    {wps.schedule.length !== 0 ?
                        <Table
                            columns={scheduleColumns}
                            dataSource={wps.schedule}
                            rowKey={'id'}
                        /> :
                        <Table
                            columns={scheduleColumns}
                            rowKey={'id'}
                            dataSource={wps.schedule}
                            loading={false}
                        />
                    }
                </Form>
            </Spin>
        </div>
    )
};

export default Schedule;