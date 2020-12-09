import React from "react";
import {connect} from "react-redux";
import Templates from "./Templates";
import {deleteTemplateById, getTemplates} from "../../../../redux/Reducers/TemplateReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class TemplatesContainer extends React.Component {
    componentDidMount() {
        const {getTemplates} = this.props;

        getTemplates();
    }

    render() {
        const {templates, isFetching, isAdmin, deleteTemplateById} = this.props;

        return (
            <Templates
                type={DirectoriesTypes.TEMPLATES}
                templates={templates}
                isFetching={isFetching}
                isAdmin={isAdmin}
                deleteTemplateById={deleteTemplateById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        templates: state.templatesDir.templates,
        isFetching: state.templatesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getTemplates,
        deleteTemplateById
    }
)(TemplatesContainer);