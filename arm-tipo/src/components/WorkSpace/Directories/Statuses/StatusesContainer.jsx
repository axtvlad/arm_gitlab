import {connect} from "react-redux";
import {setStatusesCountCreator, setStatusesCreator} from "../../../../redux/Reducers/StatusReducer";
import React from "react";
import * as axios from "axios";
import Statuses from "./Statuses";
import {BASE_URL} from "../../../../env";

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

            axios
                .get(BASE_URL + '/statuses', config)
                .then(response => {
                    this.props.setStatuses(response.data.data);
                    this.props.setStatusesCount(response.data.totalCount);
                    console.log('statuses: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <Statuses statuses={this.props.statuses}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        statuses: state.statusesDir.statuses
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setStatuses: (statuses) => {
            dispatch(setStatusesCreator(statuses))
        },
        setStatusesCount: (statusesCount) => {
            dispatch(setStatusesCountCreator(statusesCount))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusesContainer);
