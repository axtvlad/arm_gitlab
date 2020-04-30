import {connect} from "react-redux";
import MainDocs from "./MainDocs";
import {setMainDocsCreator} from "../../../../../redux/Reducers/MainDocReducer";

let mapStateToProps = (state) => {
    return {
        mainDocs: state.mainDocsDir.mainDocs
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setMainDocs: (mainDocs) => {
            dispatch(setMainDocsCreator(mainDocs))
        }
    }

};

const MainDocsContainer = connect(mapStateToProps, mapDispatchToProps)(MainDocs);

export default MainDocsContainer;