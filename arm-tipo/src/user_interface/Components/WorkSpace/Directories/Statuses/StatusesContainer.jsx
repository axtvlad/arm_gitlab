import {connect} from "react-redux";
import Statuses from "./Statuses";

let mapStateToProps = (state) => {
    return {
        statuses: state.statusesDir.statuses
    }
};

const StatusesContainer = connect(mapStateToProps, null)(Statuses);

export default StatusesContainer;