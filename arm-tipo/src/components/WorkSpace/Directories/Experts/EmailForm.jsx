import React from 'react';
import MailOutlined from "@ant-design/icons/es/icons/MailOutlined";
import {Input} from 'antd'

export default class EmailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {feedback: '', name: '', email: 'info@arm-tipo.kz'};
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (

            <form className="test-mailing">
                <h1>Задать вопрос эксперту по почте</h1>
                <div>
                    <Input
                        id="from_email"
                        style={{width: '100%', marginBottom: 20}}
                        placeholder="Введите свой адрес почты, на него придет ответ эксперта"
                        required
                        size="large"
                        value={this.state.name}
                        onChange={this.handleChangeEmail}
                        prefix={<MailOutlined/>}
                    />
                    <textarea
                        id="test-mailing"
                        name="test-mailing"
                        onChange={this.handleChange}
                        placeholder="Укажите Ваш вопрос"
                        required
                        value={this.state.feedback}
                        style={{width: '100%', height: '150px'}}
                    />
                </div>
                <Input
                    style={{width: 200, marginTop: 20}}
                    type="button"
                    value="Отправить"
                    className="btn btn--submit"
                    onClick={this.handleSubmit}
                />
            </form>
        )
    }

handleChange(event)
{
    this.setState({feedback: event.target.value})
}
handleChangeEmail(event)
{
    this.setState({name: event.target.value})
}


handleSubmit(event)
{
    const templateId = 'template_id';

    this.sendFeedback(templateId, {
        message_html: this.state.feedback,
        from_name: this.state.name,
        reply_to: this.state.email
    })
}

sendFeedback(templateId, variables)
{
    debugger
    window.emailjs.send(
        'smtp_server', 'template_2S4Qpgei',
        variables
    ).then(res => {
        console.log('Email successfully sent!')
    })
    // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
}
}