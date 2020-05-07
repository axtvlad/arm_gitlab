import React from 'react'
import {Descriptions, Spin} from "antd";

const DisplayRole = (props) => {
    return (
        <Spin spinning={props.isFetching}>
            <div className={'content'}>
                {props.currentRole && (
                    <Descriptions title="Роль" column={1} colon={true}>
                        <Descriptions.Item
                            label={'Наименование (ru)'}
                        >
                            {props.currentRole[0].name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={'Наименование (kz)'}
                        >
                            {props.currentRole[0].name_kz}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </div>
        </Spin>
    )
};

export default DisplayRole;