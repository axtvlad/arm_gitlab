import React from 'react'
import {Button, Col, Descriptions, Divider, PageHeader, Row, Spin, Statistic, Tag, Typography} from 'antd';
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";
import CopyOutlined from "@ant-design/icons/lib/icons/CopyOutlined";
import {useTranslation} from "react-i18next";
import word_svg from "../../../svg/word.svg";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {NavLink} from "react-router-dom";

const Home = (props) => {
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
                return 'Потерял актуальность';
            case 2:
                return 'Актуальный';
            case 3:
                return 'Новый';
            default:
                return 'Неизвестно'
        }
    };

    const getDepartmentText = (id) => {
        switch (id) {
            case 1:
                return 'МОН РК';
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
                        value={props.totalCount}
                        prefix={<CopyOutlined/>}
                    />
                </Col>
            </Row>
            <Divider/>
            <Title level={3}>Последний добавленный документ: </Title>
            <Row>
                <div style={{
                    padding: 30,
                    backgroundColor: 'white',
                    border: '1px solid #ebebeb',
                    borderRadius: 10,
                    width: '-webkit-fill-available'
                }}>
                    <PageHeader
                        title={props.lastAddedMainDoc.name_ru}
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
                                    {getDepartmentText(props.lastAddedMainDoc.department_id)}
                                </Tag>
                                <Tag color={getStatusColor(props.lastAddedMainDoc.status_id)}>
                                    {getStatusText(props.lastAddedMainDoc.status_id)}
                                </Tag>
                            </div>
                            <Descriptions column={1} style={{textAlign: "left", marginTop: 20}}>
                                <Descriptions.Item label={'Заголовок документа'}>
                                    {props.lastAddedMainDoc.header_ru}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Номер документа'}>
                                    {props.lastAddedMainDoc.num}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Дата публикации'}>
                                    {props.lastAddedMainDoc.pub_date}
                                </Descriptions.Item>
                            </Descriptions>

                            <div style={{textAlign: 'left'}}>
                                    <Button
                                        style={{marginTop: 20, marginRight: 10}}
                                        type="danger"
                                        shape="round"
                                    >
                                        <NavLink to={'/' + props.type + '/' + props.lastAddedMainDoc.id}>{t('more')}</NavLink>
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
                    </PageHeader>
                </div>
            </Row>
        </div>
    )
};

export default Home;