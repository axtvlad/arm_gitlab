import React from 'react'
import WorkPlanSchedule from "./WorkPlanSchedule";
import {connect} from "react-redux";
import {
    getSubjectsHours,
    updateSemester,
    updateSpecialization,
    setSearchMode,
    updateCourse
} from "../../../redux/Reducers/WorkPlanScheduleReducer";

class WorkPlanScheduleContainer extends React.Component {

    render() {
        return (
            <WorkPlanSchedule
                wps={this.props.wps}
                updateSemester={this.props.updateSemester}
                updateCourse={this.props.updateCourse}
                updateSpecialization={this.props.updateSpecialization}
                getSubjectsHours={this.props.getSubjectsHours}
                setSearchMode={this.props.setSearchMode}
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
        updateCourse,
        setSearchMode,
        updateSpecialization
    }
)(WorkPlanScheduleContainer);