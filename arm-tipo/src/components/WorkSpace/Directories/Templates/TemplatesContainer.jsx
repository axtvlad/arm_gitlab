import React from "react";
import {connect} from "react-redux";
import Templates from "./Templates";
import {deleteTemplateById, getTemplates} from "../../../../redux/Reducers/TemplateReducer";

class TemplatesContainer extends React.Component {
    componentDidMount() {
        !this.props.templates.length && this.props.getTemplates();
    }

    render() {
        return (
            <Templates
                templates={this.props.templates}
                isFetching={this.props.isFetching}
                deleteTemplateById={this.props.deleteTemplateById}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        templates: state.templatesDir.templates,
        isFetching: state.templatesDir.isFetching
    }
};

export default connect(mapStateToProps,
    {
        getTemplates,
        deleteTemplateById
    }
)(TemplatesContainer);