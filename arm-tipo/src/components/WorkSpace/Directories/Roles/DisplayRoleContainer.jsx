import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getRoleById} from "../../../../redux/Reducers/RoleReducer";

class DisplayRoleContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.getRoleById(id);
    }

    render() {
        return (
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.ROLES),
        currentItem: state.rolesDir.currentRole,
        isFetching: state.rolesDir.isFetching,
    }
};

let RoleContainerUrl = withRouter(DisplayRoleContainer);

export default connect(mapStateToProps,
    {
        getRoleById
    }
)(RoleContainerUrl);