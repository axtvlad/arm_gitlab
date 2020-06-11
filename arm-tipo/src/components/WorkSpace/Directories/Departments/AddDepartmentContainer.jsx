import {connect} from "react-redux";
import AddDepartment from "./AddDepartment";
import {
    postDepartment,
    updateDepartmentNameKz,
    updateDepartmentNameRu
} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import {Redirect} from "react-router-dom";
import {notification, Spin} from "antd";

class AddDepartmentContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
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
            if (this.props.departmentsDir.isPosted) {
                return <Redirect to={'/departments'}/>
            } else {
                return (
                    <AddDepartment {...this.props}/>
                )
            }
        }
    }
}

let MapStateToProps = (state) => {
    return {
        departmentsDir: state.departmentsDir,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(MapStateToProps,
    {
        postDepartment,
        updateDepartmentNameRu,
        updateDepartmentNameKz,
    }
)(AddDepartmentContainer);