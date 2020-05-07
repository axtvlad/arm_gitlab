import {connect} from "react-redux";
import {setGendersIsFetching} from "../../../../redux/Reducers/GenderReducer";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import Genders from "./Genders";

class GendersContainer extends React.Component {
    componentDidMount() {
        if (this.props.genders.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setGendersIsFetching(true);

            axios
                .get(BASE_URL + '/genders', config)
                .then(response => {

                    console.log('genders: ', response.data.data);

                    this.props.setGendersIsFetching(false);
                });
    }
    }

    render() {
        return (
            <Genders
                isAdmin={this.props.isAdmin}
                directory={this.props.genders}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        genders: state.gendersDir.genders,
        isFetching: state.gendersDir.isFetching,
        isAdmin: state.usersDir.isAdmin,
    }
};

export default connect(mapStateToProps, {setGendersIsFetching})(GendersContainer);