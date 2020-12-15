import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import DisplayUser from "./DisplayUser";
import {getUserById} from "../../../../redux/reducers/UserReducer";
import {compose} from "redux";
import {getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";

class DisplayUserContainer extends React.Component {
    componentDidMount() {
        const {match, getDirectoryRecords, getUserById} = this.props;

        getDirectoryRecords(DirectoryNameEnum.roles)
        getDirectoryRecords(DirectoryNameEnum.cities)
        getDirectoryRecords(DirectoryNameEnum.genders)
        getDirectoryRecords(DirectoryNameEnum.customers)

        let userId = match.params.userId;

        if (!userId) {
            userId = 1
        }

        getUserById(userId);
    }

    render() {
        return (
            <DisplayUser {...this.props}/>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        directory: GetDirectory(DirectoriesTypes.USERS),
        currentUser: state.usersDir.currentUser,
        roles: state.directories.roles.recordsList,
        cities: state.directories.cities.recordsList,
        genders: state.directories.genders.recordsList,
        customers: state.directories.customers.recordsList,
    }
};

export default compose(
    connect(mapStateToProps, {
        getUserById,
        getDirectoryRecords
    }),
    withRouter
)(DisplayUserContainer);