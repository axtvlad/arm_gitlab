import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Card, Spin} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {useTranslation} from "react-i18next";

const Faqs = (props) => {

    const {t} = useTranslation();

    return (
        <div style={{background:"e5e5e5"}}>
            <NavLink to={'/addFaq'}>
                <Button
                    type="danger"
                    shape="round"
                    icon={<PlusOutlined/>}
                >
                    {t('addNewFaq')}
                </Button>
            </NavLink>
            <Spin spinning={props.isFetching}>
                <table style={{width: "100%"}}>
                    <tr>
                    {props.faqs.map((faq) => (
                        <td style={{padding: 20}}>
                        <Card
                            title={faq.question_ru}
                            bordered={false}
                        >
                            {faq.answer_ru}
                        </Card>
                        </td>
                    ))}
                    </tr>
                </table>
            </Spin>
        </div>
    )
};

export default Faqs;