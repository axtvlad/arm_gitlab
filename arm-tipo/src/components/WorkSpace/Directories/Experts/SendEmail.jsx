import React from "react";
import MailOutlined from "@ant-design/icons/es/icons/MailOutlined";
import {Button, Input, Form} from 'antd'

const SendEmail = (props) => {

    const {TextArea} = Input;

    return (

        <form className="test-mailing">
            <h1>Задать вопрос эксперту по почте</h1>
            <div>
                <Input
                    id="from_email"
                    style={{width: '100%', marginBottom: 20}}
                    placeholder="Введите свой адрес почты, на него придет ответ эксперта"
                    required
                    value={props.name}
                    onChange={props.handleChangeEmail}
                    prefix={<MailOutlined/>}
                />
                <textarea
                    id="test-mailing"
                    name="test-mailing"
                    onChange={props.handleChange}
                    placeholder="Укажите Ваш вопрос"
                    required
                    value={props.feedback}
                    style={{width: '100%', height: '150px'}}
                />
            </div>
            <Input
                style={{width: 200, marginTop: 20}}
                type="button"
                value="Отправить"
                className="btn btn--submit"
                onClick={props.handleSubmit}
            />
        </form>
    )
};

export default SendEmail;