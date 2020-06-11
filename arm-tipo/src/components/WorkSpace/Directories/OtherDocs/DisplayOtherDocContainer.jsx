import React from "react";
import {Spin} from "antd";
import DisplayOtherDoc from "./DisplayOtherDoc";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getOtherDocById} from "../../../../redux/Reducers/OtherDocReducer";

class DisplayOtherDocContainer extends React.Component {
    componentDidMount() { let id = this.props.match.params.id;
        if (!id) {
            id = 1
        }

        this.props.getOtherDocById(id);
    }

    render() {
        if (!this.props.currentOtherDoc) {
            return <Spin/>
        } else {
            return (
                <DisplayOtherDoc {...this.props}/>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        directory: GetDirectory(DirectoriesTypes.OTHER_DOCS),
        currentOtherDoc: state.otherDocsDir.currentOtherDoc,
    }
};

let DisplayOtherDocContainerUrl = withRouter(DisplayOtherDocContainer);

export default connect(mapStateToProps,
    {
        getOtherDocById
    }
)(DisplayOtherDocContainerUrl);