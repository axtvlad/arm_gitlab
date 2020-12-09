import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteCityById, getCities} from "../../../../redux/Reducers/CityReducer";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {compose} from "redux";

class CitiesContainer extends React.Component {
    componentDidMount() {
        const {getCities} = this.props;

        getCities();
    }

    render() {
        const {isAdmin, cities, isFetching, deleteCityById} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.CITIES}
                isAdmin={isAdmin}
                directory={cities}
                isFetching={isFetching}
                removeItemById={deleteCityById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cities: state.citiesDir.cities,
        isFetching: state.citiesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps,
        {
            getCities,
            deleteCityById
        })
)(CitiesContainer);
