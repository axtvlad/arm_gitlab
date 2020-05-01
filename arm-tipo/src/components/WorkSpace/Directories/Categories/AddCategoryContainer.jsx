import {connect} from "react-redux";
import AddCategory from "./AddCategory";
import {
    addCategoryCreator,
    updateCategoryNameKzCreator,
    updateCategoryNameRuCreator
} from "../../../../redux/Reducers/CategoryReducer";

let MapStateToProps = (state) => {
    return {
        categoriesDir: state.categoriesDir
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        addCategory: () => {
            dispatch(addCategoryCreator());
        },
        updateCategoryNameRu: (name_ru) => {
            dispatch(updateCategoryNameRuCreator(name_ru));
        },
        updateCategoryNameKz: (name_kz) => {
            dispatch(updateCategoryNameKzCreator(name_kz));
        },
    }
};

const AddCategoryContainer = connect(MapStateToProps, MapDispatchToProps)(AddCategory);

export default AddCategoryContainer;