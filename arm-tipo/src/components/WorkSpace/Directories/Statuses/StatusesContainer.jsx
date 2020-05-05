import {connect} from "react-redux";
import {setStatuses, setStatusesCount, setStatusesIsFetching} from "../../../../redux/Reducers/StatusReducer";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import Directory from "../../../common/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";

class StatusesContainer extends React.Component {
    componentDidMount() {
        if (this.props.statuses.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setStatusesIsFetching(true);

            axios
                .get(BASE_URL + '/statuses', config)
                .then(response => {
                    this.props.setStatuses(response.data.data);
                    this.props.setStatusesCount(response.data.totalCount);

                    console.log('statuses: ', response.data.data);

                    this.props.setStatusesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Directory
                isAdmin={this.props.isAdmin}
                directory={this.props.statuses}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        statuses: state.statusesDir.statuses,
        isFetching: state.statusesDir.isFetching,
        isAdmin: state.usersDir.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        setStatuses,
        setStatusesCount,
        setStatusesIsFetching,
        setIsAdmin
    }
)(StatusesContainer);
