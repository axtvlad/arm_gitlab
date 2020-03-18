import {rerender} from "../render";

let state = {
    directories: {
        types: [
            {id: 1, name_ru: 'Тип 1', name_kz: 'Тип1'},
            {id: 2, name_ru: 'Тип 2', name_kz: 'Тип2'}
        ],
        statuses: [
            {id: 1, name_ru: 'Статус 1'},
            {id: 2, name_ru: 'Статус 2'},
            {id: 3, name_ru: 'Статус 3'},
        ],
        departments: [
            {id: 1, name_ru: 'Отдел 1'},
            {id: 2, name_ru: 'Отдел 2'},
            {id: 3, name_ru: 'Отдел 3'},
        ],
        newTypeNameRu: 'bir',
        newTypeNameKz: 'eki',
    }
};

window.state = state;

export let addType = (type) => {
    let newType = {
        id: 3,
        name_ru: type.name_ru,
        name_kz: type.name_kz
    };
    state.directories.types.push(newType);
    rerender(state);
};

export let updateTypeNameRu = (newName) => {
    state.directories.newTypeNameRu = newName;
    rerender(state)
};

export let updateTypeNameKz = (newName) => {
    state.directories.newTypeNameKz = newName;
    rerender(state)
};

export default state;