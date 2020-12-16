import {postTemplate} from "../../../../redux/reducers/TemplateReducer";
import {connect} from "react-redux";
import React from "react";
import AddTemplate from "./AddTemplate";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {selectCategories} from "../../../../redux/selectors/CategorySelector";

class AddTemplateContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.categories);
    }

    render() {
        const {postTemplate, categories} = this.props;

        return (
            <AddTemplate postTemplate={postTemplate} categories={categories}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: selectCategories(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        postTemplate,
        getDirectoryRecords
    })
)(AddTemplateContainer);