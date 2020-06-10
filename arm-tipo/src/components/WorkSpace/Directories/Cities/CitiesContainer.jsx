import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteCityById, getCities} from "../../../../redux/Reducers/CityReducer";
import {notification, Spin} from "antd";

class CitiesContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.cities.length && this.props.getCities();
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
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
            return (
                <Directory
                    type={DirectoriesTypes.CITIES}
                    isAdmin={this.props.isAdmin}
                    directory={this.props.cities}
                    isFetching={this.props.isFetching}
                    removeItemById={this.props.deleteCityById}
                />
            )
        }
    }
}

let mapStateToProps = (state) => {
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
