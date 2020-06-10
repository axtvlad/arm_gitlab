import {connect} from "react-redux";
import AddCategory from "./AddCategory";
import {postCategory, updateCategoryNameKz, updateCategoryNameRu} from "../../../../redux/Reducers/CategoryReducer";
import * as React from "react";
import {notification, Spin} from "antd";
import {Redirect} from "react-router-dom";

class AddCategoryContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
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
            if (this.props.categoriesDir.isPosted) {
                return <Redirect to={'/cities'}/>
            } else {
                return (
                    <AddCategory {...this.props}/>
                )
            }
        }
    }
}

let MapStateToProps = (state) => {
    return {
        categoriesDir: state.categoriesDir,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(MapStateToProps,
    {
        postCategory,
        updateCategoryNameRu,
        updateCategoryNameKz,
    }
)(AddCategoryContainer);