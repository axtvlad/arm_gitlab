import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {getTypeById} from "../../../../redux/Reducers/TypeReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";

class DisplayTypeContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            let id = this.props.match.params.id;

            if (!id) {
                id = 1
            }

            this.props.getTypeById(id);
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
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.TYPES),
        currentItem: state.typesDir.currentType,
        isFetching: state.typesDir.isFetching,
        isAdmin: state.authDir.isAdmin
    }
};

let TypeContainerUrl = withRouter(DisplayTypeContainer);

export default connect(mapStateToProps,
    {
        getTypeById
    }
)(TypeContainerUrl);