import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {setCurrentType, setTypesIsFetching} from "../../../../redux/Reducers/TypeReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {systemAPI} from "../../../../api/API";

class DisplayTypeContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.setTypesIsFetching(true);

        systemAPI.types.getTypeById(id)
            .then(response => {
                this.props.setCurrentType(response.data);

                console.log('type: ', response.data);

                this.props.setTypesIsFetching(false);
            });
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
        setCurrentType,
        setTypesIsFetching,
    }
)(TypeContainerUrl);