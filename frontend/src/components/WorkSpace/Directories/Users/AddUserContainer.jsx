import {postUser} from "../../../../redux/reducers/UserReducer";
import {connect} from "react-redux";
import AddUser from "./AddUser";
import React from 'react';
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {compose} from "redux";
import {getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";

class AddUserContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.roles)
        getDirectoryRecords(DirectoryNameEnum.customers)
        getDirectoryRecords(DirectoryNameEnum.genders)
        getDirectoryRecords(DirectoryNameEnum.cities)
    }


    render() {
        const {postUser, genders, roles, cities, customers} = this.props;

        return (
            <AddUser postUser={postUser} genders={genders} roles={roles} cities={cities} customers={customers}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.directories.roles.recordsList,
        cities: state.directories.cities.recordsList,
        customers: state.directories.customers.recordsList,
        genders: state.directories.genders.recordsList,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        postUser,
        getDirectoryRecords
    })
)(AddUserContainer);
