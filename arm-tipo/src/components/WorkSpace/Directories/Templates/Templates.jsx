import React from "react";
import {Button, Dropdown, Menu, PageHeader, Row, Spin} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {EllipsisOutlined} from "@ant-design/icons";

const menu = (
    <Menu>
        <Menu.Item>
            <a href='/'>
                Редактировать
            </a>
        </Menu.Item>
        <Menu.Item>
            <a href='/'>
                Удалить
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

const Templates = (props) => {
    return (
        <div>
            <Spin spinning={props.isFetching}>
                {props.templates.map(tmp =>
                    <div style={{margin: '30px 30px', backgroundColor: 'white'}} key={tmp.id}>
                        <PageHeader
                            title={tmp.name_ru}
                            className="site-page-header"
                            extra={[
                                <DropdownMenu key="more"/>
                            ]}
                            avatar={{src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'}}
                        >
                            <Content>
                               {/* <Descriptions column={1} style={{textAlign: "left", marginTop: 20}}>
                                    <Descriptions.Item label={'Заголовок документа'}>
                                        {doc.header_ru}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={'Дата публикации'}>
                                        {doc.pub_date}
                                    </Descriptions.Item>
                                </Descriptions>*/}

                                <div style={{textAlign: 'left'}}>
                                    <Button
                                        style={{marginTop: 20, marginRight: 10}}
                                        type="danger"
                                        shape="round"
                                    >
                                        Подробнее
                                    </Button>
                                    <Button
                                        style={{marginTop: 20, marginLeft: 10}}
                                        type="primary"
                                        shape="round"
                                        icon={<DownloadOutlined/>}
                                    >
                                        Скачать
                                    </Button>
                                </div>
                            </Content>
                        </PageHeader>
                    </div>
                )}
            </Spin>
        </div>
    )};
export default Templates;