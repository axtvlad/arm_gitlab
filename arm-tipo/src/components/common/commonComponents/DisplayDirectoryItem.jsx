import React from 'react'
import {Descriptions, Spin} from "antd";
import {useTranslation} from "react-i18next";

const DisplayDirectoryItem = (props) => {
    const {t} = useTranslation();

    return (
        <Spin spinning={props.isFetching}>
            <div className={'content'}>
                {props.currentItem && (
                    <Descriptions
                        title={t(props.type) + ': ' + props.currentItem[0].name_ru}
                        column={1}
                        colon={true}
                    >
                        <Descriptions.Item
                            label={t('russianName')}
                        >
                            {props.currentItem[0].name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {props.currentItem[0].name_kz}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </div>
        </Spin>
    )
};

export default DisplayDirectoryItem