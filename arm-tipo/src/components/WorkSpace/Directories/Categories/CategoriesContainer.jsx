import {connect} from "react-redux";
import {getCategories} from "../../../../redux/Reducers/CategoryReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class CategoriesContainer extends React.Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return (
            <Directory
                type={DirectoriesTypes.CATEGORIES}
                isAdmin={this.props.isAdmin}
                directory={this.props.categories}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        categories: state.categoriesDir.categories,
        isFetching: state.categoriesDir.isFetching,
        isAdmin: state.usersDir.isAdmin,
    }
};

export default connect(mapStateToProps,
    {
        getCategories
    }
)(CategoriesContainer);