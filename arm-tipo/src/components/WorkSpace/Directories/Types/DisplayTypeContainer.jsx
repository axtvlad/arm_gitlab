import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {getTypeById} from "../../../../redux/Reducers/TypeReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";

class DisplayTypeContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.getTypeById(id);
    }

    render() {
        return (
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.TYPES),
        currentItem: state.typesDir.currentType,
        isFetching: state.typesDir.isFetching,
    }
};

let TypeContainerUrl = withRouter(DisplayTypeContainer);

export default connect(mapStateToProps,
    {
        getTypeById
    }
)(TypeContainerUrl);