import React from 'react'
import {connect} from "react-redux";
import {setWpsMode} from "../../../redux/Reducers/WorkPlanScheduleReducer";
import WorkPlanSchedule from "./WorkPlanSchedule";

class WorkPlanScheduleContainer extends React.Component {
    render() {
        return <WorkPlanSchedule {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        wpsMode: state.workPlanScheduleDir.wpsMode
    }
};

export default connect(mapStateToProps, {
    setWpsMode,
})(WorkPlanScheduleContainer);