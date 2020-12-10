import React, {useState} from 'react'
import {Button, Descriptions, Spin} from "antd";
import {useTranslation} from "react-i18next";
import EditDirectory from "../Forms/EditDirectory";

const DisplayDirectory = ({onSubmit, isFetching, currentItem, type}) => {
    const {t} = useTranslation();
    const [editMode, setEditMode] = useState(false);

    const editModeOn = () => {
        setEditMode(true);
    }

    const editModeOff = () => {
        setEditMode(false);
    }

    return (
        <Spin spinning={isFetching}>
            {!editMode &&
            <div className={'content'}>
                {currentItem && (
                    <Descriptions
                        title={`${t(type)}: ${currentItem[0].name_ru}`}
                        column={1}
                        colon={true}
                    >
                        <Descriptions.Item
                            label={t('Наименование на русском')}
                        >
                            {currentItem[0].name_ru}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('Наименование на казахском')}
                        >
                            {currentItem[0].name_kz}
                        </Descriptions.Item>
                    </Descriptions>
                )}
                <Button onClick={editModeOn} type={'primary'}>
                    {t('Редактировать')}
                </Button>
            </div>
            }
            {editMode && <EditDirectory onSubmit={onSubmit} currentItem={currentItem[0]} editModeOff={editModeOff}/>}
        </Spin>
    )
};

export default DisplayDirectory