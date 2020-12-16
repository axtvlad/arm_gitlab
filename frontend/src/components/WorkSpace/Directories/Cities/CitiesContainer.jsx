import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {compose} from "redux";
import {deleteDirectoryRecordById, getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {selectCities, selectCitiesIsFetching} from "../../../../redux/selectors/CitySelector";

class CitiesContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.cities);
    }

    render() {
        const {isAdmin, cities, isFetching, deleteDirectoryRecordById} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.CITIES}
                isAdmin={isAdmin}
                directory={cities}
                isFetching={isFetching}
                removeItemById={deleteDirectoryRecordById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cities: selectCities(state),
        isFetching: selectCitiesIsFetching(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDirectoryRecords,
        deleteDirectoryRecordById
    })
)(CitiesContainer);
