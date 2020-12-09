import React from 'react'
import {connect} from "react-redux";
import {WpsMode} from "../../common/utils/constants";
import Subjects from "./Subjects";
import Schedule from "./Schedule";
import Exams from "./Exams";
import {
    getExams,
    getSchedule,
    getSubjects,
    updateCourse,
    updateScheduleKey,
    updateSemester,
    updateSpecialization
} from "../../../redux/Reducers/WorkPlanScheduleReducer";

class SESContainer extends React.Component {
    render() {
        const {wps} = this.props;

        if (wps.wpsMode === WpsMode.SUBJECTS) {
            return <Subjects {...this.props}/>
        } else if (wps.wpsMode === WpsMode.SCHEDULE) {
            return <Schedule {...this.props}/>
        } else if (wps.wpsMode === WpsMode.EXAMS) {
            return <Exams {...this.props}/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        wps: state.workPlanScheduleDir
    }
};

export default connect(mapStateToProps, {
    getSubjects,
    getSchedule,
    getExams,
})(SESContainer);