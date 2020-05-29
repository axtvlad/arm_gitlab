import {postType, updateTypeNameKz, updateTypeNameRu} from "../../../../redux/Reducers/TypeReducer";
import {connect} from "react-redux";
import AddType from "./AddType";

let MapStateToProps = (state) => {
    return {
        typesDir: state.typesDir
    }
};

const AddTypeContainer = connect(MapStateToProps,
    {
        postType,
        updateTypeNameRu,
        updateTypeNameKz,
    }
)(AddType);

export default AddTypeContainer;