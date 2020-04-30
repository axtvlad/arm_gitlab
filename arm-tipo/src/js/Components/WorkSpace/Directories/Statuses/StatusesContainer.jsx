import {connect} from "react-redux";
import Statuses from "./Statuses";
import {setStatusesCreator} from "../../../../../redux/Reducers/StatusReducer";

let mapStateToProps = (state) => {
    return {
        statuses: state.statusesDir.statuses
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setStatuses: (statuses) => {
            dispatch(setStatusesCreator(statuses))
        }
    }
};

const StatusesContainer = connect(mapStateToProps, mapDispatchToProps)(Statuses);

export default StatusesContainer;