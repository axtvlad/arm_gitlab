import {connect} from "react-redux";
import {deleteCategoryById, getCategories} from "../../../../redux/Reducers/CategoryReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class CategoriesContainer extends React.Component {
    componentDidMount() {
        const {getCategories} = this.props;

        getCategories();
    }

    render() {
        const {isAdmin, categories, isFetching, deleteCategoryById} = this.props;

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

const mapStateToProps = (state) => {
    return {
        categories: state.categoriesDir.categories,
        isFetching: state.categoriesDir.isFetching,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps,
        {
            getCategories,
            deleteCategoryById
        }),
)(CategoriesContainer);