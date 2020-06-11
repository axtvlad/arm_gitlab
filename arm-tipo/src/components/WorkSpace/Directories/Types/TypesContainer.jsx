import {connect} from "react-redux";
import {deleteTypeById, getTypes} from "../../../../redux/Reducers/TypeReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";

class TypesContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.types.length && this.props.getTypes();
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
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
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
}

let mapStateToProps = (state) => {
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
