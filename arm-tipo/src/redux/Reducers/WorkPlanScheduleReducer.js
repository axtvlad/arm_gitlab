import {restAPI} from "../../api/API";
import {SearchMode} from "../../components/common/utils/constants";

const SET_IS_POSTED = 'set_is_posted';
const SET_WORK_PLAN_SCHEDULE_IS_FETCHING = 'set_work_plan_schedule_is_fetching';
const SET_SUBJECT_COUNT = 'set_subject_count';
const SET_SUBJECTS = 'set_subjects';
const SET_SEARCH_MODE = 'set_search_mode';
const UPDATE_PLAN = 'update_plan';
const UPDATE_SCHEDULE = 'update_schedule';
const UPDATE_SEMESTER = 'update_semester';
const UPDATE_COURSE = 'update_course';
const UPDATE_SPECIALIZATION = 'update_specialization';

let initialState = {
    subjects: [],
    plan: [],
    schedule: [],
    semester: 1,
    course: 1,
    specialization: 'operator',
    subjectsCount: 0,
    searchMode: SearchMode.PLAN,
    isFetching: false
};

const WorkPlanScheduleReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_WORK_PLAN_SCHEDULE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case UPDATE_PLAN:
            return {
                ...state,
                plan: action.plan,
            };
        case UPDATE_SCHEDULE:
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
        case SET_SEARCH_MODE:
            return {
                ...state,
                searchMode: action.searchMode
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

export const setSubjectsCount = (subjectsCount) => ({
    type: SET_SUBJECT_COUNT,
    subjectsCount
});

export const setSearchMode = (searchMode) => ({
    type: SET_SEARCH_MODE,
    searchMode
});

export const updateSemester = (semester) => ({
    type: UPDATE_SEMESTER,
    semester
});

export const updateCourse = (course) => ({
    type: UPDATE_COURSE,
    course
});

export const updateSpecialization = (specialization) => ({
    type: UPDATE_SPECIALIZATION,
    specialization
});

export const setWorkPlanScheduleIsFetching = (isFetching) => ({
    type: SET_WORK_PLAN_SCHEDULE_IS_FETCHING,
    isFetching
});

export const getSubjectsHours = (params) => (dispatch) => {

    dispatch(setWorkPlanScheduleIsFetching(true));
    dispatch(setSubjects([]));



    restAPI.rup.getSubjectsHours(params)
        .then(response => {
            dispatch(setSubjectsCount(response.subjectsCount));
            dispatch(setSubjects(response.subjects));
            dispatch(updateSemester(response.semester));

            console.info('rup data: ', response);

            dispatch(setWorkPlanScheduleIsFetching(false));
        });
};

export default WorkPlanScheduleReducer;