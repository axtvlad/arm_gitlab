export const selectWpsSubject = (state) => {
    return state.workPlanScheduleDir.subjects
}

export const selectWpsExams = (state) => {
    return state.workPlanScheduleDir.exams
}

export const selectWpsSchedule = (state) => {
    return state.workPlanScheduleDir.schedule
}

export const selectWpsCurrentSemester = (state) => {
    return state.workPlanScheduleDir.semester
}

export const selectWpsCurrentCourse = (state) => {
    return state.workPlanScheduleDir.course
}

export const selectWpsCurrentSpecialization = (state) => {
    return state.workPlanScheduleDir.specialization
}

export const selectWpsCurrentScheduleKey = (state) => {
    return state.workPlanScheduleDir.scheduleKey
}

export const selectWpsSubjectsCount = (state) => {
    return state.workPlanScheduleDir.subjectsCount
}

export const selectWpsMode = (state) => {
    return state.workPlanScheduleDir.wpsMode
}

export const selectWpsIsFetching = (state) => {
    return state.workPlanScheduleDir.isFetching
}