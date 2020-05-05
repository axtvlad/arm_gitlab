import {connect} from "react-redux";
import {setCities, setCitiesCount, setCitiesIsFetching} from "../../../../redux/Reducers/CityReducer";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import Directory from "../../../common/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";

class CitiesContainer extends React.Component {
    componentDidMount() {
        if (this.props.cities.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setCitiesIsFetching(true);

            axios
                .get(BASE_URL + '/cities', config)
                .then(response => {
                    this.props.setCities(response.data.data);
                    this.props.setCitiesCount(response.data.totalCount);

                    console.log('cities: ', response.data.data);

                    this.props.setCitiesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Directory
                isAdmin={this.props.isAdmin}
                directory={this.props.cities}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        cities: state.citiesDir.cities,
        isFetching: state.citiesDir.isFetching,
        isAdmin: state.usersDir.isAdmin,
    }
};

export default connect(mapStateToProps,
    {
        setCities,
        setCitiesCount,
        setCitiesIsFetching,
        setIsAdmin
    }
)(CitiesContainer);
