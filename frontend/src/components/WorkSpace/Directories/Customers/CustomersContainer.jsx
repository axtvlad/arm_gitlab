import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {deleteDirectoryRecordById, getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {selectCustomers} from "../../../../redux/selectors/CustomerSelector";
import {selectCategoriesIsFetching} from "../../../../redux/selectors/CategorySelector";

class CustomersContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.customers);
    }

    render() {
        const {isAdmin, customers, isFetching, deleteDirectoryRecordById} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.CUSTOMERS}
                isAdmin={isAdmin}
                directory={customers}
                isFetching={isFetching}
                removeItemById={deleteDirectoryRecordById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: selectCustomers(state),
        isFetching: selectCategoriesIsFetching(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDirectoryRecords,
        deleteDirectoryRecordById
    })
)(CustomersContainer);
