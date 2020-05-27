import React from "react";
import {setCategoriesIsFetching, setCurrentCategory} from "../../../../redux/Reducers/CategoryReducer"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {restAPI} from "../../../../api/API";

class DisplayCategoryContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.setCategoriesIsFetching(true);

        restAPI.categories.getCategoryById(id)
            .then(response => {
                this.props.setCurrentCategory(response.data);

                console.log('category: ', response.data);

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
        type: GetDirectory(DirectoriesTypes.CATEGORIES),
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