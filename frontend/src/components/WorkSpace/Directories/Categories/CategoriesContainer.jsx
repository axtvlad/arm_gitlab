import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {deleteDirectoryRecordById, getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {selectCategories, selectCategoriesIsFetching} from "../../../../redux/selectors/CategorySelector";

class CategoriesContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.categories);
    }

    render() {
        const {isAdmin, categories, isFetching, deleteDirectoryRecordById} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.CATEGORIES}
                isAdmin={isAdmin}
                directory={categories}
                isFetching={isFetching}
                removeItemById={deleteDirectoryRecordById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: selectCategories(state),
        isFetching: selectCategoriesIsFetching(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDirectoryRecords,
        deleteDirectoryRecordById
    }),
)(CategoriesContainer);