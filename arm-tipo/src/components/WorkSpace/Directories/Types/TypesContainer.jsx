import {connect} from "react-redux";
import {deleteTypeById, getTypes} from "../../../../redux/Reducers/TypeReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class TypesContainer extends React.Component {
    componentDidMount() {
        !this.props.types.length && this.props.getTypes();
    }

    render() {
        return (
            <Directory
                type={DirectoriesTypes.TYPES}
                isAdmin={this.props.isAdmin}
                directory={this.props.types}
                isFetching={this.props.isFetching}
                removeItemById={this.props.deleteTypeById}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        types: state.typesDir.types,
        isFetching: state.typesDir.isFetching,
        isAdmin: state.usersDir.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getTypes,
        deleteTypeById
    }
)(TypesContainer);
