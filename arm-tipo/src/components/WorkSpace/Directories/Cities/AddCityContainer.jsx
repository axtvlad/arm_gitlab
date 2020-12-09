import {connect} from "react-redux";
import {postCity} from "../../../../redux/Reducers/CityReducer";
import AddCity from "./AddCity";
import * as React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddCityContainer extends React.Component {
    render() {
        const {postCity} = this.props;

        return (
            <AddCity postCity={postCity}/>
        )
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postCity
    })
)(AddCityContainer);