import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Collapse} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const { Panel } = Collapse;

const Faqs = (props) => {
    return (
        <div className={'content'}>
            <NavLink to={'/addFaq'}>
                <Button
                    type="danger"
                    shape="round"
                    icon={<PlusOutlined/>}
                >
                    Добавить вопрос
                </Button>
            </NavLink>

            <Collapse accordion>
                {
                    props.faqs.map((faq, index) => (
                        <Panel header={faq.question_kz} key={index}>
                        <p>{faq.answer_kz}</p>
                    </Panel>
                    ))
                }
            </Collapse>
        </div>
    )
};

export default Faqs;