import React from 'react'
import WorkPlanSchedule from "./WorkPlanSchedule";
import {connect} from "react-redux";
import {Spin} from "antd";
import {getSubjectsHours} from "../../../redux/Reducers/WorkPlanScheduleReducer";

const PROGRAMMER = 'programmer';
const OPERATOR = 'operator';

class WorkPlanScheduleContainer extends React.Component {
    componentDidMount() {
        let params = {
            semester: 1,
            specialization: OPERATOR
        }

        !this.props.workPlanScheduleDir.subjects.length && this.props.getSubjectsHours(params);
    }

    render() {
        if (!this.props.workPlanScheduleDir.subjects.length) {
            return <Spin/>
        } else {
            return (
                <WorkPlanSchedule
                    wps={this.props.workPlanScheduleDir}
                />
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        workPlanScheduleDir: state.workPlanScheduleDir
    }
};

export default connect(mapStateToProps,
    {
        getSubjectsHours
    }
)(WorkPlanScheduleContainer);