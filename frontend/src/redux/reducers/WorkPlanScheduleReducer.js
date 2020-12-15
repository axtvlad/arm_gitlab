import {WpsMode, WpsScheduleKeys} from "../../components/common/utils/constants";
import {wpsAPI} from "../../api/wpsAPI";

const SET_WPS_IS_FETCHING = 'set_wps_is_fetching';
const SET_SUBJECT_COUNT = 'set_subject_count';
const SET_SUBJECTS = 'set_subjects';
const SET_WPS_MODE = 'set_wps_mode';
const SET_EXAMS_COUNT = 'set_exams_count';
const SET_EXAMS = 'set_exams';
const SET_SCHEDULE = 'set_schedule';

const initialState = {
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

export const WorkPlanScheduleReducer = (state = initialState, action) => {
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

export const setWpsIsFetching = (isFetching) => ({
    type: SET_WPS_IS_FETCHING,
    isFetching
});

export const getSubjects = (params) => async (dispatch) => {
    dispatch(setWpsIsFetching(true));

    const res = await wpsAPI.getSubjects(params)

    dispatch(setSubjectsCount(res.subjectsCount));
    dispatch(setSubjects(res.subjects));
    dispatch(setWpsIsFetching(false));
};

export const getExams = (params) => async (dispatch) => {
    dispatch(setWpsIsFetching(true));

    const res = await wpsAPI.getExams(params)

    dispatch(setExamsCount(res.subjectsCount));
    dispatch(setExams(res.exams));
    dispatch(setWpsIsFetching(false));
};

export const getSchedule = (params) => async (dispatch) => {
    dispatch(setWpsIsFetching(true));

    const res = await wpsAPI.getSchedule(params)

    dispatch(setSchedule(res.schedule));
    dispatch(setWpsIsFetching(false));
};