import React from "react";
import {connect} from "react-redux";
import {setTemplates, setTemplatesCount, setTemplatesIsFetching} from "../../../../redux/Reducers/TemplateReducer";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import Templates from "./Templates";

class TemplatesContainer extends React.Component {
    componentDidMount() {
        if (this.props.templates.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setTemplatesIsFetching(true);

            axios
                .get(BASE_URL + '/templates', config)
                .then(response => {
                    this.props.setTemplates(response.data.data);
                    this.props.setTemplatesCount(response.data.totalCount);

                    console.log('templates: ', response.data.data);

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