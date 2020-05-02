import {connect} from "react-redux";
import {setMainDocsCountCreator, setMainDocsCreator} from "../../../../redux/Reducers/MainDocReducer";
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

            axios
                .get(BASE_URL + '/mainDocs', config)
                .then(response => {
                    this.props.setMainDocs(response.data.data);
                    this.props.setMainDocsCount(response.data.totalCount);
                    console.log('mainDocs: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <MainDocs mainDocs={this.props.mainDocs}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        mainDocs: state.mainDocsDir.mainDocs
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setMainDocs: (mainDocs) => {
            dispatch(setMainDocsCreator(mainDocs))
        },
        setMainDocsCount: (mainDocsCount) => {
            dispatch(setMainDocsCountCreator(mainDocsCount))
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(MainDocsContainer);