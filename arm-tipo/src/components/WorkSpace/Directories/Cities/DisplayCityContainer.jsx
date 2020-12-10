import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectory from "../../../common/commonComponents/DisplayDirectory";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getCities, getCityById, updateCity} from "../../../../redux/Reducers/CityReducer";
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
        const {isFetching, currentItem, updateCity, type} = this.props;

        return (
            <DisplayDirectory
                isFetching={isFetching}
                currentItem={currentItem}
                onSubmit={updateCity}
                type={type}
            />
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
        getCities,
        updateCity
    }),
    withRouter
)(DisplayCityContainer);