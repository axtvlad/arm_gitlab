import {Button, Checkbox, DatePicker, Form, Input, Select} from "antd";
import React, {useState} from "react";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {WalletOutlined} from "@ant-design/icons";
import moment from "moment";

const AddUser = ({genders, roles, cities, customers, postUser}) => {
    const {t} = useTranslation();
    const {Option} = Select;
    const [isSaved, setIsSaved] = useState(false)

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    // const normFile = e => {
    //     console.log('Upload event:', e);
    //
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //
    //     return e && e.fileList;
    // };

    const onSubmit = (formData) => {
        const data = {
            ...formData,
            birthAt: moment(formData.birthAt).format('YYYY-MM-DD')
        }

        postUser(data).then(() => {
            setIsSaved(true)
        })
    };

    return (
        <div className={'content'}>
            <Form
                name="add_user_form"
                {...formItemLayout}
                onFinish={onSubmit}
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
                    <Input placeholder={t('enterFirstName')}/>
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
                    <Input placeholder={t('enterLastName')}/>
                </Form.Item>

                <Form.Item
                    name={'patronymic'}
                    label={t('patronymic')}
                    hasFeedback
                >
                    <Input placeholder={t('enterPatronymic')}/>
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
                    <Input placeholder={t('enterLogin')}/>
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
                    <Input type={'password'} placeholder={t('enterPassword')}/>
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
                    <Input placeholder={t('enterEmail')}/>
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
                    <Input placeholder={t('enterPhone')}/>
                </Form.Item>

                <Form.Item
                    name={'birthAt'}
                    label={t('birthDate')}
                    hasFeedback
                >
                    <DatePicker format={'YYYY-MM-DD'}/>
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
                    <Select placeholder={t('chooseRole')}>
                        {roles.map(role =>
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
                    <Select placeholder={t('chooseCity')}>
                        {cities.map(city =>
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
                    <Select placeholder={t('chooseCustomer')}>
                        {customers.map(customer =>
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
                    <Select placeholder={t('chooseGender')}>
                        {genders.map(gender =>
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
                    <Select placeholder={t('chooseLocale')}>
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
                    <Checkbox>
                        {t('yes')}
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name={'isPremium'}
                    label={t('isPremium')}
                    hasFeedback
                >
                    <Checkbox>
                        {t('yes')}
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name={'isBanned'}
                    label={t('isBanned')}
                    hasFeedback
                >
                    <Checkbox>
                        {t('yes')}
                    </Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button
                        type="danger"
                        htmlType="submit"
                        icon={<DownloadOutlined/>}
                        block
                        disabled={isSaved}
                    >
                        {t('saveInBase')}
                    </Button>
                </Form.Item>

                {isSaved &&
                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <NavLink to={'/users'}>
                        <Button
                            icon={<WalletOutlined/>}
                            block
                        >
                            Вернуться к списку
                        </Button>
                    </NavLink>
                </Form.Item>
                }
            </Form>
        </div>
    )
};

export default AddUser;