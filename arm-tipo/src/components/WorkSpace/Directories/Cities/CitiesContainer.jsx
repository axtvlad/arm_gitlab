import {connect} from "react-redux";
import {
    setCitiesCountCreator,
    setCitiesCreator,
    setCitiesIsFetchingCreator
} from "../../../../redux/Reducers/CityReducer";
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
            <Cities
                cities={this.props.cities}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        cities: state.citiesDir.cities,
        isFetching: state.citiesDir.isFetching
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCities: (cities) => {
            dispatch(setCitiesCreator(cities))
        },
        setCitiesCount: (citiesCount) => {
            dispatch(setCitiesCountCreator(citiesCount))
        },
        setCitiesIsFetching: (isFetching) => {
            dispatch(setCitiesIsFetchingCreator(isFetching))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesContainer);
