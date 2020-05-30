import {connect} from "react-redux";
import AddStatus from "./AddStatus";
import {postStatus, updateStatusNameKz, updateStatusNameRu} from "../../../../redux/Reducers/StatusReducer";
import React from "react";
import {Redirect} from "react-router-dom";

class AddStatusContainer extends React.Component {
    render() {
        if (this.props.statusesDir.isPosted) {
            return <Redirect to={'/statuses'}/>
        }

        return (
            <AddStatus {...this.props} />
        )
    }
}

let MapStateToProps = (state) => {
    return {
        statusesDir: state.statusesDir
    }
};

export default connect(MapStateToProps,
    {
        postStatus,
        updateStatusNameRu,
        updateStatusNameKz,
    }
)(AddStatusContainer);