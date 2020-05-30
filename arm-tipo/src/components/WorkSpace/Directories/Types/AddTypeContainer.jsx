import {postType, updateTypeNameKz, updateTypeNameRu} from "../../../../redux/Reducers/TypeReducer";
import {connect} from "react-redux";
import AddType from "./AddType";
import React from "react";
import {Redirect} from "react-router-dom";

class AddTypeContainer extends React.Component {
    render() {
        if (this.props.typesDir.isPosted) {
            return <Redirect to={'/types'}/>
        }

        return (
            <AddType {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        typesDir: state.typesDir
    }
};

export default connect(mapStateToProps,
    {
        postType,
        updateTypeNameRu,
        updateTypeNameKz,
    }
)(AddTypeContainer);
