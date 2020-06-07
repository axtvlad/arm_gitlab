import React from 'react';
import {useTranslation} from "react-i18next";
import {Checkbox, Descriptions} from "antd";

const DisplayMainDoc = (props) => {

    const {t} = useTranslation();

    let department, status, type;

    if (props.currentMainDoc[0].department_id) {
        department = props.departments.find(department => department.id === props.currentMainDoc[0].department_id);
    }
    if (props.currentMainDoc[0].status_id) {
        status = props.statuses.find(status => status.id === props.currentMainDoc[0].status_id);
    }
    if (props.currentMainDoc[0].type_id) {
        type = props.types.find(type => type.id === props.currentMainDoc[0].type_id);
    }

    return (
        <div className={'content'}>
            {props.currentMainDoc && (
                <Descriptions
                    title={t(props.directory) + ': ' + props.currentMainDoc[0].name_ru}
                    column={1}
                    colon={true}
                >
                    <Descriptions.Item
                        label={t('docNameRu')}
                    >
                        {props.currentMainDoc[0].name_ru && props.currentMainDoc[0].name_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('docNameKz')}
                    >
                        {props.currentMainDoc[0].name_kz && props.currentMainDoc[0].name_kz}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('number')}
                    >
                        {props.currentMainDoc[0].num && props.currentMainDoc[0].num}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('beginDate')}
                    >
                        {props.currentMainDoc[0].begin_date && props.currentMainDoc[0].begin_date}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('finishDate')}
                    >
                        {props.currentMainDoc[0].finish_date && props.currentMainDoc[0].finish_date}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('roleNameRu')}
                    >
                        {props.currentMainDoc[0].department_id && department.name_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('cityNameRu')}
                    >
                        {props.currentMainDoc[0].status_id && status.name_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('gender')}
                    >
                        {props.currentMainDoc[0].type_id && type.name_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('headerRu')}
                    >
                        {props.currentMainDoc[0].header_ru && props.currentMainDoc[0].header_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('headerKz')}
                    >
                        {props.currentMainDoc[0].header_kz && props.currentMainDoc[0].header_kz}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('fileRu')}
                    >
                        {props.currentMainDoc[0].file_ru && props.currentMainDoc[0].file_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('fileKz')}
                    >
                        {props.currentMainDoc[0].file_kz && props.currentMainDoc[0].file_kz}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('descriptionRu')}
                    >
                        {props.currentMainDoc[0].description_ru && props.currentMainDoc[0].description_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('descriptionKz')}
                    >
                        {props.currentMainDoc[0].description_kz && props.currentMainDoc[0].description_kz}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('textRu')}
                    >
                        {props.currentMainDoc[0].text_ru && props.currentMainDoc[0].text_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('textKz')}
                    >
                        {props.currentMainDoc[0].text_kz && props.currentMainDoc[0].text_kz}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('tags')}
                    >
                        {props.currentMainDoc[0].tags && props.currentMainDoc[0].tags}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </div>
    )
};

export default DisplayMainDoc;