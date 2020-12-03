import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Card, Spin} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {useTranslation} from "react-i18next";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import classes from './Faqs.module.css'

const Faqs = ({isAdmin, isFetching, faqs, removeFaqById}) => {
    const {t} = useTranslation();

    return (
        <div className={classes.faqs}>
            {isAdmin &&
            <NavLink to={'/addFaq'}>
                <Button
                    type="danger"
                    shape="round"
                    icon={<PlusOutlined/>}
                >
                    {t('addNewFaq')}
                </Button>
            </NavLink>}
            <Spin spinning={isFetching}>
                {faqs.map((faq) => (
                    <Card
                        className={classes.card}
                        title={faq.question_ru}
                        key={faq.id}
                        bordered={false}
                        actions={isAdmin && [
                            <DeleteOutlined key="delete" onClick={() => removeFaqById(faq.id)}/>
                        ]}
                        extra={
                            <NavLink to={'/faqs/' + faq.id}>{t('more')}</NavLink>
                        }
                    >
                        {faq.answer_ru}
                    </Card>
                ))}
            </Spin>
        </div>
    )
};

export default Faqs;