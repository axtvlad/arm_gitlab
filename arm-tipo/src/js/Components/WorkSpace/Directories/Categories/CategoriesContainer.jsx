import {connect} from "react-redux";
import Categories from "./Categories";
import {setCategoriesCreator} from "../../../../../redux/Reducers/CategoryReducer";

let mapStateToProps = (state) => {
    return {
        categories: state.categoriesDir.categories
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCategories: (categories) => {
            dispatch(setCategoriesCreator(categories))
        }
    }
};

const CustomersContainer = connect(mapStateToProps, mapDispatchToProps)(Categories);

export default CustomersContainer;