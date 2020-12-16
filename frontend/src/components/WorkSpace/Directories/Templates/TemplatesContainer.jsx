import React from "react";
import {connect} from "react-redux";
import Templates from "./Templates";
import {deleteTemplateById, getTemplates} from "../../../../redux/reducers/TemplateReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {selectIsAdmin} from "../../../../redux/selectors/AuthSelector";
import {selectTemplates, selectTemplatesIsFetching} from "../../../../redux/selectors/TemplateSelector";

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
        templates: selectTemplates(state),
        isFetching: selectTemplatesIsFetching(state),
        isAdmin: selectIsAdmin(state)
    }
};

export default connect(mapStateToProps, {
    getTemplates,
    deleteTemplateById
})(TemplatesContainer);