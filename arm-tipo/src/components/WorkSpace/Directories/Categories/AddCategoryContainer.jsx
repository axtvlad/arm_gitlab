import {connect} from "react-redux";
import AddCategory from "./AddCategory";
import {addCategory, updateCategoryNameKz, updateCategoryNameRu} from "../../../../redux/Reducers/CategoryReducer";

let MapStateToProps = (state) => {
    return {
        categoriesDir: state.categoriesDir
    }
};

const AddCategoryContainer = connect(MapStateToProps,
    {
        addCategory,
        updateCategoryNameRu,
        updateCategoryNameKz,
    }
)(AddCategory);

export default AddCategoryContainer;