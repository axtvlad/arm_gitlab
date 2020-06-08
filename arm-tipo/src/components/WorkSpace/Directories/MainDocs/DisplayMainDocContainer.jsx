import {connect} from "react-redux";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {withRouter} from "react-router-dom";
import {getTypes} from "../../../../redux/Reducers/TypeReducer";
import {getStatuses} from "../../../../redux/Reducers/StatusReducer";
import {getDepartments} from "../../../../redux/Reducers/DepartmentReducer";
import {getMainDocById} from "../../../../redux/Reducers/MainDocReducer";
import React from "react";
import {Spin} from "antd";
import DisplayMainDoc from "./DisplayMainDoc";

class DisplayMainDocContainer extends React.Component {
    componentDidMount() {
        !this.props.departments.length && this.props.getDepartments();
        !this.props.statuses.length && this.props.getStatuses();
        !this.props.types.length && this.props.getTypes();

        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.getMainDocById(id);
    }

    render() {
        if (!this.props.currentMainDoc
            || !this.props.departments.length
            || !this.props.statuses.length
            || !this.props.types.length
        ) {
            return <Spin/>
        } else {
            return (
                <DisplayMainDoc {...this.props}/>
            )
        }
    }
}


let mapStateToProps = (state) => {
    return {
        directory: GetDirectory(DirectoriesTypes.MAIN_DOCS),
        currentMainDoc: state.mainDocsDir.currentMainDoc,
        departments: state.departmentsDir.departments,
        statuses: state.statusesDir.statuses,
        types: state.typesDir.types,
    }
};

let DisplayMainDocContainerUrl = withRouter(DisplayMainDocContainer);

export default connect(mapStateToProps,
    {
        getMainDocById,
        getDepartments,
        getStatuses,
        getTypes
    }
)(DisplayMainDocContainerUrl);

