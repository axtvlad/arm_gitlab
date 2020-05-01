import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Collapse} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import * as axios from "axios";

const {Panel} = Collapse;

class Faqs extends React.Component {
    componentDidMount() {
        if (this.props.faqs.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            axios
                .get('http://185.22.66.183:8080/rest/api/faqs', config)
                .then(response => {
                    this.props.setFaqs(response.data.data);
                    console.log('faqs: ', response.data.data);
                });

        }

    }

    render() {
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
                    {this.props.faqs.map((faq, index) => (
                        <Panel header={faq.question_ru} key={index}>
                            <p>{faq.answer_ru}</p>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        )
    }
}

export default Faqs;