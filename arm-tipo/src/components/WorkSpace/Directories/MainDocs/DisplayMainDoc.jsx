import React from 'react';
import {useTranslation} from "react-i18next";
import {Descriptions} from "antd";
import i18n from "../../../../i18n";

const DisplayMainDoc = ({currentMainDoc, departments, statuses, types, directory}) => {
    const {t} = useTranslation();

    let department, status, type;

    if (currentMainDoc[0].department_id) {
        department = departments.find(department => department.id === currentMainDoc[0].department_id);
    }
    if (currentMainDoc[0].status_id) {
        status = statuses.find(status => status.id === currentMainDoc[0].status_id);
    }
    if (currentMainDoc[0].type_id) {
        type = types.find(type => type.id === currentMainDoc[0].type_id);
    }

    return (
        <div className={'content'}>
            {currentMainDoc && (
                <Descriptions
                    title={`${t(directory)}: ${currentMainDoc[0].name_ru}`}
                    column={1}
                    colon={true}
                >
                    {i18n.language === 'ru' ? (<Descriptions.Item
                            label={t('docNameRu')}
                        >
                            {currentMainDoc[0].name_ru}
                        </Descriptions.Item>) :
                        <Descriptions.Item
                            label={t('docNameKz')}
                        >
                            {currentMainDoc[0].name_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('number')}
                    >
                        {currentMainDoc[0].num}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('published')}
                    >
                        {currentMainDoc[0].begin_date}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('finished')}
                    >
                        {currentMainDoc[0].finish_date}
                    </Descriptions.Item>
                    {i18n.language === 'ru'
                        ? <Descriptions.Item
                            label={t('departmentNameRu')}
                        >
                            {currentMainDoc[0].department_id && department.name_ru}
                        </Descriptions.Item>
                        : <Descriptions.Item
                            label={t('departmentNameKz')}
                        >
                            {currentMainDoc[0].department_id && department.name_kz}
                        </Descriptions.Item>
                    }
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('statusNameRu')}
                        >
                            {currentMainDoc[0].status_id && status.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('statusNameKz')}
                        >
                            {currentMainDoc[0].status_id && status.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('typeNameRu')}
                        >
                            {currentMainDoc[0].type_id && type.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('typeNameKz')}
                        >
                            {currentMainDoc[0].type_id && type.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('headerRu')}
                        >
                            {currentMainDoc[0].header_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('headerKz')}
                        >
                            {currentMainDoc[0].header_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('fileRu')}
                    >
                        <a href={currentMainDoc[0].file_ru}>
                            Документ (ru)
                        </a>

                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('fileKz')}
                    >
                        {/*временно*/}
                        <a href={currentMainDoc[0].file_ru}>
                            Документ (kz)
                        </a>
                    </Descriptions.Item>
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('descriptionRu')}
                        >
                            {currentMainDoc[0].description_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('descriptionKz')}
                        >
                            {currentMainDoc[0].description_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('textRu')}
                        >
                            {currentMainDoc[0].text_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('textKz')}
                        >
                            {currentMainDoc[0].text_kz}
                        </Descriptions.Item>}
                </Descriptions>
            )}
        </div>
    )
};

export default DisplayMainDoc;