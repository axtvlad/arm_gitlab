import TypeReducer from "./Reducers/TypeReducer";
import DepartmentReducer from "./Reducers/DepartmentReducer";
import StatusReducer from "./Reducers/StatusReducer";
import MainDocReducer from "./Reducers/MainDocReducer";
import RolesReducer from "./Reducers/RolesReducer";
import FaqsReducer from "./Reducers/FaqReducer";

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
        rolesDir: {
            roles: [
                {id: 1, name_ru: 'Роль 1', name_kz: 'Роль1'},
                {id: 2, name_ru: 'Роль 2', name_kz: 'Роль2'},
                {id: 3, name_ru: 'Роль 3', name_kz: 'Роль3'},
            ],
            newRoleNameRu: '',
            newRoleNameKz: '',
        },
        faqsDir: {
            faqs: [
                {id: 1, question_ru: 'FAQ 1', question_kz: 'FAQ 1', answer_ru: 'Answer 1', answer_kz: 'Zhauap 1'},
                {id: 2, question_ru: 'FAQ 2', question_kz: 'FAQ 2', answer_ru: 'Answer 2', answer_kz: 'Zhauap 2'},
                {id: 3, question_ru: 'FAQ 3', question_kz: 'FAQ 3', answer_ru: 'Answer 3', answer_kz: 'Zhauap 3'},
            ],
            newFaqQuestionRu: '',
            newFaqQuestionKz: '',
            newFaqAnswerRu: '',
            newFaqAnswerKz: '',
        },
        departmentsDir: {
            departments: [
                {id: 1, name_ru: 'Отдел 1', name_kz: 'Отдел1'},
                {id: 2, name_ru: 'Отдел 2', name_kz: 'Отдел2'},
                {id: 3, name_ru: 'Отдел 3', name_kz: 'Отдел3'},
            ],
            newDepartmentNameRu: '',
            newDepartmentNameKz: '',
        },
        customersDir: {
            customers: [
                {id: 1, name_ru: 'Клиент 1', name_kz: 'Клиент1'},
            ],
            newCustomerNameRu: '',
            newCustomerNameKz: '',
        },
        mainDocsDir: {
            mainDocs: [
                {
                    id: 1,
                    number: 'BBC-991',
                    department_id: 1,
                    status_id: 1,
                    begin_date: '2020-03-02',
                    finish_date: '2030-03-02',
                    pub_date: '2020-03-01',
                    name_ru: 'Приказ о зачислении',
                    name_kz: 'Приказ о зачислении',
                    header_ru: 'Данный приказ о зачислении на очную форму обучения',
                    header_kz: 'Данный приказ о зачислении на очную форму обучения',
                    file_ru: '/src/mainDocs/fsdj8f2oh',
                    file_kz: '/src/mainDocs/fsffsoh94',
                    description_ru: 'Это описание документа на русском',
                    description_kz: 'Это описание документа на казахском',
                    type_id: 1,
                    text_ru: 'Дополнительная информация на русском',
                    text_kz: 'Дополнительная информация на казахском'
                },
            ],
            newMainDocNumber: '',
            newMainDocDepartmentId: null,
            newMainDocStatusId: null,
            newMainDocNameRu: '',
            newMainDocNameKz: '',
            newMainDocBeginDate: null,
            newMainDocFinishDate: null,
            newMainDocPubDate: null,
            newMainDocHeaderRu: '',
            newMainDocHeaderKz: '',
            newMainDocFileRu: '',
            newMainDocFileKz: '',
            newMainDocDescriptionRu: '',
            newMainDocDescriptionKz: '',
            newMainDocTypeId: null,
            newMainDocTextRu: '',
            newMainDocTextKz: '',
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
        this._state.rolesDir = RolesReducer(this._state.rolesDir, action);
        this._state.faqsDir = FaqsReducer(this._state.faqsDir, action);
        this._state.mainDocsDir = MainDocReducer(this._state.mainDocsDir, action);

        this._callSubscriber(this._state);
    },
};

window.store = store;

export default store;