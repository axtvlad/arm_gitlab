import {Button, Form, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";
import {WpsScheduleKeys} from "../../common/utils/constants";

const Schedule = (props) => {

    const {t} = useTranslation();
    const [form] = Form.useForm();

    let fromState = {
        schedule: props.wps.schedule,
        specialization: props.wps.specialization,
        course: props.wps.course,
        key: props.wps.scheduleKey
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

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

    const updateScheduleKey = (e) => {
        props.updateScheduleKey(e);
    };

    const updateCourse = (e) => {
        props.updateCourse(e);
    }

    const getSchedule = () => {
        props.getSchedule(fromState);
    }
    return (
        <div style={{textAlign: 'left'}}>
            <Spin spinning={props.wps.isFetching}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                >
                    <Select
                        value={props.wps.scheduleKey}
                        style={{width: 400, margin: 10}}
                        onChange={updateScheduleKey}
                    >
                        <Option value={WpsScheduleKeys.k}>{WpsScheduleKeys.k}</Option>
                        <Option value={WpsScheduleKeys.bm}>{WpsScheduleKeys.bm}</Option>
                        <Option value={WpsScheduleKeys.dp}>{WpsScheduleKeys.dp}</Option>
                        <Option value={WpsScheduleKeys.ia}>{WpsScheduleKeys.ia}</Option>
                        <Option value={WpsScheduleKeys.moo}>{WpsScheduleKeys.moo}</Option>
                        <Option value={WpsScheduleKeys.pa}>{WpsScheduleKeys.pa}</Option>
                        <Option value={WpsScheduleKeys.pdn}>{WpsScheduleKeys.pdn}</Option>
                        <Option value={WpsScheduleKeys.pm}>{WpsScheduleKeys.pm}</Option>
                    </Select>
                    <Select
                        style={{margin: 10}}
                        value={props.wps.course}
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
                        Получить данные
                    </Button>
                    {props.wps.schedule.length !== 0 &&
                    <Table
                        columns={scheduleColumns}
                        dataSource={props.wps.schedule}
                        rowKey={'id'}
                    />}
                </Form>
            </Spin>
        </div>
    )
};

export default Schedule;