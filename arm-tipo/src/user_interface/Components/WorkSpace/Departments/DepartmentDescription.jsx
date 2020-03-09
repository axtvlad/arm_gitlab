import React from 'react';
import {Descriptions} from "antd";

const DepartmentDescription = (props) => {
    return (
        <div>
            <Descriptions title="Описание">
                <Descriptions.Item label="name_ru">вапро</Descriptions.Item>
                <Descriptions.Item label="name_kz">Prepaid</Descriptions.Item>
            </Descriptions>
        </div>
    )
};

export default DepartmentDescription;