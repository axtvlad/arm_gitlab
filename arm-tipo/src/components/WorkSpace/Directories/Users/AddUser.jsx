import {Button, Checkbox, DatePicker, Form, Input, notification, Select} from "antd";
import React from "react";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddUser = (props) => {

    const {t} = useTranslation();

    const {Option} = Select;

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    //
    // const normFile = e => {
    //     console.log('Upload event:', e);
    //
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //
    //     return e && e.fileList;
    // };

    const [form] = Form.useForm();

    let fromState = {
        firstName: props.usersDir.newUserFirstName,
        lastName: props.usersDir.newUserLastName,
        patronymic: props.usersDir.newUserPatronymic,
        login: props.usersDir.newUserLogin,
        password: props.usersDir.newUserPassword,
        email: props.usersDir.newUserEmail,
        photo: props.usersDir.newUserPhoto,
        role_id: props.usersDir.newUserRoleId,
        city_id: props.usersDir.newUserCityId,
        customer_id: props.usersDir.newUserCustomerId,
        gender_id: props.usersDir.newUserGenderId,
        phone: props.usersDir.newUserPhone,
        locale: props.usersDir.newUserLocale,
        birthAt: props.usersDir.newUserBirthAt,
        isAdmin: props.usersDir.newUserIsAdmin,
        isPremium: props.usersDir.newUserIsPremium,
        isBanned: props.usersDir.newUserIsBanned
    };

    console.log(fromState);

    form.setFieldsValue({
        firstName: props.usersDir.newUserFirstName,
        lastName: props.usersDir.newUserLastName,
        patronymic: props.usersDir.newUserPatronymic,
        login: props.usersDir.newUserLogin,
        password: props.usersDir.newUserPassword,
        email: props.usersDir.newUserEmail,
        photo: props.usersDir.newUserPhoto,
        role_id: props.usersDir.newUserRoleId,
        city_id: props.usersDir.newUserCityId,
        customer_id: props.usersDir.newUserCustomerId,
        gender_id: props.usersDir.newUserGenderId,
        phone: props.usersDir.newUserPhone,
        locale: props.usersDir.newUserLocale,
        isAdmin: props.usersDir.newUserIsAdmin,
        isPremium: props.usersDir.newUserIsPremium,
        isBanned: props.usersDir.newUserIsBanned
    });

    const successfulAdd = (item) => {
        notification['success']({
            message: 'Сохранено!',
            description: 'Запись "' + item.firstName + ' ' + item.lastName + '" была успешно добавлена!',
            placement: 'bottomRight'
        });
    };

    const saveUser = (values) => {
        console.log('Received values of form: ', values);

        props.postUser(fromState);

        successfulAdd(fromState)
    };

    const changeFirstName = () => {
        const firstName = form.getFieldValue().firstName;
        props.updateUserFirstName(firstName);
    };

    const changeLastName = () => {
        const lastName = form.getFieldValue().lastName;
        props.updateUserLastName(lastName);
    };

    const changePatronymic = () => {
        const patronymic = form.getFieldValue().patronymic;
        props.updateUserPatronymic(patronymic);
    };

    const changeLogin = () => {
        const login = form.getFieldValue().login;
        props.updateUserLogin(login);
    };

    const changePassword = () => {
        const password = form.getFieldValue().password;
        props.updateUserPassword(password);
    };

    const changeEmail = () => {
        const email = form.getFieldValue().email;
        props.updateUserEmail(email);
    };
    //
    // const changePhoto = () => {
    //     const photo = form.getFieldValue().photo;
    //     props.updateUserPhoto(photo);
    // };

    const changeRoleId = () => {
        const role_id = form.getFieldValue().role_id;
        props.updateUserRoleId(role_id);
    };
    const changeCityId = () => {
        const city_id = form.getFieldValue().city_id;
        props.updateUserCityId(city_id);
    };

    const changeCustomerId = () => {
        const customer_id = form.getFieldValue().customer_id;
        props.updateUserCustomerId(customer_id);
    };

    const changeGenderId = () => {
        const gender_id = form.getFieldValue().gender_id;
        props.updateUserGenderId(gender_id);
    };

    const changePhone = () => {
        const phone = form.getFieldValue().phone;

        props.updateUserPhone(phone);
    };

    const changeBirthAt = (date, dateString) => {
        console.log(date, dateString)

        props.updateUserBirthAt(dateString);
    };

    const changeLocale = () => {
        const locale = form.getFieldValue().locale;
        props.updateUserLocale(locale);
    };
    const changeIsAdmin = () => {
        const isAdmin = form.getFieldValue().isAdmin;
        props.updateUserIsAdmin(isAdmin);
    };

    const changeIsPremium = () => {
        const isPremium = form.getFieldValue().isPremium;
        props.updateUserIsPremium(isPremium);
    };

    const changeIsBanned = () => {
        const isBanned = form.getFieldValue().isBanned;
        props.updateUserIsBanned(isBanned);
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={saveUser}
                form={form}
            >
                <Form.Item
                    name={'firstName'}
                    label={t('firstName')}
                    rules={[{
                        required: true,
                        message: t('enterFirstName') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterFirstName')}
                        onChange={changeFirstName}/>
                </Form.Item>

                <Form.Item
                    name={'lastName'}
                    label={t('lastName')}
                    rules={[{
                        required: true,
                        message: t('enterLastName') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterLastName')}
                        onChange={changeLastName}/>
                </Form.Item>

                <Form.Item
                    name={'patronymic'}
                    label={t('patronymic')}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterPatronymic')}
                        onChange={changePatronymic}/>
                </Form.Item>

                <Form.Item
                    name={'login'}
                    label={t('login')}
                    rules={[{
                        required: true,
                        message: t('enterLogin') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterLogin')}
                        onChange={changeLogin}/>
                </Form.Item>

                <Form.Item
                    name={'password'}
                    label={t('password')}
                    rules={[{
                        required: true,
                        message: (t('enterPassword') + '!')
                    }]}
                    hasFeedback
                >
                    <Input
                        type={'password'}
                        placeholder={t('enterPassword')}
                        onChange={changePassword}/>
                </Form.Item>

                <Form.Item
                    name={'email'}
                    label={t('email')}
                    rules={[{
                        required: true,
                        message: (t('enterEmail') + '!')
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterEmail')}
                        onChange={changeEmail}
                    />
                </Form.Item>

                {/*<Form.Item*/}
                {/*    name={'photo'}*/}
                {/*    label={t('uploadPhoto')}*/}
                {/*    valuePropName="fileList"*/}
                {/*    getValueFromEvent={normFile}*/}
                {/*>*/}
                {/*    <Upload name="logo" action="/upload.do" listType="picture" onChange={changePhoto}>*/}
                {/*        <Button>*/}
                {/*            <UploadOutlined/>*/}
                {/*            {t('chooseFile')}*/}
                {/*        </Button>*/}
                {/*    </Upload>*/}
                {/*</Form.Item>*/}

                <Form.Item
                    name={'phone'}
                    label={t('phone')}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterPhone')}
                        onChange={changePhone}/>
                </Form.Item>

                <Form.Item
                    name={'birthAt'}
                    label={t('birthDate')}
                    hasFeedback
                >
                    <DatePicker onChange={changeBirthAt} format={'YYYY-MM-DD'}/>
                </Form.Item>

                <Form.Item
                    name={'role_id'}
                    label={t('role')}
                    rules={[{
                        required: true,
                        message: t('chooseRole') + '!'
                    }]}
                    hasFeedback
                >
                    <Select placeholder={t('chooseRole')} onChange={changeRoleId}>
                        {props.roles.map(role =>
                            <Option
                                key={role.id}
                                value={role.id}
                            >
                                {role.name_ru}
                            </Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'city_id'}
                    label={t('city')}
                    rules={[{
                        required: true,
                        message: t('chooseCity') + '!'
                    }]}
                    hasFeedback
                >
                    <Select
                        placeholder={t('chooseCity')}
                        onChange={changeCityId}
                    >
                        {props.cities.map(city =>
                            <Option
                                key={city.id}
                                value={city.id}
                            >
                                {city.name_ru}
                            </Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'customer_id'}
                    label={t('customer')}
                    rules={[{
                        required: true,
                        message: (t('chooseCustomer') + '!')
                    }]}
                    hasFeedback
                >
                    <Select
                        placeholder={t('chooseCustomer')}
                        onChange={changeCustomerId}
                    >
                        {props.customers.map(customer =>
                            <Option
                                key={customer.id}
                                value={customer.id}
                            >
                                {customer.name_ru}
                            </Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'gender_id'}
                    label={t('gender')}
                    rules={[{
                        required: true,
                        message: t('chooseGender') + '!'
                    }]}
                    hasFeedback
                >
                    <Select
                        placeholder={t('chooseGender')}
                        onChange={changeGenderId}
                    >
                        {props.genders.map(gender =>
                            <Option
                                key={gender.id}
                                value={gender.id}
                            >
                                {gender.name_ru}
                            </Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'locale'}
                    label={t('locale')}
                    rules={[{
                        required: true,
                        message: t('chooseLocale') + '!'
                    }]}
                    hasFeedback
                >
                    <Select placeholder={t('chooseLocale')} onChange={changeLocale}>
                        <Option key='ru' value='ru'>
                            ru
                        </Option>
                        <Option key='kz' value='kz'>
                            kz
                        </Option>
                        <Option key='en' value='en'>
                            en
                        </Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'isAdmin'}
                    label={t('isAdmin')}
                    hasFeedback
                >
                    <Checkbox onChange={changeIsAdmin}>
                        {t('yes')}
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name={'isPremium'}
                    label={t('isPremium')}
                    hasFeedback
                >
                    <Checkbox onChange={changeIsPremium}>
                        {t('yes')}
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name={'isBanned'}
                    label={t('isBanned')}
                    hasFeedback
                >
                    <Checkbox onChange={changeIsBanned}>
                        {t('yes')}
                    </Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button
                        type="danger"
                        htmlType="submit"
                        icon={<DownloadOutlined/>}
                        block
                    >
                        {t('saveInBase')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default AddUser;