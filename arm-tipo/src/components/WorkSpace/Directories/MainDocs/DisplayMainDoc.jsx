import React from 'react';
import {useTranslation} from "react-i18next";
import {Descriptions} from "antd";
import i18n from "../../../../i18n";

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
                    {i18n.language === 'ru' ? (<Descriptions.Item
                            label={t('docNameRu')}
                        >
                            {props.currentMainDoc[0].name_ru}
                        </Descriptions.Item>) :
                        <Descriptions.Item
                            label={t('docNameKz')}
                        >
                            {props.currentMainDoc[0].name_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('number')}
                    >
                        {props.currentMainDoc[0].num}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('published')}
                    >
                        {props.currentMainDoc[0].begin_date}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('finished')}
                    >
                        {props.currentMainDoc[0].finish_date}
                    </Descriptions.Item>
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('departmentNameRu')}
                        >
                            {props.currentMainDoc[0].department_id && department.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('departmentNameKz')}
                        >
                            {props.currentMainDoc[0].department_id && department.name_kz}
                        </Descriptions.Item>
                    }
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('statusNameRu')}
                        >
                            {props.currentMainDoc[0].status_id && status.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('statusNameKz')}
                        >
                            {props.currentMainDoc[0].status_id && status.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('typeNameRu')}
                        >
                            {props.currentMainDoc[0].type_id && type.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('typeNameKz')}
                        >
                            {props.currentMainDoc[0].type_id && type.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('headerRu')}
                        >
                            {props.currentMainDoc[0].header_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('headerKz')}
                        >
                            {props.currentMainDoc[0].header_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('fileRu')}
                    >
                        <a href={props.currentMainDoc[0].file_ru}>
                            Документ (ru)
                        </a>

                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('fileKz')}
                    >
                        {/*временно*/}
                        <a href={props.currentMainDoc[0].file_ru}>
                            Документ (kz)
                        </a>
                    </Descriptions.Item>
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('descriptionRu')}
                        >
                            {props.currentMainDoc[0].description_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('descriptionKz')}
                        >
                            {props.currentMainDoc[0].description_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('textRu')}
                        >
                            {props.currentMainDoc[0].text_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('textKz')}
                        >
                            {props.currentMainDoc[0].text_kz}
                        </Descriptions.Item>}
                </Descriptions>
            )}
        </div>
    )
};


export default DisplayMainDoc;