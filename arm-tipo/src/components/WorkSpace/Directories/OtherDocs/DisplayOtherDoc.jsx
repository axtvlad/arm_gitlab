import {useTranslation} from "react-i18next";
import {Descriptions} from "antd";
import i18n from "../../../../i18n";
import React from "react";

const DisplayOtherDoc = (props) => {

    const {t} = useTranslation();

    console.log(props.currentOtherDoc)

    return (
        <div className={'content'}>
            {props.currentOtherDoc && (
                <Descriptions
                    title={t(props.directory) + ': ' + props.currentOtherDoc[0].name_ru}
                    column={1}
                    colon={true}
                >
                    {i18n.language === 'ru' ? (<Descriptions.Item
                            label={t('docNameRu')}
                        >
                            {props.currentOtherDoc[0].name_ru}
                        </Descriptions.Item>) :
                        <Descriptions.Item
                            label={t('docNameKz')}
                        >
                            {props.currentOtherDoc[0].name_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('fileRu')}
                    >
                        <a href={props.currentOtherDoc[0].file_ru}>
                            Документ (ru)
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('fileKz')}
                    >
                        <a href={props.currentOtherDoc[0].file_kz}>
                            Документ (kz)
                        </a>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </div>
    )
};


export default DisplayOtherDoc