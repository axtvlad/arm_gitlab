import {connect} from "react-redux";
import {postCity, updateCityNameKz, updateCityNameRu} from "../../../../redux/Reducers/CityReducer";
import AddCity from "./AddCity";
import * as React from "react";
import {Redirect} from "react-router-dom";
import {notification} from "antd";
import {Spin} from "antd/es";

class AddCityContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.categories.length && this.props.getCategories();
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
            if (this.props.citiesDir.isPosted) {
                return <Redirect to={'/cities'}/>
            } else {
                return (
                    <AddCity {...this.props}/>
                )
            }
        }
    }
}

let MapStateToProps = (state) => {
    return {
        citiesDir: state.citiesDir,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(MapStateToProps,
    {
        postCity,
        updateCityNameRu,
        updateCityNameKz,
    }
)(AddCityContainer);