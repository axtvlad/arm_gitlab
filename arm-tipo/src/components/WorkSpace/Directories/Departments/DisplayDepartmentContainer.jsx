import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getDepartmentById} from "../../../../redux/Reducers/DepartmentReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";

class DisplayDepartmentContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {

            let id = this.props.match.params.id;

            if (!id) {
                id = 1
            }

            this.props.getDepartmentById(id);
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
            return (
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.DEPARTMENTS),
        currentItem: state.departmentsDir.currentDepartment,
        isFetching: state.departmentsDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

let DepartmentContainerUrl = withRouter(DisplayDepartmentContainer);

export default connect(mapStateToProps,
    {
        getDepartmentById
    }
)(DepartmentContainerUrl)