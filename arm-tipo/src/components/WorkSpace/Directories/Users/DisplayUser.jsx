import React from 'react'
import {Checkbox, Descriptions, Spin} from "antd";
import {useTranslation} from "react-i18next";

const DisplayDirectoryItem = (props) => {
    const {t} = useTranslation();

    let role = props.roles.find(role => role.id === props.currentItem.role_id);
    let city = props.cities.find(city => city.id === props.currentItem.city_id);
    let customer = props.customers.find(customer => customer.id === props.currentItem.customer_id);
    let gender = props.genders.find(gender => gender.id === props.currentItem.gender_id);

    return (
        <Spin spinning={props.isFetching}>
            <div className={'content'}>
                {props.currentItem && (
                    <Descriptions
                        title={t(props.user) + ': ' + props.currentItem.firstName}
                        column={1}
                        colon={true}
                    >
                        <Descriptions.Item
                            label={t('russianName')}
                        >
                            {props.currentItem.lastName + ' ' + props.currentItem.firstName + ' ' + props.currentItem.patronymic}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {props.currentItem.birthAt}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {props.currentItem.email}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {role.name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {city.name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {gender.name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {customer.name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {props.currentItem.phone}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {props.currentItem.login}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {props.currentItem.photo}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            {props.currentItem.locale}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            <Checkbox checked={props.currentItem.isPremium}/>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            <Checkbox checked={props.currentItem.isAdmin}/>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('kazakhName')}
                        >
                            <Checkbox checked={props.currentItem.isBanned}/>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </div>
        </Spin>
    )
};

export default DisplayDirectoryItem