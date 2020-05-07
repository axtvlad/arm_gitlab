import {connect} from "react-redux";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {withRouter} from "react-router-dom";
import {setCurrentType, setTypesIsFetching} from "../../../../redux/Reducers/TypeReducer";
import DisplayType from "./DisplayType";

class DisplayTypeContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        if (!id) {
            id = 1
        }

        const user = "Admin";
        const pass = "admin";

        const authorizationBasic = window.btoa(user + ':' + pass);
        const config = {
            "headers": {
                "Authorization": "Basic " + authorizationBasic
            }
        };

        this.props.setTypesIsFetching(true);

        axios
            .get(BASE_URL + '/types/' + id, config)
            .then(response => {
                this.props.setCurrentType(response.data.data);

                console.log('type: ', response.data.data);

                this.props.setTypesIsFetching(false);
            });

    }

    render() {
        return (
            <DisplayType {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentType: state.typesDir.currentType,
        isFetching: state.typesDir.isFetching,
    }
};

let TypeContainerUrl = withRouter(DisplayTypeContainer);

export default connect(mapStateToProps,
    {
        setCurrentType,
        setTypesIsFetching,
    }
)(TypeContainerUrl);