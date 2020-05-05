import {connect} from "react-redux";
import {setTypes, setTypesCount, setTypesIsFetching} from "../../../../redux/Reducers/TypeReducer";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import Directory from "../../../common/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";

class TypesContainer extends React.Component {
    componentDidMount() {
        if (this.props.types.length === 0) {
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
                .get(BASE_URL + '/types', config)
                .then(response => {
                    this.props.setTypes(response.data.data);
                    this.props.setTypesCount(response.data.totalCount);

                    console.log('types: ', response.data.data);

                    this.props.setTypesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Directory
                isAdmin={this.props.isAdmin}
                directory={this.props.types}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        types: state.typesDir.types,
        isFetching: state.typesDir.isFetching,
        isAdmin: state.usersDir.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        setTypes,
        setTypesCount,
        setTypesIsFetching,
        setIsAdmin
    }
)(TypesContainer);
