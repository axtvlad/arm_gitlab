import {connect} from "react-redux";
import {setGenders, setGendersIsFetching} from "../../../../redux/Reducers/GenderReducer";
import React from "react";
import Genders from "./Genders";
import {systemAPI} from "../../../../api/API";

class GendersContainer extends React.Component {
    componentDidMount() {
        if (this.props.genders.length === 0) {

            this.props.setGendersIsFetching(true);

            systemAPI.genders.getGenders()
                .then(response => {
                    this.props.setGenders(response.data);

                    console.log('genders: ', response.data);

                    this.props.setGendersIsFetching(false);
                });
        }
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

export default connect(mapStateToProps, {setGendersIsFetching, setGenders})(GendersContainer);