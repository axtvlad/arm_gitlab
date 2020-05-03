import React from 'react'
import {Descriptions, Spin} from "antd";

const Type = (props) => {
    return (
        <Spin spinning={props.isFetching}>
            <div className={'content'}>
                {props.currentType && (
                    <Descriptions title="Тип документа" column={1} colon={true}>
                        <Descriptions.Item
                            label={'Наименование (ru)'}
                        >
                            {props.currentType[0].name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={'Наименование (kz)'}
                        >
                            {props.currentType[0].name_kz}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </div>
        </Spin>
    )
};

export default Type;