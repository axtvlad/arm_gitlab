import {Button, Form, Input} from 'antd';
import React from "react";
import classes from './Auth.module.css'

const Auth = ({postAuthUserData}) => {
    const onSubmit = (formData) => {
        postAuthUserData(formData)
    };

    return (
        <div className={'grid-container'}>
            <Form
                layout={"vertical"}
                className={classes.authForm}
                name={'auth_form'}
                onFinish={onSubmit}
            >
                <Form.Item
                    label={'Логин'}
                    name={'login'}
                    rules={[{required: true, message: 'Пожалуйста, введите свой логин'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={'Пароль'}
                    name={'password'}
                    rules={[{required: true, message: 'Пожалуйста, введите свой пароль!'}]}
                >
                    <Input.Password/>
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