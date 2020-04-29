import {connect} from "react-redux";
import Categories from "./Categories";

let mapStateToProps = (state) => {
    return {
        categories: state.categoriesDir.categories
    }
};

const CustomersContainer = connect(mapStateToProps, null)(Categories);

export default CustomersContainer;