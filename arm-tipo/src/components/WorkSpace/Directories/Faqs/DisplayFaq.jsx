import React from 'react'
import {Descriptions, Spin} from "antd";
import {useTranslation} from "react-i18next";
import i18n from "../../../../i18n";

const DisplayFaq = (props) => {
    const {t} = useTranslation();
    return (
        <Spin spinning={props.isFetching}>
            <div className={'content'}>
                {props.currentItem[0] && (
                    <Descriptions
                        title={t(props.faq) + ': ' + props.currentItem[0].question_ru}
                        column={1}
                        colon={true}
                    >
                        {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('questionRu')}
                        >
                            {props.currentItem[0].question_ru}
                        </Descriptions.Item>:
                        <Descriptions.Item
                            label={t('questionKz')}
                        >
                            {props.currentItem[0].question_kz}
                        </Descriptions.Item>}
                        {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('answerRu')}
                        >
                            {props.currentItem[0].answer_ru}
                        </Descriptions.Item>:
                        <Descriptions.Item
                            label={t('answerKz')}
                        >
                            {props.currentItem[0].answer_kz}
                        </Descriptions.Item>}
                    </Descriptions>
                )}
            </div>
        </Spin>
    )
};

export default DisplayFaq