import React from 'react'
import {Button, Col, Descriptions, Divider, PageHeader, Row, Spin, Statistic, Tag, Typography} from 'antd';
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";
import CopyOutlined from "@ant-design/icons/lib/icons/CopyOutlined";
import {useTranslation} from "react-i18next";
import word_svg from "../../../svg/word.svg";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {NavLink} from "react-router-dom";
import i18n from "../../../i18n";

const Home = ({isFetching, usersCount, totalCount, lastAddedMainDoc, type}) => {
    const {Title} = Typography;
    const {t} = useTranslation();

    const getStatusColor = (id) => {
        switch (id) {
            case 1:
                return 'red';
            case 2:
                return 'green';
            case 3:
                return 'blue';
            default:
                return 'orange';
        }
    };

    const getStatusText = (id) => {
        switch (id) {
            case 1:
                return t('old');
            case 2:
                return t('new');
            case 3:
                return 'Новый';
            default:
                return 'Неизвестно'
        }
    };

    const getDepartmentText = (id) => {
        switch (id) {
            case 1:
                return t('educationDepartment');
            case 2:
                return 'МТСЗ РК';
            case 3:
                return 'МИНЗДРАВ';
            default:
                return 'Неизвестно'
        }
    };

    const Content = ({children, extraContent}) => {
        return (
            <Row>
                <div style={{flex: 1}}>{children}</div>
                <div className="image">{extraContent}</div>
            </Row>
        );
    };

    return (
        <div className={'content'}>
            <Row style={{textAlign: 'center'}}>
                <Col span={12}>
                    <Spin spinning={isFetching}>
                        <Statistic
                            title={t('totalUsersCount')}
                            value={usersCount}
                            prefix={<TeamOutlined/>}
                        />
                    </Spin>
                </Col>
                <Col span={12}>
                    <Statistic
                        title={t('totalDocsCount')}
                        value={totalCount}
                        prefix={<CopyOutlined/>}
                    />
                </Col>
            </Row>
            <Divider/>
            <Title level={3}>{t('lastAddedDoc')}</Title>
            <Row>
                <div style={{
                    padding: 30,
                    backgroundColor: 'white',
                    border: '1px solid #ebebeb',
                    borderRadius: 10,
                    width: '-webkit-fill-available'
                }}>
                    {i18n.language === 'ru' ? <PageHeader
                            title={lastAddedMainDoc.name_ru}
                            className="site-page-header"
                        >
                            <Content
                                extraContent={
                                    <img
                                        src={word_svg}
                                        alt="content"
                                        width={80}
                                        height={80}
                                    />
                                }
                            >
                                <div style={{float: 'left', margin: '20px 0'}}>
                                    <Tag color={'purple'}>
                                        {getDepartmentText(lastAddedMainDoc.department_id)}
                                    </Tag>
                                    <Tag color={getStatusColor(lastAddedMainDoc.status_id)}>
                                        {getStatusText(lastAddedMainDoc.status_id)}
                                    </Tag>
                                </div>
                                <Descriptions column={1} style={{textAlign: "left", marginTop: 20}}>
                                    <Descriptions.Item label={t('headerRu')}>
                                        {lastAddedMainDoc.header_ru}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('number')}>
                                        {lastAddedMainDoc.num}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('published')}>
                                        {lastAddedMainDoc.begin_date}
                                    </Descriptions.Item>
                                </Descriptions>

                                <div style={{textAlign: 'left'}}>
                                    <Button
                                        style={{marginTop: 20, marginRight: 10}}
                                        type="danger"
                                        shape="round"
                                    >
                                        <NavLink
                                            to={'/' + type + '/' + lastAddedMainDoc.id}>{t('more')}</NavLink>
                                    </Button>
                                    <Button
                                        style={{marginTop: 20, marginLeft: 10}}
                                        type="primary"
                                        shape="round"
                                        icon={<DownloadOutlined/>}
                                    >
                                        {t('download')}
                                    </Button>
                                </div>
                            </Content>
                        </PageHeader> :
                        <PageHeader
                            title={lastAddedMainDoc.name_kz}
                            className="site-page-header"
                        >
                            <Content
                                extraContent={
                                    <img
                                        src={word_svg}
                                        alt="content"
                                        width={80}
                                        height={80}
                                    />
                                }
                            >
                                <div style={{float: 'left', margin: '20px 0'}}>
                                    <Tag color={'purple'}>
                                        {getDepartmentText(lastAddedMainDoc.department_id)}
                                    </Tag>
                                    <Tag color={getStatusColor(lastAddedMainDoc.status_id)}>
                                        {getStatusText(lastAddedMainDoc.status_id)}
                                    </Tag>
                                </div>
                                <Descriptions column={1} style={{textAlign: "left", marginTop: 20}}>
                                    <Descriptions.Item label={t('headerKz')}>
                                        {lastAddedMainDoc.header_kz}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('number')}>
                                        {lastAddedMainDoc.num}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('published')}>
                                        {lastAddedMainDoc.begin_date}
                                    </Descriptions.Item>
                                </Descriptions>

                                <div style={{textAlign: 'left'}}>
                                    <Button
                                        style={{marginTop: 20, marginRight: 10}}
                                        type="danger"
                                        shape="round"
                                    >
                                        <NavLink
                                            to={'/' + type + '/' + lastAddedMainDoc.id}>{t('more')}</NavLink>
                                    </Button>
                                    <Button
                                        style={{marginTop: 20, marginLeft: 10}}
                                        type="primary"
                                        shape="round"
                                        href={lastAddedMainDoc.file_kz}
                                        icon={<DownloadOutlined/>}
                                    >
                                        {t('download')}
                                    </Button>
                                </div>
                            </Content>
                        </PageHeader>}
                </div>
            </Row>
        </div>
    )
};

export default Home;