import React from 'react';
import {Button, Descriptions, Dropdown, Menu, PageHeader, Row, Tag} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import word_svg from '../../../../../svg/word.svg'
import * as axios from "axios";

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

class MainDocs extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.mainDocs.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            axios
                .get('http://185.22.66.183:8080/rest/api/mainDocs', config)
                .then(response => {
                    this.props.setMainDocs(response.data.data);
                    console.log('mainDocs: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <div>
                {this.props.mainDocs.map(doc =>
                    <div style={{margin: '30px 30px', backgroundColor: 'white'}} key={doc.id}>
                        <PageHeader
                            title={doc.name_ru}
                            className="site-page-header"
                            subTitle={doc.number}
                            tags={
                                <div>
                                    <Tag color={'purple'}>{getDepartmentText(doc.department_id)}</Tag>
                                    <Tag color={getStatusColor(doc.status_id)}>{getStatusText(doc.status_id)}</Tag>
                                </div>
                            }
                            extra={[
                                <DropdownMenu key="more"/>
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
                                <Descriptions column={1} style={{textAlign: "left", marginTop: 20}}>
                                    <Descriptions.Item label={'Заголовок документа'}>
                                        {doc.header_ru}
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
            </div>
        )
    }
}

export default MainDocs;