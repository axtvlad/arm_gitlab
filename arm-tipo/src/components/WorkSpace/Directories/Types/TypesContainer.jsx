import {connect} from "react-redux";
import {setTypes, setTypesCount, setTypesIsFetching} from "../../../../redux/Reducers/TypeReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {restAPI} from "../../../../api/API";

class TypesContainer extends React.Component {
    componentDidMount() {
        if (this.props.types.length === 0) {

            this.props.setTypesIsFetching(true);

            restAPI.types.getTypes()
                .then(response => {
                    this.props.setTypes(response.data);
                    this.props.setTypesCount(response.totalCount);

                    console.log('types: ', response.data);

                    this.props.setTypesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Directory
                type={DirectoriesTypes.TYPES}
                isAdmin={this.props.isAdmin}
                directory={this.props.types}
                isFetching={this.props.isFetching}
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
        setTypes,
        setTypesCount,
        setTypesIsFetching,
        setIsAdmin
    }
)(TypesContainer);
