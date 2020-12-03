import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getCities, getCityById} from "../../../../redux/Reducers/CityReducer";
import {Spin} from "antd";
import {compose} from "redux";

class DisplayCityContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, cities, getCities, match, getCityById} = this.props

        if (!isAdmin) {
            this.error()
        } else {
            !cities.length && getCities();

            let id = match.params.id;

            if (!id) {
                id = 1
            }

            getCityById(id)
        }
    }

    render() {
        const {isAdmin} = this.props

        if (!isAdmin) {
            return <Spin/>
        } else {
            return (
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CITIES),
        currentItem: state.citiesDir.currentCity,
        isFetching: state.citiesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin,
        cities: state.citiesDir.cities
    }
};

export default compose(
    connect(mapStateToProps, {
        getCityById,
        getCities
    }),
    withRouter
)(DisplayCityContainer);