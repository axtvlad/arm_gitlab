import {connect} from "react-redux";
import React from "react";
import MainDocs from "./MainDocs";
import {getMainDocs} from "../../../../redux/Reducers/MainDocReducer";

class MainDocsContainer extends React.Component {
    componentDidMount() {
        !this.props.mainDocs.length &&  this.props.getMainDocs();
    }

    render() {
        return (
            <MainDocs
                mainDocs={this.props.mainDocs}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        mainDocs: state.mainDocsDir.mainDocs,
        isFetching: state.mainDocsDir.isFetching
    }
};

export default connect(mapStateToProps,
    {
        getMainDocs
    }
)(MainDocsContainer);