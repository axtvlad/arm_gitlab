import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Card, Spin} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {useTranslation} from "react-i18next";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";

const Faqs = (props) => {

    const {t} = useTranslation();

    return (
        <div style={{background: "e5e5e5"}}>
            {props.isAdmin && <NavLink to={'/addFaq'}>
                <Button
                    type="danger"
                    shape="round"
                    icon={<PlusOutlined/>}
                >
                    {t('addNewFaq')}
                </Button>
            </NavLink>}
            <Spin spinning={props.isFetching}>
                {props.faqs.map((faq) => (
                    <Card
                        style={{marginBottom: 20, margin: 10, textAlign: 'left'}}
                        title={faq.question_ru}
                        key={faq.id}
                        bordered={false}
                        actions={props.isAdmin && [
                            <DeleteOutlined key="delete" onClick={() => props.removeFaqById(faq.id)} />
                        ]}
                        extra={
                            <NavLink to={'/faqs/' + faq.id}>{t('more')}</NavLink>
                        }
                    >{faq.answer_ru}
                    </Card>
                ))}
            </Spin>
        </div>
    )
};

export default Faqs;