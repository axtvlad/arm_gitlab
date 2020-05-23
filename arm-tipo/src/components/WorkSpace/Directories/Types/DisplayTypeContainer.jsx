import {connect} from "react-redux";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {withRouter} from "react-router-dom";
import {setCurrentType, setTypesIsFetching} from "../../../../redux/Reducers/TypeReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";

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
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.TYPES),
        currentItem: state.typesDir.currentType,
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