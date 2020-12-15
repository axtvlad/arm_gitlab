import React from 'react'
import {Descriptions, Spin} from "antd";
import {useTranslation} from "react-i18next";
import i18n from "../../../../i18n";

const DisplayFaq = ({isFetching, currentItem, faq}) => {
    const {t} = useTranslation();

    return (
        <Spin spinning={isFetching}>
            <div className={'content'}>
                {currentItem[0] && (
                    <Descriptions
                        title={`${t(faq)}: ${currentItem[0].question_ru}`}
                        column={1}
                        colon={true}
                    >
                        {i18n.language === 'ru' ? <Descriptions.Item
                                label={t('questionRu')}
                            >
                                {currentItem[0].question_ru}
                            </Descriptions.Item> :
                            <Descriptions.Item
                                label={t('questionKz')}
                            >
                                {currentItem[0].question_kz}
                            </Descriptions.Item>}
                        {i18n.language === 'ru' ? <Descriptions.Item
                                label={t('answerRu')}
                            >
                                {currentItem[0].answer_ru}
                            </Descriptions.Item> :
                            <Descriptions.Item
                                label={t('answerKz')}
                            >
                                {currentItem[0].answer_kz}
                            </Descriptions.Item>}
                    </Descriptions>
                )}
            </div>
        </Spin>
    )
};

export default DisplayFaq