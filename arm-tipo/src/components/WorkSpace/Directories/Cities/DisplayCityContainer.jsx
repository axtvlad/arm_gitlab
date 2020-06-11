import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getCities, getCityById} from "../../../../redux/Reducers/CityReducer";
import {Spin} from "antd";

class DisplayCityContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.cities.length && this.props.getCities();

            let id = this.props.match.params.id;

            if (!id) {
                id = 1
            }

            this.props.getCityById(id)
        }
    }

    render() {
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
            return (
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CITIES),
        currentItem: state.citiesDir.currentCity,
        isFetching: state.citiesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin,
        cities: state.citiesDir.cities
    }
};

let CityContainerUrl = withRouter(DisplayCityContainer);

export default connect(mapStateToProps,
    {
        getCityById,
        getCities
    }
)(CityContainerUrl)