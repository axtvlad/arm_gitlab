import {connect} from "react-redux";
import {setCities, setCitiesCount, setCitiesIsFetching} from "../../../../redux/Reducers/CityReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {systemAPI} from "../../../../api/API";

class CitiesContainer extends React.Component {
    componentDidMount() {
        if (this.props.cities.length === 0) {

            this.props.setCitiesIsFetching(true);

            systemAPI.cities.getCities()
                .then(response => {
                    this.props.setCities(response.data);
                    this.props.setCitiesCount(response.totalCount);

                    console.log('cities: ', response.data);

                    this.props.setCitiesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Directory
                type={DirectoriesTypes.CITIES}
                isAdmin={this.props.isAdmin}
                directory={this.props.cities}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        cities: state.citiesDir.cities,
        isFetching: state.citiesDir.isFetching,
        isAdmin: state.usersDir.isAdmin,
    }
};

export default connect(mapStateToProps,
    {
        setCities,
        setCitiesCount,
        setCitiesIsFetching,
        setIsAdmin
    }
)(CitiesContainer);
