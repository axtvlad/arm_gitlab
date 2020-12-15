import {notification} from "antd";

export const successfulAdd = (data) => {
    notification['success']({
        message: 'Сохранено!',
        description: `Запись ${data.name_ru} была успешно добавлена!`,
        placement: 'bottomRight'
    });
};