import {connect} from "react-redux";
import {postCity, updateCityNameKz, updateCityNameRu} from "../../../../redux/Reducers/CityReducer";
import AddCity from "./AddCity";
import * as React from "react";
import {Redirect} from "react-router-dom";

class AddCityContainer extends React.Component {
    render() {
        if (this.props.citiesDir.isPosted) {
            return <Redirect to={'/cities'}/>
        }

        return (
            <AddCity {...this.props}/>
        )
    }
}

let MapStateToProps = (state) => {
    return {
        citiesDir: state.citiesDir
    }
};

export default connect(MapStateToProps,
    {
        postCity,
        updateCityNameRu,
        updateCityNameKz,
    }
)(AddCityContainer);