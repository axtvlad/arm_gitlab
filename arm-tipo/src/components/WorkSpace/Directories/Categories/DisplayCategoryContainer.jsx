import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import DisplayCategory from "./DisplayCategory";
import {setCurrentCategory, setCategoriesIsFetching} from "../../../../redux/Reducers/CategoryReducer"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class DisplayCategoryContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        const user = "Admin"
        const pass = "admin"

        const authorizationBasic = window.btoa(user + ':' + pass)

        const config = {
            'headers': {
                "Authorization": "Basic " + authorizationBasic
            }
        }

        this.props.setCategoriesIsFetching(true);

        axios
            .get(BASE_URL + '/categories/' + id, config)
            .then(response => {
                this.props.setCurrentCategory(response.data.data);

                console.log('category: ', response.data.data);

                this.props.setCategoriesIsFetching(false);
            });
    }

    render() {
        return (
            <DisplayCategory {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentCategory: state.categoriesDir.currentCategory,
        isFetching: state.categoriesDir.isFetching
    }
};

let CategoryContainerUrl = withRouter(DisplayCategoryContainer)

export default connect(mapStateToProps, {
    setCurrentCategory,
    setCategoriesIsFetching
})
(CategoryContainerUrl)