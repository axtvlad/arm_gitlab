import {connect} from "react-redux";
import {
    setCategoriesCountCreator,
    setCategoriesCreator,
    setCategoriesIsFetchingCreator
} from "../../../../redux/Reducers/CategoryReducer";
import React from "react";
import * as axios from "axios";
import Categories from "./Categories";
import {BASE_URL} from "../../../../env";

class CategoriesContainer extends React.Component {
    componentDidMount() {
        if (this.props.categories.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setCategoriesIsFetching(true);

            axios
                .get(BASE_URL + '/categories', config)
                .then(response => {
                    this.props.setCategories(response.data.data);
                    this.props.setCategoriesCount(response.data.totalCount);

                    console.log('categories: ', response.data.data);

                    this.props.setCategoriesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Categories
                categories={this.props.categories}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        categories: state.categoriesDir.categories,
        isFetching: state.categoriesDir.isFetching
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCategories: (categories) => {
            dispatch(setCategoriesCreator(categories))
        },
        setCategoriesCount: (categoriesCount) => {
            dispatch(setCategoriesCountCreator(categoriesCount))
        },
        setCategoriesIsFetching: (isFetching) => {
            dispatch(setCategoriesIsFetchingCreator(isFetching))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);