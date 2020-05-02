import {connect} from "react-redux";
import {setCitiesCountCreator, setCitiesCreator} from "../../../../redux/Reducers/CityReducer";
import React from "react";
import * as axios from "axios";
import Cities from "./Cities";
import {BASE_URL} from "../../../../env";

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

            axios
                .get(BASE_URL + '/cities', config)
                .then(response => {
                    this.props.setCities(response.data.data);
                    this.props.setCitiesCount(response.data.totalCount);
                    console.log('cities: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <Cities cities={this.props.cities}/>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        cities: state.citiesDir.cities
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCities: (cities) => {
            dispatch(setCitiesCreator(cities))
        },
        setCitiesCount: (citiesCount) => {
            dispatch(setCitiesCountCreator(citiesCount))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesContainer);
