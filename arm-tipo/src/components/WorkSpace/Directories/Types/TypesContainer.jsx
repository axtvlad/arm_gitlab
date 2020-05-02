import {connect} from "react-redux";
import {setTypesCountCreator, setTypesCreator, setTypesIsFetchingCreator} from "../../../../redux/Reducers/TypeReducer";
import React from "react";
import * as axios from "axios";
import Types from "./Types";
import {BASE_URL} from "../../../../env";

class TypesContainer extends React.Component {
    componentDidMount() {
        if (this.props.types.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setTypesIsFetching(true);

            axios
                .get(BASE_URL + '/types', config)
                .then(response => {
                    this.props.setTypes(response.data.data);
                    this.props.setTypesCount(response.data.totalCount);

                    console.log('types: ', response.data.data);

                    this.props.setTypesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Types
                types={this.props.types}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        types: state.typesDir.types,
        isFetching: state.typesDir.isFetching
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setTypes: (types) => {
            dispatch(setTypesCreator(types))
        },
        setTypesCount: (typesCount) => {
            dispatch(setTypesCountCreator(typesCount))
        },
        setTypesIsFetching: (isFetching) => {
            dispatch(setTypesIsFetchingCreator(isFetching))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TypesContainer);
