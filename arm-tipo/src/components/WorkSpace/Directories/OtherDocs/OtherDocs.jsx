import {useTranslation} from "react-i18next";
import {Button, Dropdown, Menu, PageHeader, Row, Spin} from "antd";
import React from "react";
import {EllipsisOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import {GetAddAddress} from "../../../common/utils/AddPagesRoutes";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const OtherDocs = (props) => {

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
                    <span onClick={() => props.deleteOtherDocById(id)}>
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
                            {t('addNewOtherDoc')}
                        </Button>
                    </NavLink>
                </div>}
                {props.otherDocs.map(othDoc =>
                    <div style={{margin: '30px 30px', backgroundColor: 'white'}} key={othDoc.id}>
                        <PageHeader
                            title={othDoc.name_ru}
                            className="site-page-header"
                            extra={[
                                <DropdownMenu key="more" id={othDoc.id}>
                                    <NavLink to={'/' + props.type + '/' + othDoc.id}>{t('more')}</NavLink>
                                </DropdownMenu>
                            ]}
                            avatar={{src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'}}
                        >
                            <div style={{textAlign: 'left'}}>
                                <Button
                                    style={{marginTop: 20, marginRight: 10}}
                                    type="danger"
                                    shape="round"
                                >
                                    <NavLink to={'/' + props.type + '/' + othDoc.id}>{t('more')}</NavLink>
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
                        </PageHeader>
                    </div>
                )}
            </Spin>
        </div>
    )
};

export default OtherDocs;