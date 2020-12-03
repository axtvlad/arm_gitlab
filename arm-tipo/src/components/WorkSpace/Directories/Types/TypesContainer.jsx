import {connect} from "react-redux";
import {deleteTypeById, getTypes} from "../../../../redux/Reducers/TypeReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";

class TypesContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, types, getTypes} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !types.length && getTypes();
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
        const {isAdmin, types, deleteTypeById, isFetching} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
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
}

const mapStateToProps = (state) => {
    return {
        types: state.typesDir.types,
        isFetching: state.typesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getTypes,
        deleteTypeById
    }
)(TypesContainer);
