import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteCityById, getCities} from "../../../../redux/Reducers/CityReducer";
import {notification, Spin} from "antd";

class CitiesContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, cities, getCities} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !cities.length && getCities();
        }
    }

    error() {
        notification['error']({
            message: 'У вас нет прав!',
            description: 'У вас нет прав, чтобы просматривать данный модуль!',
            placement: 'bottomRight'
        })
    }

    render() {
        const {isAdmin, cities, isFetching, deleteCityById} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
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
}

const mapStateToProps = (state) => {
    return {
        cities: state.citiesDir.cities,
        isFetching: state.citiesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getCities,
        deleteCityById
    }
)(CitiesContainer);
