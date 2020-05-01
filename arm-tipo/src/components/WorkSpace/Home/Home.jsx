import React from 'react'
import {Col, Row, Statistic} from 'antd';
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";
import CopyOutlined from "@ant-design/icons/lib/icons/CopyOutlined";

const Home = (props) => {
    return (
        <div className={'content'}>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Всего пользователей в системе" value={props.usersCount} prefix={<TeamOutlined/>}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Всего документов" value={45} prefix={<CopyOutlined/>}/>
                </Col>
            </Row>
        </div>
    )
};

export default Home;