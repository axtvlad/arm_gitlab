import {Button, Form, Radio, Select, Spin, Table} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";
import {SearchMode} from "../../common/utils/constants";
import {updateCourse} from "../../../redux/Reducers/WorkPlanScheduleReducer";

const Directory = (props) => {

    const {t} = useTranslation();

    const [form] = Form.useForm();


    let fromState = {
        plan: props.wps.plan,
        schedule: props.wps.schedule,
        specialization: props.wps.specialization,
        semester: props.wps.semester,
        searchMode: props.wps.searchMode
    };

    console.log(fromState);
    form.setFieldsValue(fromState);
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

    const search = () => {
        switch (fromState.searchMode) {
            case SearchMode.PLAN:
                return props.getSearchResult(fromState.searchMode, fromState.plan);
            case SearchMode.SCHEDULE:
                return props.getSearchResult(fromState.searchMode, fromState.schedule);
            default:
                return props.getSearchResult(fromState.searchMode, fromState.plan);
        }
    };

    const planColumns = [
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

    const scheduleColumns = [

        {
            title: t('month'),
            dataIndex: 'month',
            key: 'month'
        },
        {
            title: t('days'),
            dataIndex: 'days',
            key: 'days'
        }
    ];

    const updateSpecialization = (e) => {
        props.updateSpecialization(e);
    };

    const updateSemester = (e) => {
        props.updateSemester(e);
    };

    const getSubjectsHoursData = () => {
        props.getSubjectsHours(fromState)
    };

    /*const getScheduleData = () => {               нужен API
        props.getSchedule(fromState)
    };*/

    const changeSearchMode = (value) => {
        props.setSearchMode(value.target.value);
    };

    return (
        <div className={'content'} style={{textAlign: 'left'}}>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
            >
                <Button
                    style={{margin: 10}}
                    href={'https://drive.google.com/file/d/1ry9omQqImJj2_uzqxOEagD4F12AYWH7v/view?usp=sharing'}
                    target={'_blank'}
                >
                    {t("downloadRup")}
                </Button>
                <Form.Item
                    name={'searchMode'}
                    label={t('searchMode')}
                    onFinish={search}
                >
                    <Radio.Group onChange={changeSearchMode}>
                        <Radio.Button value={SearchMode.PLAN}>{t('searchByPlan')}</Radio.Button>
                        <Radio.Button value={SearchMode.SCHEDULE}>{t('searchBySchedule')}</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                {props.wps.searchMode === SearchMode.PLAN &&
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
                        onClick={getSubjectsHoursData}
                        type={"danger"}
                    >
                        Получить данные
                    </Button>
                    {props.wps.subjects.length ?
                        <>
                            <div>Всего предметов: {props.wps.subjects.length}</div>
                            <Table
                                columns={planColumns}
                                dataSource={props.wps.subjects}
                                rowKey={'id'}
                            />
                        </>
                        : <Spin/>}
                </div>}
                {props.wps.searchMode === SearchMode.SCHEDULE &&
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
                    <Select
                        style={{margin: 10}}
                        defaultValue={props.wps.semester}
                        onChange={(e) => {
                            updateCourse(e)
                        }}
                    >
                        <Option value={1}>1 курс</Option>
                        <Option value={2}>2 курс</Option>
                        <Option value={3}>3 курс</Option>
                        <Option value={4}>4 курс</Option>
                    </Select>
                    <Button
                        style={{margin: 10}}
                        onClick={getSubjectsHoursData} //заглушка
                        type={"danger"}
                    >
                        Получить данные
                    </Button>
                    {props.wps.schedule.length ?
                        <>
                            <div>Всего предметов: {props.wps.schedule.length}</div>
                            <Table
                                columns={scheduleColumns}
                                dataSource={props.wps.schedule}
                                rowKey={'id'}
                            />
                        </>
                        : <Spin/>}
                </div>
                }
            </Form>
        </div>
    )
};

export default Directory;