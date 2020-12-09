import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getCategoryById} from "../../../../redux/Reducers/CategoryReducer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class DisplayCategoryContainer extends React.Component {
    componentDidMount() {
        const {match, getCategoryById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getCategoryById(id);
    }

    render() {
        const {isFetching, currentItem, type} = this.props;

        return (
            <DisplayDirectoryItem
                isFetching={isFetching}
                currentItem={currentItem}
                type={type}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CATEGORIES),
        currentItem: state.categoriesDir.currentCategory,
        isFetching: state.categoriesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getCategoryById
    }),
    withRouter
)(DisplayCategoryContainer)