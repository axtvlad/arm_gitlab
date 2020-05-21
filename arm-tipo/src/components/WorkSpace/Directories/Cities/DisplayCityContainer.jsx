import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setCitiesIsFetching, setCurrentCity} from "../../../../redux/Reducers/CityReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";

class DisplayCityContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        const user = "Admin";
        const pass = "admin";

        const authorizationBasic = window.btoa(user + ':' + pass);

        const config = {
            'headers': {
                "Authorization": "Basic " + authorizationBasic
            }
        };

        this.props.setCitiesIsFetching(true);

        axios
            .get(BASE_URL + '/cities/' + id, config)
            .then(response => {
                this.props.setCurrentCity(response.data.data);

                console.log('city: ', response.data.data);

                this.props.setCitiesIsFetching(false);
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
        currentItem: state.citiesDir.currentCity,
        isFetching: state.citiesDir.isFetching
    }
};

let CityContainerUrl = withRouter(DisplayCityContainer);

export default connect(mapStateToProps, {
    setCurrentCity,
    setCitiesIsFetching
})
(CityContainerUrl)