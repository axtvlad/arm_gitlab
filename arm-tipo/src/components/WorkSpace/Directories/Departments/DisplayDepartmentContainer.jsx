import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setCurrentDepartment, setDepartmentsIsFetching} from "../../../../redux/Reducers/DepartmentReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";

class DisplayDepartmentContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        const user = "Admin";
        const pass = "admin";

        const authorizationBasic = window.btoa(user + ':' + pass);

        const config = {
            'headers': {
                "Authorization": "Basic " + authorizationBasic
            }
        };

        this.props.setDepartmentsIsFetching(true);

        axios
            .get(BASE_URL + '/departments/' + id, config)
            .then(response => {
                this.props.setCurrentDepartment(response.data.data);

                console.log('department: ', response.data.data);

                this.props.setDepartmentsIsFetching(false);
            });
    }

    render() {
        return (
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentItem: state.departmentsDir.currentDepartment,
        isFetching: state.departmentsDir.isFetching
    }
};

let DepartmentContainerUrl = withRouter(DisplayDepartmentContainer);

export default connect(mapStateToProps, {
    setCurrentDepartment,
    setDepartmentsIsFetching
})
(DepartmentContainerUrl)