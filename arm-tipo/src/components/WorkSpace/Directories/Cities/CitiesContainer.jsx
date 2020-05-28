import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {getCities} from "../../../../redux/Reducers/CityReducer";

class CitiesContainer extends React.Component {
    componentDidMount() {
        !this.props.cities.length && this.props.getCities();
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
        getCities
    }
)(CitiesContainer);
