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
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.categories.length && this.props.getCategories();
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
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
            if (this.props.templatesDir.isPosted) {
                return <Redirect to={'/templates'}/>
            } else {
                return (
                    <AddTemplate {...this.props}/>
                )
            }
        }
    }
}

let mapStateToProps = (state) => {
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