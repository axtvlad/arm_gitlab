import {connect} from "react-redux";
import AddStatus from "./AddStatus";
import {addStatus, updateStatusNameKz, updateStatusNameRu} from "../../../../redux/Reducers/StatusReducer";

let MapStateToProps = (state) => {
    return {
        statusesDir: state.statusesDir
    }
};

const AddStatusContainer = connect(MapStateToProps,
    {
        addStatus,
        updateStatusNameRu,
        updateStatusNameKz,
    }
)(AddStatus);

export default AddStatusContainer;