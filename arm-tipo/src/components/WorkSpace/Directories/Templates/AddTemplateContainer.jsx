import {
    deleteTemplateById,
    postTemplate,
    updateTemplateCategoryId,
    updateTemplateFileKz,
    updateTemplateFileRu,
    updateTemplateNameKz,
    updateTemplateNameRu
} from "../../../../redux/Reducers/TemplateReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import React from "react";
import AddTemplate from "./AddTemplate";
import {getCategories} from "../../../../redux/Reducers/CategoryReducer";
import {notification, Spin} from "antd";

class AddTemplateContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, categories, getCategories} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !categories.length && getCategories();
        }
    }

    error() {
        notification['error']({
            message: 'У вас нет прав!',
            description: 'У вас нет прав, чтобы просматривать данный модуль!',
            placement: 'bottomRight'
        })
    }

    render() {
        const {isAdmin, templatesDir} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            if (templatesDir.isPosted) {
                return <Redirect to={'/templates'}/>
            } else {
                return (
                    <AddTemplate {...this.props}/>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        templatesDir: state.templatesDir,
        categories: state.categoriesDir.categories,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps, {
        postTemplate,
        deleteTemplateById,
        updateTemplateNameKz,
        updateTemplateNameRu,
        updateTemplateFileRu,
        updateTemplateFileKz,
        updateTemplateCategoryId,
        getCategories
    }
)(AddTemplateContainer);