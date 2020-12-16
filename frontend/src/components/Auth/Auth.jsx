import {Button, Form, Input} from 'antd';
import React from "react";
import classes from './Auth.module.css'
import {useTranslation} from "react-i18next";
import {login} from "../../redux/reducers/AuthReducer";

const Auth = ({login}) => {
    const {t} = useTranslation();

    const onSubmit = (formData) => {
        login(formData)
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
                    rules={[{
                        required: true,
                        message: t('Заполните поле')
                    }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={'Пароль'}
                    name={'password'}
                    rules={[{
                        required: true,
                        message: t('Заполните поле')
                    }]}
                >
                    <Input.Password/>
                </Form.Item>

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