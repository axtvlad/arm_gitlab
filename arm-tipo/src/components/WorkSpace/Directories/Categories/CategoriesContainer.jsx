import {connect} from "react-redux";
import {deleteCategoryById, getCategories} from "../../../../redux/Reducers/CategoryReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";

class CategoriesContainer extends React.Component {
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
        const {isAdmin, categories, isFetching, deleteCategoryById} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            return (
                <Directory
                    type={DirectoriesTypes.CATEGORIES}
                    isAdmin={isAdmin}
                    directory={categories}
                    isFetching={isFetching}
                    removeItemById={deleteCategoryById}
                />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoriesDir.categories,
        isFetching: state.categoriesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin,
    }
};

export default connect(mapStateToProps,
    {
        getCategories,
        deleteCategoryById
    }
)(CategoriesContainer);