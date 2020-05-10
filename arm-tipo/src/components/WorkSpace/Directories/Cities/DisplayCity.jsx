import React from 'react'
import {Descriptions, Spin} from "antd";

const DisplayCity = (props) => {
    return (
        <Spin spinning={props.isFetching}>
            <div className={'content'}>
                {props.currentCity && (
                    <Descriptions title="Роль" column={1} colon={true}>
                        <Descriptions.Item
                            label={'Наименование (ru)'}
                        >
                            {props.currentCity[0].name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={'Наименование (kz)'}
                        >
                            {props.currentCity[0].name_kz}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </div>
        </Spin>
    )
};

export default DisplayCity