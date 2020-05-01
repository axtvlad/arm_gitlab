import React from 'react';
import {Descriptions} from "antd";

class DepartmentDescription extends React.Component {
    render() {
        return (
            <div className={'content'}>
                <Descriptions title="Описание">
                    <Descriptions.Item label="name_ru">вапро</Descriptions.Item>
                    <Descriptions.Item label="name_kz">Prepaid</Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}

export default DepartmentDescription;