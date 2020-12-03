import React from 'react';
import {Button, Descriptions, Dropdown, Menu, notification, PageHeader, Row, Spin, Tag} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import word_svg from '../../../../svg/word.svg'
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {GetAddAddress} from "../../../common/utils/AddPagesRoutes";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import i18n from "../../../../i18n";

const MainDocs = ({deleteMainDocById, isFetching, isAdmin, mainDocs, type}) => {
    const {t} = useTranslation();

    const deleteItem = (item) => {
        deleteMainDocById(item.id);

        notification['success']({
            message: 'Удалено!',
            description: `Запись ${item.name_ru} была успешно удалена!`,
            placement: 'bottomRight'
        });
    };

    const menu = (item) => {
        return (
            <Menu>
                {/*<Menu.Item>
                    <span>
                        {t('edit')}
                    </span>
                </Menu.Item>*/}
                <Menu.Item>
                    <span onClick={() => deleteItem(item)}>
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
                return t('actual');
            case 2:
                return t('old');
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
        <div>
            <Spin spinning={isFetching}>
                {isAdmin &&
                <div className={'addButtonBlock'}>
                    <NavLink to={GetAddAddress(props.type)}>
                        <Button
                            type={'danger'}
                            icon={<PlusOutlined/>}
                        >
                            {t('addNewMainDoc')}
                        </Button>
                    </NavLink>
                </div>}
                {mainDocs.map(doc =>
                    <div style={{margin: '30px 30px', backgroundColor: 'white'}} key={doc.id}>
                        {i18n.language === 'ru' ?
                            <PageHeader
                                title={doc.name_ru}
                                className="site-page-header"
                                subTitle={doc.number}
                                extra={isAdmin && [
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
                                        <Descriptions.Item label={t('headerRu')}>
                                            {doc.header_ru}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t('number')}>
                                            {doc.num}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t('published')}>
                                            {doc.begin_date}
                                        </Descriptions.Item>
                                    </Descriptions>

                                    <div style={{textAlign: 'left'}}>
                                        <Button
                                            style={{marginTop: 20, marginRight: 10}}
                                            type="danger"
                                            shape="round"
                                        >
                                            <NavLink to={`/${type}/${doc.id}`}>{t('more')}</NavLink>
                                        </Button>
                                        <Button
                                            style={{marginTop: 20, marginLeft: 10}}
                                            type="primary"
                                            shape="round"
                                            href={doc.file_kz}
                                            icon={<DownloadOutlined/>}
                                        >
                                            {t('download')}
                                        </Button>
                                    </div>
                                </Content>
                            </PageHeader> :
                            <PageHeader
                                title={doc.name_kz}
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
                                        <Descriptions.Item label={t('headerKz')}>
                                            {doc.header_kz}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t('number')}>
                                            {doc.num}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t('published')}>
                                            {doc.begin_date}
                                        </Descriptions.Item>
                                    </Descriptions>

                                    <div style={{textAlign: 'left'}}>
                                        <Button
                                            style={{marginTop: 20, marginRight: 10}}
                                            type="danger"
                                            shape="round"
                                        >
                                            <NavLink to={'/' + type + '/' + doc.id}>{t('more')}</NavLink>
                                        </Button>
                                        <Button
                                            style={{marginTop: 20, marginLeft: 10}}
                                            type="primary"
                                            shape="round"
                                            href={doc.file_kz}
                                            icon={<DownloadOutlined/>}
                                        >
                                            {t('download')}
                                        </Button>
                                    </div>
                                </Content>
                            </PageHeader>}
                    </div>
                )}
            </Spin>
        </div>
    )
};

export default MainDocs;