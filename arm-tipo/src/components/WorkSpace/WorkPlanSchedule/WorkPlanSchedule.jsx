import {Button, Form, Radio} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";
import {WpsMode} from "../../common/utils/constants";
import SESContainer from "./SESContainer";

const WorkPlanSchedule = ({setWpsMode, wpsMode}) => {
    const {t} = useTranslation();

    const changeWpsMode = (value) => {
        setWpsMode(value.target.value);
    }

    return (
        <div className={'content'} style={{textAlign: 'left'}}>
            <Form
                name="form"
                className="ant-advanced-search-form"
            >
                <Button
                    style={{margin: 10}}
                    href={'https://drive.google.com/file/d/1ry9omQqImJj2_uzqxOEagD4F12AYWH7v/view?usp=sharing'}
                    target={'_blank'}
                >
                    {t("downloadRup")}
                </Button>
                <Radio.Group onChange={changeWpsMode} value={wpsMode}>
                    <Radio.Button value={WpsMode.SUBJECTS}>{t('findSubjects')}</Radio.Button>
                    <Radio.Button value={WpsMode.EXAMS}>{t('findExams')}</Radio.Button>
                    <Radio.Button value={WpsMode.SCHEDULE}>{t('findSchedule')}</Radio.Button>
                </Radio.Group>
            </Form>
            <SESContainer/>
        </div>
    )
};

export default WorkPlanSchedule;