import {
    addTypeCreator,
    updateTypeNameKzCreator,
    updateTypeNameRuCreator
} from "../../../../redux/Reducers/TypeReducer";
import {connect} from "react-redux";
import AddType from "./AddType";

let MapStateToProps = (state) => {
    return {
        typesDir: state.typesDir
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        addType: () => {
            dispatch(addTypeCreator());
        },
        updateTypeNameRu: (name_ru) => {
            dispatch(updateTypeNameRuCreator(name_ru));
        },
        updateTypeNameKz: (name_kz) => {
            dispatch(updateTypeNameKzCreator(name_kz));
        },
    }
};

const AddTypeContainer = connect(MapStateToProps, MapDispatchToProps)(AddType);

export default AddTypeContainer;