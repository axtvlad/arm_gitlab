import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setCurrentStatus, setStatusesIsFetching} from "../../../../redux/Reducers/StatusReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";

class DisplayStatusContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        const user = "Admin";
        const pass = "admin";

        const authorizationBasic = window.btoa(user + ':' + pass)

        const config = {
            'headers': {
                "Authorization": "Basic " + authorizationBasic
            }
        };

        this.props.setStatusesIsFetching(true);

        axios
            .get(BASE_URL + '/statuses/' + id, config)
            .then(response => {
                this.props.setCurrentStatus(response.data.data);

                console.log('status: ', response.data.data);

                this.props.setStatusesIsFetching(false);
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
        type: GetDirectory(DirectoriesTypes.STATUSES),
        currentItem: state.statusesDir.currentStatus,
        isFetching: state.statusesDir.isFetching
    }
};

let StatusContainerUrl = withRouter(DisplayStatusContainer);

export default connect(mapStateToProps, {
    setCurrentStatus,
    setStatusesIsFetching
})
(StatusContainerUrl)