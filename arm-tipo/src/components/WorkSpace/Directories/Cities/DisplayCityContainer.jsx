import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectory from "../../../common/commonComponents/DisplayDirectory";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getCities, getCityById} from "../../../../redux/Reducers/CityReducer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class DisplayCityContainer extends React.Component {
    componentDidMount() {
        const {match, getCityById} = this.props

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getCityById(id)
    }

    render() {
        return (
            <DisplayDirectory {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CITIES),
        currentItem: state.citiesDir.currentCity,
        isFetching: state.citiesDir.isFetching,
        cities: state.citiesDir.cities
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getCityById,
        getCities
    }),
    withRouter
)(DisplayCityContainer);