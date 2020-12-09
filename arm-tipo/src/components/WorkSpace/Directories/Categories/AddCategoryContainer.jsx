import {connect} from "react-redux";
import AddCategory from "./AddCategory";
import {postCategory} from "../../../../redux/Reducers/CategoryReducer";
import * as React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddCategoryContainer extends React.Component {
    render() {
        const {postCategory} = this.props;

        return <AddCategory postCategory={postCategory}/>
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postCategory,
    })
)(AddCategoryContainer)
