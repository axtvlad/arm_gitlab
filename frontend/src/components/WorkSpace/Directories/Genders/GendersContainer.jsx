import {connect} from "react-redux";
import React from "react";
import Genders from "./Genders";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";

class GendersContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.genders);
    }

    render() {
        const {isAdmin, genders, isFetching} = this.props;

        return (
            <Genders
                isAdmin={isAdmin}
                directory={genders}
                isFetching={isFetching}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        genders: state.directories.genders.recordsList,
        isFetching: state.directories.genders.isFetching,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDirectoryRecords
    })
)(GendersContainer);