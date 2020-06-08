import React from 'react'
import {Checkbox, Descriptions} from "antd";
import {useTranslation} from "react-i18next";
import i18n from "../../../../i18n";

const DisplayDirectoryItem = (props) => {
    const {t} = useTranslation();

    let role, city, customer, gender;

    if (props.currentUser.role_id) {
        role = props.roles.find(role => role.id === props.currentUser.role_id);
    }
    if (props.currentUser.city_id) {
        city = props.cities.find(city => city.id === props.currentUser.city_id);
    }
    if (props.currentUser.customer_id) {
        customer = props.customers.find(customer => customer.id === props.currentUser.customer_id);
    }
    if (props.currentUser.gender_id) {
        gender = props.genders.find(gender => gender.id === props.currentUser.gender_id);
    }

    return (
        <div className={'content'}>
            {props.currentUser && (
                <Descriptions
                    title={t(props.directory) + ': ' + props.currentUser.firstName}
                    column={1}
                    colon={true}
                >
                    <Descriptions.Item
                        label={t('fio')}
                    >
                        {props.currentUser.lastName + ' ' + props.currentUser.firstName + ' ' + props.currentUser.patronymic}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('birthDate')}
                    >
                        {props.currentUser.birthAt}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('email')}
                    >
                        {props.currentUser.email}
                    </Descriptions.Item>
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('roleNameRu')}
                        >
                            {props.currentUser.role_id && role.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('roleNameKz')}
                        >
                            {props.currentUser.role_id && role.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('cityNameRu')}
                        >
                            {props.currentUser.city_id && city.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('cityNameKz')}
                        >
                            {props.currentUser.city_id && city.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('gender')}
                        >
                            {props.currentUser.gender_id && gender.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('gender')}
                        >
                            {props.currentUser.gender_id && gender.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('customerNameRu')}
                        >
                            {props.currentUser.customer_id && customer.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('customerNameKz')}
                        >
                            {props.currentUser.customer_id && customer.name_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('phone')}
                    >
                        {props.currentUser.phone}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('login')}
                    >
                        {props.currentUser.login}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('userPhoto')}
                    >
                        {props.currentUser.photo}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('locale')}
                    >
                        {props.currentUser.locale}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('isPremium') + ' '}
                    >
                        <Checkbox checked={props.currentUser.isPremium}/>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('isAdmin') + ' '}
                    >
                        <Checkbox checked={props.currentUser.isAdmin}/>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('isBanned') + ' '}
                    >
                        <Checkbox checked={props.currentUser.isBanned}/>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </div>
    )
};

export default DisplayDirectoryItem