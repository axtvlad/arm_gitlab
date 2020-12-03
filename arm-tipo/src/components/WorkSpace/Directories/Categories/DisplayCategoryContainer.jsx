import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getCategoryById} from "../../../../redux/Reducers/CategoryReducer";
import {notification, Spin} from "antd";
import {compose} from "redux";

class DisplayCategoryContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, match, getCategoryById} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            let id = match.params.id;

            if (!id) {
                id = 1
            }

            getCategoryById(id);
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
        const {isAdmin, isFetching, currentItem, type} = this.props;
        if (!isAdmin) {
            return <Spin/>
        } else {
            return (
                <DisplayDirectoryItem
                    isFetching={isFetching}
                    currentItem={currentItem}
                    type={type}
                />
            )
        }
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
    connect(mapStateToProps, {
        getCategoryById
    }),
    withRouter
)(DisplayCategoryContainer)