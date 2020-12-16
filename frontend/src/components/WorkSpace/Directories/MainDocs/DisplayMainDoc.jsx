import React from 'react';
import {useTranslation} from "react-i18next";
import {Descriptions} from "antd";
import i18n from "../../../../i18n";

const DisplayMainDoc = ({currentMainDoc, departments, statuses, types, directory}) => {
    const {t} = useTranslation();

    let department, status, type;

    if (currentMainDoc.department_id) {
        department = departments.find(department => department.id === currentMainDoc.department_id);

        if (!department) {
            department.name_ru = ''
            department.name_kz = ''
        }
    }
    if (currentMainDoc.status_id) {
        status = statuses.find(status => status.id === currentMainDoc.status_id);

        if (!status) {
            status.name_ru = ''
            status.name_kz = ''
        }
    }
    if (currentMainDoc.type_id) {
        type = types.find(type => type.id === currentMainDoc.type_id);

        if (!type) {
            type = {
                name_ru: '',
                name_kz: ''
            }
        }
    }

    return (
        <div className={'content'}>
            {currentMainDoc && (
                <Descriptions
                    title={`${t(directory)}: ${currentMainDoc.name_ru}`}
                    column={1}
                    colon={true}
                >
                    {i18n.language === 'ru' ? (<Descriptions.Item
                            label={t('docNameRu')}
                        >
                            {currentMainDoc.name_ru}
                        </Descriptions.Item>) :
                        <Descriptions.Item
                            label={t('docNameKz')}
                        >
                            {currentMainDoc.name_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('number')}
                    >
                        {currentMainDoc.num}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('published')}
                    >
                        {currentMainDoc.begin_date}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('finished')}
                    >
                        {currentMainDoc.finish_date}
                    </Descriptions.Item>
                    {i18n.language === 'ru'
                        ? <Descriptions.Item
                            label={t('departmentNameRu')}
                        >
                            {currentMainDoc.department_id && department.name_ru}
                        </Descriptions.Item>
                        : <Descriptions.Item
                            label={t('departmentNameKz')}
                        >
                            {currentMainDoc.department_id && department.name_kz}
                        </Descriptions.Item>
                    }
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('statusNameRu')}
                        >
                            {currentMainDoc.status_id && status.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('statusNameKz')}
                        >
                            {currentMainDoc.status_id && status.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('typeNameRu')}
                        >
                            {currentMainDoc.type_id && type.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('typeNameKz')}
                        >
                            {currentMainDoc.type_id && type.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('headerRu')}
                        >
                            {currentMainDoc.header_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('headerKz')}
                        >
                            {currentMainDoc.header_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('fileRu')}
                    >
                        <a href={currentMainDoc.file_ru}>
                            Документ (ru)
                        </a>

                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('fileKz')}
                    >
                        {/*временно*/}
                        <a href={currentMainDoc.file_ru}>
                            Документ (kz)
                        </a>
                    </Descriptions.Item>
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('descriptionRu')}
                        >
                            {currentMainDoc.description_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('descriptionKz')}
                        >
                            {currentMainDoc.description_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('textRu')}
                        >
                            {currentMainDoc.text_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('textKz')}
                        >
                            {currentMainDoc.text_kz}
                        </Descriptions.Item>}
                </Descriptions>
            )}
        </div>
    )
};

export default DisplayMainDoc;