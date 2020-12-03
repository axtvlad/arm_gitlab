import {Button, Form, Input} from 'antd';
import React from "react";
import classes from './Auth.module.css'

const Auth = ({postAuthUserData, updateAuthLogin, updateAuthPassword, authDir}) => {
    const [form] = Form.useForm();

    const fromState = {
        login: authDir.login,
        password: authDir.password,
    }

    form.setFieldsValue(fromState);

    const auth = () => {
        postAuthUserData(fromState)
    };

    const changeAuthLogin = () => {
        const login = form.getFieldValue().login;

        updateAuthLogin(login)
    };

    const changeAuthPassword = () => {
        const password = form.getFieldValue().password;

        updateAuthPassword(password)
    };

    return (
        <div className={'grid-container'}>
            <Form
                layout={"vertical"}
                className={classes.authForm}
                name={'form'}
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