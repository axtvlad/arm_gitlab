import {connect} from "react-redux";
import {postMainDoc} from "../../../../redux/Reducers/MainDocReducer";
import {getTypes} from "../../../../redux/Reducers/TypeReducer";
import {getDepartments} from "../../../../redux/Reducers/DepartmentReducer";
import {getStatuses} from "../../../../redux/Reducers/StatusReducer";
import AddMainDoc from "./AddMainDoc";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddMainDocContainer extends React.Component {
    componentDidMount() {
        const {getTypes, getDepartments, getStatuses} = this.props;

        getTypes()
        getStatuses()
        getDepartments()
    }

    render() {
        const {types, departments, statuses, postMainDoc} = this.props;

        return (
            <AddMainDoc types={types} departments={departments} statuses={statuses} postMainDoc={postMainDoc}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        types: state.typesDir.types,
        departments: state.departmentsDir.departments,
        statuses: state.statusesDir.statuses,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        postMainDoc,
        getTypes,
        getDepartments,
        getStatuses,
    })
)(AddMainDocContainer);