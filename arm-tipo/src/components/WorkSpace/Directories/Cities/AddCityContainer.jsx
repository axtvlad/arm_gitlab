import {connect} from "react-redux";
import {addCity, updateCityNameKz, updateCityNameRu} from "../../../../redux/Reducers/CityReducer";
import AddCity from "./AddCity";

let MapStateToProps = (state) => {
    return {
        citiesDir: state.citiesDir
    }
};

const AddCityContainer = connect(MapStateToProps,
    {
        addCity,
        updateCityNameRu,
        updateCityNameKz,
    }
)(AddCity);

export default AddCityContainer;