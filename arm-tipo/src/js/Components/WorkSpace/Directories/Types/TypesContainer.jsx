import Types from "./Types";
import {connect} from "react-redux";
import {setTypesCreator} from "../../../../../redux/Reducers/TypeReducer";

let mapStateToProps = (state) => {
    return {
        types: state.typesDir.types
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setTypes: (types) => {
            dispatch(setTypesCreator(types))
        }
    }
};

const TypesContainer = connect(mapStateToProps, mapDispatchToProps)(Types);

export default TypesContainer;