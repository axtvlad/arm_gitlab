import {connect} from "react-redux";
import {setCategories, setCategoriesCount, setCategoriesIsFetching} from "../../../../redux/Reducers/CategoryReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {restAPI} from "../../../../api/API";

class CategoriesContainer extends React.Component {
    componentDidMount() {
        if (this.props.categories.length === 0) {

            this.props.setCategoriesIsFetching(true);

            restAPI.categories.getCategories()
                .then(response => {
                    this.props.setCategories(response.data);
                    this.props.setCategoriesCount(response.totalCount);

                    console.log('categories: ', response.data);

                    this.props.setCategoriesIsFetching(false);
                });
        }
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
        setCategories,
        setCategoriesCount,
        setCategoriesIsFetching,
    }
)(CategoriesContainer);