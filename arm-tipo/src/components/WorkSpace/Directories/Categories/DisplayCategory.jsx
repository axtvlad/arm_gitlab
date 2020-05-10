import React from 'react'
import {Descriptions, Spin} from "antd";

const DisplayCategory = (props) => {
    return (
        <Spin spinning={props.isFetching}>
            <div className={'content'}>
                {props.currentCategory && (
                    <Descriptions title="Роль" column={1} colon={true}>
                        <Descriptions.Item
                            label={'Наименование (ru)'}
                        >
                            {props.currentCategory[0].name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={'Наименование (kz)'}
                        >
                            {props.currentCategory[0].name_kz}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </div>
        </Spin>
    )
};

export default DisplayCategory