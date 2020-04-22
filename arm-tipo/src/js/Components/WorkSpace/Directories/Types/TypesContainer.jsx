import Types from "./Types";
import {connect} from "react-redux";

let MapStateToProps = (state) => {
    return {
        types: state.typesDir.types
    }
};

const TypesContainer = connect(MapStateToProps, null)(Types);

export default TypesContainer;