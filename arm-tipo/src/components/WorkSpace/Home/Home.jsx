import React from 'react'
import {Col, Row, Spin, Statistic} from 'antd';
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";
import CopyOutlined from "@ant-design/icons/lib/icons/CopyOutlined";
import {useTranslation} from "react-i18next";

const Home = (props) => {

    const {t} = useTranslation();


    let string = '';

    const arr = ['a', 'b', 'c', 'd'];

    for (let i = 0; i < arr.length; i++) {
        string += arr[i];
    }

    console.error(string);


    return (
        <div className={'content'}>
            <Row gutter={16}>
                <Col span={12}>
                    <Spin spinning={props.isFetching}>
                        <Statistic
                            title={t('totalUsersCount')}
                            value={props.usersCount}
                            prefix={<TeamOutlined/>}
                        />
                    </Spin>
                </Col>
                <Col span={12}>
                    <Statistic
                        title={t('totalDocsCount')}
                        value={props.mainDocsCount}
                        prefix={<CopyOutlined/>}/>
                </Col>
            </Row>
        </div>
    )
};

export default Home;