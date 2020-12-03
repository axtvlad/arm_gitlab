import React from 'react'
import {Checkbox, Descriptions} from "antd";
import {useTranslation} from "react-i18next";
import i18n from "../../../../i18n";

const DisplayDirectoryItem = ({currentUser, roles, genders, cities, customers, directory}) => {
    const {t} = useTranslation();

    let role, city, customer, gender;

    if (currentUser.role_id) {
        role = roles.find(role => role.id === currentUser.role_id);
    }
    if (currentUser.city_id) {
        city = cities.find(city => city.id === currentUser.city_id);
    }
    if (currentUser.customer_id) {
        customer = customers.find(customer => customer.id === currentUser.customer_id);
    }
    if (currentUser.gender_id) {
        gender = genders.find(gender => gender.id === currentUser.gender_id);
    }

    return (
        <div className={'content'}>
            {currentUser && (
                <Descriptions
                    title={t(directory) + ': ' + currentUser.firstName}
                    column={1}
                    colon={true}
                >
                    <Descriptions.Item
                        label={t('fio')}
                    >
                        {currentUser.lastName + ' ' + currentUser.firstName + ' ' + currentUser.patronymic}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('birthDate')}
                    >
                        {currentUser.birthAt}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('email')}
                    >
                        {currentUser.email}
                    </Descriptions.Item>
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('roleNameRu')}
                        >
                            {currentUser.role_id && role.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('roleNameKz')}
                        >
                            {currentUser.role_id && role.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('cityNameRu')}
                        >
                            {currentUser.city_id && city.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('cityNameKz')}
                        >
                            {currentUser.city_id && city.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('gender')}
                        >
                            {currentUser.gender_id && gender.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('gender')}
                        >
                            {currentUser.gender_id && gender.name_kz}
                        </Descriptions.Item>}
                    {i18n.language === 'ru' ? <Descriptions.Item
                            label={t('customerNameRu')}
                        >
                            {currentUser.customer_id && customer.name_ru}
                        </Descriptions.Item> :
                        <Descriptions.Item
                            label={t('customerNameKz')}
                        >
                            {currentUser.customer_id && customer.name_kz}
                        </Descriptions.Item>}
                    <Descriptions.Item
                        label={t('phone')}
                    >
                        {currentUser.phone}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('login')}
                    >
                        {currentUser.login}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('userPhoto')}
                    >
                        {currentUser.photo}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('locale')}
                    >
                        {currentUser.locale}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('isPremium') + ' '}
                    >
                        <Checkbox checked={currentUser.isPremium}/>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('isAdmin') + ' '}
                    >
                        <Checkbox checked={currentUser.isAdmin}/>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('isBanned') + ' '}
                    >
                        <Checkbox checked={currentUser.isBanned}/>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </div>
    )
};

export default DisplayDirectoryItem