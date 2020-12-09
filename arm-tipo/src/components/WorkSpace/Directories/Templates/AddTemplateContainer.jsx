import {postTemplate} from "../../../../redux/Reducers/TemplateReducer";
import {connect} from "react-redux";
import React from "react";
import AddTemplate from "./AddTemplate";
import {getCategories} from "../../../../redux/Reducers/CategoryReducer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddTemplateContainer extends React.Component {
    componentDidMount() {
        const {getCategories} = this.props;

        getCategories();
    }

    render() {
        const {postTemplate, categories} = this.props;

        return (
            <AddTemplate postTemplate={postTemplate} categories={categories}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoriesDir.categories,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        postTemplate,
        getCategories
    })
)(AddTemplateContainer);