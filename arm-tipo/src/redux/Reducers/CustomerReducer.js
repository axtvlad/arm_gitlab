const ADD_CUSTOMER = 'add_customer';
const UPDATE_CUSTOMER_NAME_RU = 'update_customer_name_ru';
const UPDATE_CUSTOMER_NAME_KZ = 'update_customer_name_kz';

let initialState = {
    customers: [
        {id: 1, name_ru: 'АПК', name_kz: 'АПК'},
    ],
    newCustomerNameRu: '',
    newCustomerNameKz: '',
};

const CustomerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_CUSTOMER:
            return {
                ...state,
                newCustomerNameRu: '',
                newCustomerNameKz: '',
                customers: [...state.customers, {
                    id: 2,
                    name_ru: state.newCustomerNameRu,
                    name_kz: state.newCustomerNameKz,
                }]
            };
        case UPDATE_CUSTOMER_NAME_RU:
            return {
                ...state,
                newCustomerNameRu: action.newNameRu
            };
        case UPDATE_CUSTOMER_NAME_KZ:
            return {
                ...state,
                newCustomerNameKz: action.newNameKz
            };
        default:
            return state;
    }
};


export const addCustomerCreator = () => ({
    type: ADD_CUSTOMER
});

export const updateCustomerNameRuCreator = (newNameRu) => ({
    type: UPDATE_CUSTOMER_NAME_RU,
    newNameRu
});

export const updateCustomerNameKzCreator = (newNameKz) => ({
    type: UPDATE_CUSTOMER_NAME_KZ,
    newNameKz
});

export default CustomerReducer;