import {connect} from "react-redux";
import MainDocs from "./MainDocs";

let mapStateToProps = (state) => {
    return {
        mainDocs: state.mainDocsDir.mainDocs
    }
};

// let mapDispatchToProps = () => {

//};

const MainDocsContainer = connect(mapStateToProps, null)(MainDocs);

export default MainDocsContainer;