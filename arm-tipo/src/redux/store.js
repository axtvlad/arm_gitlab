import TypeReducer from "./TypeReducer";
import DepartmentReducer from "./DepartmentReducer";
import StatusReducer from "./StatusReducer";

let store = {
    _state: {
        typesDir: {
            types: [
                {id: 1, name_ru: 'Тип 1', name_kz: 'Тип1'},
                {id: 2, name_ru: 'Тип 2', name_kz: 'Тип2'}
            ],
            newTypeNameRu: '',
            newTypeNameKz: '',
        },
        statusesDir: {
            statuses: [
                {id: 1, name_ru: 'Статус 1', name_kz: 'Статус1'},
                {id: 2, name_ru: 'Статус 2', name_kz: 'Статус2'},
                {id: 3, name_ru: 'Статус 3', name_kz: 'Статус3'},
            ],
            newStatusNameRu: '',
            newStatusNameKz: '',
        },
        departmentsDir: {
            departments: [
                {id: 1, name_ru: 'Отдел 1', name_kz: 'Отдел1'},
                {id: 2, name_ru: 'Отдел 2', name_kz: 'Отдел2'},
                {id: 3, name_ru: 'Отдел 3', name_kz: 'Отдел3'},
            ],
            newDepartmentNameRu: '',
            newDepartmentNameKz: '',
        }
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('ss')
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.typesDir = TypeReducer(this._state.typesDir, action);
        this._state.departmentsDir = DepartmentReducer(this._state.typesDir, action);
        this._state.statusesDir = StatusReducer(this._state.typesDir, action);

        this._callSubscriber(this._state);
    },
};

window.store = store;

export default store;