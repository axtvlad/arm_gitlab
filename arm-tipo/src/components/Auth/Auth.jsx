import {Button, Form, Input} from 'antd';
import React from "react";

const Auth = (props) => {

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
        <div className={'grid-container'}>
            <Form
                layout={"vertical"}
                className={'auth'}
                name={'form'}
                onFinish={auth}
                form={form}
                style={{padding: 30}}
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

                {/*<Form.Item name="remember">*/}
                {/*    <span>Забыли пароль?</span>*/}
                {/*</Form.Item>*/}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Auth;