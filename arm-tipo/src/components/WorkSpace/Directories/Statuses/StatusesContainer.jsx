import {connect} from "react-redux";
import {setStatuses, setStatusesCount, setStatusesIsFetching} from "../../../../redux/Reducers/StatusReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {systemAPI} from "../../../../api/API";

class StatusesContainer extends React.Component {
    componentDidMount() {
        if (this.props.statuses.length === 0) {

            this.props.setStatusesIsFetching(true);

            systemAPI.statuses.getStatuses()
                .then(response => {
                    this.props.setStatuses(response.data);
                    this.props.setStatusesCount(response.totalCount);

                    console.log('statuses: ', response.data);

                    this.props.setStatusesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Directory
                type={DirectoriesTypes.STATUSES}
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
