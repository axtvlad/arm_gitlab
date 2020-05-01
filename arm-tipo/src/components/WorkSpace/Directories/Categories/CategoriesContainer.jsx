import {connect} from "react-redux";
import {setCategoriesCountCreator, setCategoriesCreator} from "../../../../redux/Reducers/CategoryReducer";
import React from "react";
import * as axios from "axios";
import Categories from "./Categories";

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

            axios
                .get('http://185.22.66.183:8080/rest/api/categories', config)
                .then(response => {
                    this.props.setCategories(response.data.data);
                    this.props.setCategoriesCount(response.data.totalCount);
                    console.log('categories: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <Categories categories={this.props.categories}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        categories: state.categoriesDir.categories
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCategories: (categories) => {
            dispatch(setCategoriesCreator(categories))
        },
        setCategoriesCount: (categoriesCount) => {
            dispatch(setCategoriesCountCreator(categoriesCount))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);