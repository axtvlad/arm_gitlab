import React from 'react';
import {Button, Descriptions, Dropdown, Menu, PageHeader, Row, Spin, Tag} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import word_svg from '../../../../svg/word.svg'
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {GetAddAddress} from "../../../common/utils/AddPagesRoutes";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const MainDocs = (props) => {

    const {t} = useTranslation();

    const menu = (id) => {
        return (
            <Menu>
                <Menu.Item>
                    <span>
                        {t('edit')}
                    </span>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={() => props.deleteMainDocById(id)}>
                        {t('delete')}
                    </span>
                </Menu.Item>
            </Menu>
        )
    };

    const DropdownMenu = (id) => {
        return (
            <Dropdown key="more" overlay={menu(id)}>
                <Button
                    style={{
                        border: 'none',
                        padding: 0,
                    }}
                >
                    <EllipsisOutlined
                        style={{
                            fontSize: 20,
                            verticalAlign: 'top',
                        }}
                    />
                </Button>
            </Dropdown>
        );
    };

    const getStatusColor = (id) => {
        switch (id) {
            case 1:
                return 'green';
            case 2:
                return 'red';
            default:
                return 'orange';
        }
    };

    const getStatusText = (id) => {
        switch (id) {
            case 1:
                return 'Актуальный';
            case 2:
                return 'Потерял актуальность';
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
        <div>
            <Spin spinning={props.isFetching}>
                {props.isAdmin && <div className={'addButtonBlock'}>
                    <NavLink to={GetAddAddress(props.type)}>
                        <Button
                            type={'danger'}
                            icon={<PlusOutlined/>}
                        >
                            {t('addNewMainDoc')}
                        </Button>
                    </NavLink>
                </div>}
                {props.mainDocs.map(doc =>
                    <div style={{margin: '30px 30px', backgroundColor: 'white'}} key={doc.id}>
                        <PageHeader
                            title={doc.name_ru}
                            className="site-page-header"
                            subTitle={doc.number}
                            extra={[
                                <DropdownMenu key="more" id={doc.id}/>
                            ]}
                            avatar={{src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'}}
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
                                    <Tag color={'purple'}>{getDepartmentText(doc.department_id)}</Tag>
                                    <Tag color={getStatusColor(doc.status_id)}>{getStatusText(doc.status_id)}</Tag>
                                </div>
                                <Descriptions column={1} style={{textAlign: "left", marginTop: 20}}>
                                    <Descriptions.Item label={'Заголовок документа'}>
                                        {doc.header_ru}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={'Номер'}>
                                        {doc.num}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={'Дата публикации'}>
                                        {doc.pub_date}
                                    </Descriptions.Item>
                                </Descriptions>

                                <div style={{textAlign: 'left'}}>
                                    <Button
                                        style={{marginTop: 20, marginRight: 10}}
                                        type="danger"
                                        shape="round"
                                    >
                                        <NavLink to={'/' + props.type + '/' + doc.id}>{t('more')}</NavLink>
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
                )}
            </Spin>
        </div>
    )
};

export default MainDocs;