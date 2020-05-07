import {connect} from "react-redux";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {setCurrentRole, setRolesIsFetching} from "../../../../redux/Reducers/RoleReducer";
import {withRouter} from "react-router-dom";
import DisplayRole from "./DisplayRole";

class DisplayRoleContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        if (!id) {
            id = 1
        }

        const user = "Admin";
        const pass = "admin";

        const authorizationBasic = window.btoa(user + ':' + pass);
        const config = {
            "headers": {
                "Authorization": "Basic " + authorizationBasic
            }
        };

        this.props.setRolesIsFetching(true);

        axios
            .get(BASE_URL + '/roles/' + id, config)
            .then(response => {
                this.props.setCurrentRole(response.data.data);

                console.log('role: ', response.data.data);

                this.props.setRolesIsFetching(false);
            });

    }

    render() {
        return (
            <DisplayRole {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentRole: state.rolesDir.currentRole,
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