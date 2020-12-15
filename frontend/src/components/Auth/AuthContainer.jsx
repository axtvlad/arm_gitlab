import React from 'react'
import {connect} from "react-redux";
import Auth from "./Auth";
import {postAuthUserData} from "../../redux/reducers/AuthReducer";
import {Redirect} from "react-router-dom";

class AuthContainer extends React.Component {
    componentDidMount() {
        const {isAuth} = this.props;

        if (isAuth) {
            return <Redirect to={'/'}/>
        }
    }

    render() {
        const {postAuthUserData} = this.props;

        return <Auth postAuthUserData={postAuthUserData}/>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authDir.isAuth
    }
}

export default connect(mapStateToProps, {
    postAuthUserData
})(AuthContainer);