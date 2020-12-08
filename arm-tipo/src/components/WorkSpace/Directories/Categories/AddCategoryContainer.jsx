import {connect} from "react-redux";
import AddCategory from "./AddCategory";
import {postCategory} from "../../../../redux/Reducers/CategoryReducer";
import * as React from "react";
import {notification, Spin} from "antd";

class AddCategoryContainer extends React.Component {
    componentDidMount() {
        const {isAdmin} = this.props;

        if (!isAdmin) {
            this.error()
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
        const {isAdmin, postCategory} = this.props;

        if (!isAdmin) {
            return <Spin/>
        }

        return <AddCategory postCategory={postCategory}/>
    }
}

const MapStateToProps = (state) => {
    return {
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(MapStateToProps,
    {
        postCategory,
    }
)(AddCategoryContainer);