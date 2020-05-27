import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setCurrentStatus, setStatusesIsFetching} from "../../../../redux/Reducers/StatusReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {restAPI} from "../../../../api/API";

class DisplayStatusContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.setStatusesIsFetching(true);

        restAPI.statuses.getStatusById(id)
            .then(response => {
                this.props.setCurrentStatus(response.data);

                console.log('status: ', response.data);

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