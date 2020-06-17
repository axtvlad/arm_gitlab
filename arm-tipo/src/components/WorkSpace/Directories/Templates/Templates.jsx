import React from "react";
import {Button, Dropdown, Menu, PageHeader, Row, Spin} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {EllipsisOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {GetAddAddress} from "../../../common/utils/AddPagesRoutes";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const Templates = (props) => {

    const {t} = useTranslation();

    const menu = (
        <Menu>
            {/*<Menu.Item>
                <a href='/'>
                    {t('edit')}
                </a>
            </Menu.Item>*/}
            <Menu.Item>
                <a href='/'>
                    {t('delete')}
                </a>
            </Menu.Item>
        </Menu>
    );

    const Content = ({children, extraContent}) => {
        return (
            <Row>
                <div style={{flex: 1}}>{children}</div>
                <div className="image">{extraContent}</div>
            </Row>
        );
    };

    const DropdownMenu = () => {
        return (
            <Dropdown key="more" overlay={menu}>
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

    return (
        <div>
            <Spin spinning={props.isFetching}>
                {props.isAdmin && <div className={'addButtonBlock'}>
                    <NavLink to={GetAddAddress(props.type)}>
                        <Button
                            type={'danger'}
                            icon={<PlusOutlined/>}
                        >
                            {t('addNewTemplate')}
                        </Button>
                    </NavLink>
                </div>}
                {props.templates.map(tmp =>
                    <div style={{margin: '30px 30px', backgroundColor: 'white'}} key={tmp.id}>
                        <PageHeader
                            title={tmp.name_ru}
                            className="site-page-header"
                            extra={props.isAdmin && [
                                <DropdownMenu key="more"/>
                            ]}
                            avatar={{src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'}}
                        >
                            <Content>
                                <div style={{textAlign: 'left'}}>
                                    <Button
                                        style={{marginTop: 20, marginRight: 10}}
                                        type="danger"
                                        shape="round"
                                    >
                                        {t('more')}
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
export default Templates;