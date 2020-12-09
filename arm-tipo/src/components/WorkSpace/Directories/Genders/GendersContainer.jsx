import {connect} from "react-redux";
import React from "react";
import Genders from "./Genders";
import {getGenders} from "../../../../redux/Reducers/GenderReducer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class GendersContainer extends React.Component {
    componentDidMount() {
        const {getGenders} = this.props;

        getGenders();
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
        genders: state.gendersDir.genders,
        isFetching: state.gendersDir.isFetching
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getGenders
    })
)(GendersContainer);