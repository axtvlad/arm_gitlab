import {connect} from "react-redux";
import {setMainDocs, setMainDocsCount, setMainDocsIsFetching} from "../../../../redux/Reducers/MainDocReducer";
import React from "react";
import * as axios from "axios";
import MainDocs from "./MainDocs";
import {BASE_URL} from "../../../../env";

class MainDocsContainer extends React.Component {
    componentDidMount() {
        if (this.props.mainDocs.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setMainDocsIsFetching(true);

            axios
                .get(BASE_URL + '/mainDocs', config)
                .then(response => {
                    this.props.setMainDocs(response.data.data);
                    this.props.setMainDocsCount(response.data.totalCount);

                    console.log('mainDocs: ', response.data.data);

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