import {connect} from "react-redux";
import {setTypesCountCreator, setTypesCreator} from "../../../../redux/Reducers/TypeReducer";
import React from "react";
import * as axios from "axios";
import Types from "./Types";

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

            axios
                .get('http://185.22.66.183:8080/rest/api/types', config)
                .then(response => {
                    this.props.setTypes(response.data.data);
                    this.props.setTypesCount(response.data.totalCount);
                    console.log('types: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <Types types={this.props.types}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        types: state.typesDir.types
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setTypes: (types) => {
            dispatch(setTypesCreator(types))
        },
        setTypesCount: (typesCount) => {
            dispatch(setTypesCountCreator(typesCount))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TypesContainer);
