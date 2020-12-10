import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {getTypeById, updateType} from "../../../../redux/Reducers/TypeReducer";
import DisplayDirectory from "../../../common/commonComponents/DisplayDirectory";
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
        const {isFetching, currentItem, updateType, type} = this.props;

        return (
            <DisplayDirectory
                isFetching={isFetching}
                currentItem={currentItem}
                type={type}
                onSubmit={updateType}
            />
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
        getTypeById,
        updateType
    }),
    withRouter
)(DisplayTypeContainer);