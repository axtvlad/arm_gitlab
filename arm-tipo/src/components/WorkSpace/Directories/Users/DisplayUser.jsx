import React from 'react'
import {Checkbox, Descriptions} from "antd";
import {useTranslation} from "react-i18next";

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
                        label={t('russianName')}
                    >
                        {props.currentUser.lastName + ' ' + props.currentUser.firstName + ' ' + props.currentUser.patronymic}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.birthAt}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.email}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.role_id && role.name_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.city_id && city.name_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.gender_id && gender.name_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.customer_id && customer.name_ru}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.phone}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.login}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.photo}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        {props.currentUser.locale}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        <Checkbox checked={props.currentUser.isPremium}/>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        <Checkbox checked={props.currentUser.isAdmin}/>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('kazakhName')}
                    >
                        <Checkbox checked={props.currentUser.isBanned}/>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </div>
    )
};

export default DisplayDirectoryItem