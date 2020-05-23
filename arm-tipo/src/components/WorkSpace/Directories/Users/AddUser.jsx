import {Button, Checkbox, DatePicker, Form, Input, Select, Upload} from "antd";
import React from "react";
import {UploadOutlined} from "@ant-design/icons";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const {Option} = Select;

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const AddUser = (props) => {

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

    form.setFieldsValue(fromState);

    const saveUser = (values) => {
        console.log('Received values of form: ', values);
        props.addUser();
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

    const changePhoto = () => {
        const photo = form.getFieldValue().photo;
        props.updateUserPhoto(photo);
    };

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

    const changeBirthAt = () => {
        const date = form.getFieldValue().birthAt;

        let date1 = date[0]._d;

        let dd1 = date1.getDate();
        if (dd1 < 10) dd1 = '0' + dd1;

        let mm1 = date1.getMonth() + 1;
        if (mm1 < 10) mm1 = '0' + mm1;

        let yyyy1 = date1.getFullYear();

        const birthAt = dd1 + '-' + mm1 + '-' + yyyy1;
        props.updateUserBirthAt(birthAt);
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
                    label={'Имя'}
                    rules={[{required: true, message: 'Пожалуйста, введите имя!'}]}
                    hasFeedback
                >
                    <Input placeholder={'Введите имя!'} onChange={changeFirstName}/>
                </Form.Item>

                <Form.Item
                    name={'lastName'}
                    label={'Фамилия'}
                    rules={[{required: true, message: 'Пожалуйста, введите фамилию!'}]}
                    hasFeedback
                >
                    <Input placeholder={'Введите фамилию!'} onChange={changeLastName}/>
                </Form.Item>

                <Form.Item
                    name={'patronymic'}
                    label={'Отчество'}
                    hasFeedback
                >
                    <Input placeholder={'Введите отчество!'} onChange={changePatronymic}/>
                </Form.Item>

                <Form.Item
                    name={'login'}
                    label={'Логин'}
                    rules={[{required: true, message: 'Пожалуйста, введите логин!'}]}
                    hasFeedback
                >
                    <Input placeholder={'Введите логин!'} onChange={changeLogin}/>
                </Form.Item>

                <Form.Item
                    name={'password'}
                    label={'Пароль'}
                    rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}
                    hasFeedback
                >
                    <Input type={'password'} placeholder={'Введите пароль!'} onChange={changePassword}/>
                </Form.Item>

                <Form.Item
                    name={'email'}
                    label={'Почта'}
                    rules={[{required: true, message: 'Пожалуйста, введите почту!'}]}
                    hasFeedback
                >
                    <Input placeholder={'Введите почту!'} onChange={changeEmail}/>
                </Form.Item>

                <Form.Item
                    name={'photo'}
                    label={'Прикрепите фото'}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture" onChange={changePhoto}>
                        <Button>
                            <UploadOutlined/>
                            Выбрать
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name={'phone'}
                    label={'Номер телефона'}
                    rules={[{required: true, message: 'Пожалуйста, введите номер телефона!'}]}
                    hasFeedback
                >
                    <Input placeholder={'Введите номер телефона!'} onChange={changePhone}/>
                </Form.Item>

                <Form.Item
                    name={'birthAt'}
                    label={'Дата рождения'}
                    rules={[{required: true, message: 'Пожалуйста, введите дату рождения!'}]}
                    hasFeedback
                >
                    <DatePicker format={'DD-MM-YYYY'} onChange={changeBirthAt}/>
                </Form.Item>

                <Form.Item
                    name={'role_id'}
                    label={'Роль пользователя'}
                    rules={[{required: true, message: 'Пожалуйста, выберите роль пользователя!'}]}
                    hasFeedback
                >
                    <Select placeholder={'Выберите роль пользователя!'} onChange={changeRoleId}>
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
                    label={'Город'}
                    rules={[{required: true, message: 'Пожалуйста, выберите город!'}]}
                    hasFeedback
                >
                    <Select placeholder={'Выберите город!'} onChange={changeCityId}>
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
                    label={'Клиент'}
                    rules={[{required: true, message: 'Пожалуйста, выберите клиента!'}]}
                    hasFeedback
                >
                    <Select placeholder={'Выберите клиента!'} onChange={changeCustomerId}>
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
                    label={'Пол пользователя'}
                    rules={[{required: true, message: 'Пожалуйста, выберите пол пользователя!'}]}
                    hasFeedback
                >
                    <Select placeholder={'Выберите пол пользователя!'} onChange={changeGenderId}>
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
                    name={'locale'}
                    label={'Локаль пользователя'}
                    rules={[{required: true, message: 'Пожалуйста, выберите локаль пользователя!'}]}
                    hasFeedback
                >
                    <Select placeholder={'Выберите локаль пользователя!'} onChange={changeLocale}>
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
                    label={'Является администратором'}
                    hasFeedback
                >
                    <Checkbox onChange={changeIsAdmin}>
                        Да
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name={'isPremium'}
                    label={'Является Premium-пользователем'}
                    hasFeedback
                >
                    <Checkbox onChange={changeIsPremium}>
                        Да
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name={'isBanned'}
                    label={'Заблокированный пользователь'}
                    hasFeedback
                >
                    <Checkbox onChange={changeIsBanned}>
                        Да
                    </Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button
                        type="danger"
                        htmlType="submit"
                        icon={<DownloadOutlined/>}
                        block
                    >
                        Сохранить в базу
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default AddUser;