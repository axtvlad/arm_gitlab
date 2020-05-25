import {connect} from "react-redux";
import {setMainDocs, setMainDocsCount, setMainDocsIsFetching} from "../../../../redux/Reducers/MainDocReducer";
import React from "react";
import MainDocs from "./MainDocs";
import {systemAPI} from "../../../../api/API";

class MainDocsContainer extends React.Component {
    componentDidMount() {
        if (this.props.mainDocs.length === 0) {

            this.props.setMainDocsIsFetching(true);

            systemAPI.mainDocs.getMainDocs()
                .then(response => {
                    this.props.setMainDocs(response.data);
                    this.props.setMainDocsCount(response.totalCount);

                    console.log('mainDocs: ', response.data);

                    this.props.setMainDocsIsFetching(false);
                });
        }
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
        setMainDocs,
        setMainDocsCount,
        setMainDocsIsFetching,
    }
)(MainDocsContainer);