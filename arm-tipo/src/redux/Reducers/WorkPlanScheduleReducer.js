import {restAPI} from "../../api/API";
import {WpsMode, WpsScheduleKeys} from "../../components/common/utils/constants";

const SET_IS_POSTED = 'set_is_posted';
const SET_WPS_IS_FETCHING = 'set_wps_is_fetching';
const SET_SUBJECT_COUNT = 'set_subject_count';
const SET_SUBJECTS = 'set_subjects';
const SET_WPS_MODE = 'set_wps_mode';
const UPDATE_SEMESTER = 'update_semester';
const UPDATE_COURSE = 'update_course';
const UPDATE_SPECIALIZATION = 'update_specialization';
const SET_EXAMS_COUNT = 'set_exams_count';
const SET_EXAMS = 'set_exams';
const SET_SCHEDULE = 'set_schedule';
const UPDATE_SCHEDULE_KEY = 'update_schedule_key';

let initialState = {
    subjects: [],
    exams: [],
    schedule: [],
    semester: 1,
    course: 1,
    specialization: 'operator',
    scheduleKey: WpsScheduleKeys.k,
    subjectsCount: null,
    wpsMode: WpsMode.SUBJECTS,
    isFetching: false
};

const WorkPlanScheduleReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_WPS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_SCHEDULE:
            return {
                ...state,
                schedule: action.schedule,
            };
        case UPDATE_SEMESTER:
            return {
                ...state,
                semester: action.semester,
            };
        case UPDATE_COURSE:
            return {
                ...state,
                course: action.course,
            };
        case UPDATE_SCHEDULE_KEY:
            return {
                ...state,
                scheduleKey: action.scheduleKey,
            };
        case UPDATE_SPECIALIZATION:
            return {
                ...state,
                specialization: action.specialization,
            };
        case SET_SUBJECTS:
            return {
                ...state,
                subjects: action.subjects,
            };
        case SET_EXAMS:
            return {
                ...state,
                exams: action.exams,
            };
        case SET_WPS_MODE:
            return {
                ...state,
                wpsMode: action.wpsMode
            };
        default:
            return state;
    }
};

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const setSubjects = (subjects) => ({
    type: SET_SUBJECTS,
    subjects
});

export const setSchedule = (schedule) => ({
    type: SET_SCHEDULE,
    schedule
});

export const setSubjectsCount = (subjectsCount) => ({
    type: SET_SUBJECT_COUNT,
    subjectsCount
});

export const setExamsCount = (examsCount) => ({
    type: SET_EXAMS_COUNT,
    examsCount
});

export const setWpsMode = (wpsMode) => ({
    type: SET_WPS_MODE,
    wpsMode
});

export const setExams = (exams) => ({
    type: SET_EXAMS,
    exams
});

export const updateSemester = (semester) => ({
    type: UPDATE_SEMESTER,
    semester
});

export const updateScheduleKey = (scheduleKey) => ({
    type: UPDATE_SCHEDULE_KEY,
    scheduleKey
});

export const updateCourse = (course) => ({
    type: UPDATE_COURSE,
    course
});

export const updateSpecialization = (specialization) => ({
    type: UPDATE_SPECIALIZATION,
    specialization
});

export const setWpsIsFetching = (isFetching) => ({
    type: SET_WPS_IS_FETCHING,
    isFetching
});

export const getSubjects = (params) => (dispatch) => {

    dispatch(setWpsIsFetching(true));

    restAPI.wps.getSubjects(params)
        .then(response => {
            dispatch(setSubjectsCount(response.subjectsCount));
            dispatch(setSubjects(response.subjects));

            console.info('wps subjects: ', response);

            dispatch(setWpsIsFetching(false));
        });
};

export const getExams = (params) => (dispatch) => {

    dispatch(setWpsIsFetching(true));

    restAPI.wps.getExams(params)
        .then(response => {
            dispatch(setExamsCount(response.subjectsCount));
            dispatch(setExams(response.exams));

            console.info('wps exams: ', response);

            dispatch(setWpsIsFetching(false));
        });
};

export const getSchedule = (params) => (dispatch) => {

    dispatch(setWpsIsFetching(true));

    restAPI.wps.getSchedule(params)
        .then(response => {
            dispatch(setSchedule(response.schedule));

            console.info('wps schedule: ', response);

            dispatch(setWpsIsFetching(false));
        });
};

export default WorkPlanScheduleReducer;