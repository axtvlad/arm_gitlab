import {connect} from "react-redux";
import Cities from "./Cities";
import {setCitiesCreator} from "../../../../../redux/Reducers/CityReducer";

let mapStateToProps = (state) => {
    return {
        cities: state.citiesDir.cities
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCities: (cities) => {
            dispatch(setCitiesCreator(cities))
        }
    }
};

const CitiesContainer = connect(mapStateToProps, mapDispatchToProps)(Cities);

export default CitiesContainer;