import {connect} from "react-redux";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {setCurrentRole, setRolesIsFetching} from "../../../../redux/Reducers/RoleReducer";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";

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
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
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