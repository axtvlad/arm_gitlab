import {
    deleteTemplateById,
    postTemplate,
    updateTemplateCategoryId,
    updateTemplateFileNameKz,
    updateTemplateFileNameRu,
    updateTemplateNameKz,
    updateTemplateNameRu
} from "../../../../redux/Reducers/TemplateReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import React from "react";
import AddTemplate from "./AddTemplate";
import {getCategories} from "../../../../redux/Reducers/CategoryReducer";

class AddTemplateContainer extends React.Component {
    componentDidMount() {
        !this.props.categories.length && this.props.getCategories();
    }

    render() {
        if (this.props.templatesDir.isPosted) {
            return <Redirect to={'/templates'}/>
        }

        return (
            <AddTemplate {...this.props}/>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        templatesDir: state.templatesDir,
        categories: state.categoriesDir.categories
    }
};

export default connect(mapStateToProps, {
        postTemplate,
        deleteTemplateById,
        updateTemplateNameRu,
        updateTemplateNameKz,
        updateTemplateFileNameRu,
        updateTemplateFileNameKz,
        updateTemplateCategoryId,
        getCategories
    }
)(AddTemplateContainer);