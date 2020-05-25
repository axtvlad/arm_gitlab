import React from "react";
import {connect} from "react-redux";
import {setTemplates, setTemplatesCount, setTemplatesIsFetching} from "../../../../redux/Reducers/TemplateReducer";
import Templates from "./Templates";
import {systemAPI} from "../../../../api/API";

class TemplatesContainer extends React.Component {
    componentDidMount() {
        if (this.props.templates.length === 0) {

            this.props.setTemplatesIsFetching(true);

            systemAPI.templates.getTemplates()
                .then(response => {
                    this.props.setTemplates(response.data);
                    this.props.setTemplatesCount(response.totalCount);

                    console.log('templates: ', response.data);

                    this.props.setTemplatesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Templates
                templates={this.props.templates}
                isFetching={this.props.isFetching}
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
        setTemplates,
        setTemplatesCount,
        setTemplatesIsFetching,
    }
)(TemplatesContainer);