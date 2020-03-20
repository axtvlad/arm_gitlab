let store = {
    _state: {
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
    dispatch(action){
        if (action.type === 'ADD_TYPE'){
            let newType = {
                id: 3,
                name_ru: this.getState().directories.newTypeNameRu,
                name_kz: this.getState().directories.newTypeNameKz,
            };
            this.getState().directories.types.push(newType);
            this.getState().directories.newTypeNameRu = '';
            this.getState().directories.newTypeNameKz = '';
            this._callSubscriber(this.getState());
        } else if (action.type === 'UPDATE_TYPE_NAME_RU'){
            this.getState().directories.newTypeNameRu = action.newName;
            this._callSubscriber(this.getState())
        } else if (action.type === 'UPDATE_TYPE_NAME_KZ'){
            this.getState().directories.newTypeNameKz = action.newName;
            this._callSubscriber(this.getState())
        }

    },
};

window.store = store;

export default store;