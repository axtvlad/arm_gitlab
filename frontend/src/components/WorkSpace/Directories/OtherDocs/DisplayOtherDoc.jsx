import {useTranslation} from "react-i18next";
import {Descriptions} from "antd";
import i18n from "../../../../i18n";
import React from "react";

const DisplayOtherDoc = ({currentOtherDoc, directory}) => {
    const {t} = useTranslation();

    return (
        <div className={'content'}>
            {currentOtherDoc && (
                <Descriptions
                    title={t(directory) + ': ' + currentOtherDoc.name_ru}
                    column={1}
                    colon={true}
                >
                    {i18n.language === 'ru' ? (<Descriptions.Item
                            label={t('docNameRu')}
                        >
                            {currentOtherDoc.name_ru}
                        </Descriptions.Item>) :
                        <Descriptions.Item
                            label={t('docNameKz')}
                        >
                            {currentOtherDoc.name_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('fileRu')}
                    >
                        <a href={currentOtherDoc.file_ru}>
                            Документ (ru)
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('fileKz')}
                    >
                        <a href={currentOtherDoc.file_kz}>
                            Документ (kz)
                        </a>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </div>
    )
};

export default DisplayOtherDoc