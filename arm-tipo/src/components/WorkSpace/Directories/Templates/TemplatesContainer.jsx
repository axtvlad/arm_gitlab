import React from "react";
import {connect} from "react-redux";
import Templates from "./Templates";
import {deleteTemplateById, getTemplates} from "../../../../redux/Reducers/TemplateReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class TemplatesContainer extends React.Component {
    componentDidMount() {
        !this.props.templates.length && this.props.getTemplates();
    }

    render() {
        return (
            <Templates
                type={DirectoriesTypes.TEMPLATES}
                templates={this.props.templates}
                isFetching={this.props.isFetching}
                isAdmin={this.props.isAdmin}
                deleteTemplateById={this.props.deleteTemplateById}
            />
        )
    }
}

let mapStateToProps = (state) => {
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