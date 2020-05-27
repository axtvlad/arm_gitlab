import {connect} from "react-redux";
import React from "react";
import Genders from "./Genders";
import {getGenders} from "../../../../redux/Reducers/GenderReducer";

class GendersContainer extends React.Component {
    componentDidMount() {
        this.props.getGenders();
    }

    render() {
        return (
            <Genders
                isAdmin={this.props.isAdmin}
                directory={this.props.genders}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        genders: state.gendersDir.genders,
        isFetching: state.gendersDir.isFetching,
        isAdmin: state.usersDir.isAdmin,
    }
};

export default connect(mapStateToProps,
    {
        getGenders
    }
)(GendersContainer);