import React from 'react'
import WorkPlanSchedule from "./WorkPlanSchedule";
import {connect} from "react-redux";
import {getSubjectsHours, updateSemester, updateSpecialization} from "../../../redux/Reducers/WorkPlanScheduleReducer";

const PROGRAMMER = 'programmer';
const OPERATOR = 'operator';

class WorkPlanScheduleContainer extends React.Component {

    render() {
        return (
            <WorkPlanSchedule
                wps={this.props.wps}
                updateSemester={this.props.updateSemester}
                updateSpecialization={this.props.updateSpecialization}
                getSubjectsHours={this.props.getSubjectsHours}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        wps: state.workPlanScheduleDir
    }
};

export default connect(mapStateToProps,
    {
        getSubjectsHours,
        updateSemester,
        updateSpecialization
    }
)(WorkPlanScheduleContainer);