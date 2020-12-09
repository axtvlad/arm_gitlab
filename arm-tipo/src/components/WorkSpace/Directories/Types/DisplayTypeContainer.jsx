import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {getTypeById} from "../../../../redux/Reducers/TypeReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class DisplayTypeContainer extends React.Component {
    componentDidMount() {
        const {match, getTypeById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getTypeById(id);
    }

    render() {
        return (
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.TYPES),
        currentItem: state.typesDir.currentType,
        isFetching: state.typesDir.isFetching,
    }
};


export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getTypeById
    }),
    withRouter
)(DisplayTypeContainer);