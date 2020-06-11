import {Button, Form, Input} from 'antd';
import React from "react";
import MaskedInput from 'react-text-mask'

const Auth = (props) => {

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };

    const [form] = Form.useForm();

    let fromState = {
        login: props.authDir.login,
        password: props.authDir.password,
    }

    form.setFieldsValue(fromState);

    const auth = () => {
        props.postAuthUserData(fromState)
    };

    const changeAuthLogin = () => {
        const login = form.getFieldValue().login;

        props.updateAuthLogin(login)
    };

    const changeAuthPassword = () => {
        const password = form.getFieldValue().password;

        props.updateAuthPassword(password)
    };

    return (
        <div style={{display: 'inline-grid'}}>
            <Form
                {...layout}
                name={'form'}
                initialValues={{remember: true}}
                onFinish={auth}
                form={form}
            >
                <Form.Item
                    label={'Логин'}
                    name={'login'}
                    rules={[{required: true, message: 'Пожалуйста, введите свой логин'}]}
                >
                    <Input onChange={changeAuthLogin}/>
                </Form.Item>

                <Form.Item
                    label={'Пароль'}
                    name={'password'}
                    rules={[{required: true, message: 'Пожалуйста, введите свой пароль!'}]}
                >
                    <Input.Password onChange={changeAuthPassword}/>
                </Form.Item>

                <Form.Item {...tailLayout} name="remember">
                    <span>Забыли пароль? Молодцы!</span>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Auth;