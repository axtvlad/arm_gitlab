import {connect} from "react-redux";
import AddCategory from "./AddCategory";
import {postCategory, updateCategoryNameKz, updateCategoryNameRu} from "../../../../redux/Reducers/CategoryReducer";
import * as React from "react";

class AddCategoryContainer extends React.Component {
    render() {
        return (
            <AddCategory {...this.props}/>
        )
    }
}

let MapStateToProps = (state) => {
    return {
        categoriesDir: state.categoriesDir
    }
};

export default connect(MapStateToProps,
    {
        postCategory,
        updateCategoryNameRu,
        updateCategoryNameKz,
    }
)(AddCategoryContainer);