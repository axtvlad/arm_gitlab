import {connect} from "react-redux";
import Cities from "./Cities";

let mapStateToProps = (state) => {
    return {
        cities: state.citiesDir.cities
    }
};

const CitiesContainer = connect(mapStateToProps, null)(Cities);

export default CitiesContainer;