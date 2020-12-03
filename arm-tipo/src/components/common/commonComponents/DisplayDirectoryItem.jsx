import React from 'react'
import {Descriptions, Spin} from "antd";
import {useTranslation} from "react-i18next";

const DisplayDirectoryItem = ({isFetching, currentItem, type}) => {
    const {t} = useTranslation();

    return (
        <Spin spinning={isFetching}>
            <div className={'content'}>
                {currentItem && (
                    <Descriptions
                        title={`${t(type)}: ${currentItem[0].name_ru}`}
                        column={1}
                        colon={true}
                    >
                        <Descriptions.Item
                            label={t('russianName')}
                        >
                            {currentItem[0].name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {currentItem[0].name_kz}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </div>
        </Spin>
    )
};

export default DisplayDirectoryItem