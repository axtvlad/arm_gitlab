import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Collapse, Spin} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {useTranslation} from "react-i18next";

const {Panel} = Collapse;

const Faqs = (props) => {
    const {t} = useTranslation();

    return (
        <div className={'content'}>
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
                <Collapse accordion>
                    {props.faqs.map((faq, index) => (
                        <Panel header={faq.question_ru} key={index}>
                            <p>{faq.answer_ru}</p>
                        </Panel>
                    ))}
                </Collapse>
            </Spin>
        </div>
    )
};

export default Faqs;