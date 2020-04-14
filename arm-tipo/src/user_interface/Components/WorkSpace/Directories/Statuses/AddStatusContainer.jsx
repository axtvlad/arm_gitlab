import {connect} from "react-redux";
import AddStatus from "./AddStatus";
import {
    addStatusCreator,
    updateStatusNameKzCreator,
    updateStatusNameRuCreator
} from "../../../../../redux/Reducers/StatusReducer";

let MapStateToProps = (state) => {
    return {
        statusesDir: state.statusesDir
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        addStatus: () => {
            dispatch(addStatusCreator());
        },
        updateStatusNameRu: (name_ru) => {
            dispatch(updateStatusNameRuCreator(name_ru));
        },
        updateStatusNameKz: (name_kz) => {
            dispatch(updateStatusNameKzCreator(name_kz));
        },
    }
};

const AddStatusContainer = connect(MapStateToProps, MapDispatchToProps)(AddStatus);

export default AddStatusContainer;