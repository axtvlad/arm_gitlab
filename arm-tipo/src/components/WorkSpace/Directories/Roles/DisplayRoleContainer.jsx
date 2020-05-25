import {connect} from "react-redux";
import React from "react";
import {setCurrentRole, setRolesIsFetching} from "../../../../redux/Reducers/RoleReducer";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {systemAPI} from "../../../../api/API";

class DisplayRoleContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.setRolesIsFetching(true);

        systemAPI.roles.getRolesById(id)
            .then(response => {
                this.props.setCurrentRole(response.data);

                console.log('role: ', response.data);

                this.props.setRolesIsFetching(false);
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
        type: GetDirectory(DirectoriesTypes.ROLES),
        currentItem: state.rolesDir.currentRole,
        isFetching: state.rolesDir.isFetching,
    }
};

let RoleContainerUrl = withRouter(DisplayRoleContainer);

export default connect(mapStateToProps,
    {
        setCurrentRole,
        setRolesIsFetching,
    }
)(RoleContainerUrl);