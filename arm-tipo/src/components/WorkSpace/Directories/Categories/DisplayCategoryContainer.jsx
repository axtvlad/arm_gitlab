import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {setCategoriesIsFetching, setCurrentCategory} from "../../../../redux/Reducers/CategoryReducer"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";

class DisplayCategoryContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        const user = "Admin";
        const pass = "admin";

        const authorizationBasic = window.btoa(user + ':' + pass);

        const config = {
            'headers': {
                "Authorization": "Basic " + authorizationBasic
            }
        };

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
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentItem: state.categoriesDir.currentCategory,
        isFetching: state.categoriesDir.isFetching
    }
};

let CategoryContainerUrl = withRouter(DisplayCategoryContainer);

export default connect(mapStateToProps, {
    setCurrentCategory,
    setCategoriesIsFetching
})
(CategoryContainerUrl)