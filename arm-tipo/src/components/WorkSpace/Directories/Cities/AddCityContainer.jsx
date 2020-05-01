import {connect} from "react-redux";
import {
    addCityCreator,
    updateCityNameKzCreator,
    updateCityNameRuCreator
} from "../../../../redux/Reducers/CityReducer";
import AddCity from "./AddCity";

let MapStateToProps = (state) => {
    return {
        citiesDir: state.citiesDir
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        addCity: () => {
            dispatch(addCityCreator());
        },
        updateCityNameRu: (name_ru) => {
            dispatch(updateCityNameRuCreator(name_ru));
        },
        updateCityNameKz: (name_kz) => {
            dispatch(updateCityNameKzCreator(name_kz));
        },
    }
};

const AddCityContainer = connect(MapStateToProps, MapDispatchToProps)(AddCity);

export default AddCityContainer;