import {connect} from "react-redux";
import {deleteTypeById, getTypes} from "../../../../redux/Reducers/TypeReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class TypesContainer extends React.Component {
    componentDidMount() {
        const {getTypes} = this.props;

        getTypes();
    }

    render() {
        const {isAdmin, types, deleteTypeById, isFetching} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.TYPES}
                isAdmin={isAdmin}
                directory={types}
                isFetching={isFetching}
                removeItemById={deleteTypeById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        types: state.typesDir.types,
        isFetching: state.typesDir.isFetching,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps,
        {
            getTypes,
            deleteTypeById
        })
)(TypesContainer);
