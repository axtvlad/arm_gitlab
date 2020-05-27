import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setCitiesIsFetching, setCurrentCity} from "../../../../redux/Reducers/CityReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {restAPI} from "../../../../api/API";

class DisplayCityContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.setCitiesIsFetching(true);

        restAPI.cities.getCityById(id)
            .then(response => {
                this.props.setCurrentCity(response.data);

                console.log('city: ', response.data);

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
        type: GetDirectory(DirectoriesTypes.CITIES),
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