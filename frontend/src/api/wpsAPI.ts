import {instance} from "./api";
import qs from 'qs'

type ParamsType = {
    specialization?: string
    semester?: number
    course?: number
    key?: string
}

const paramsToQS = (params: ParamsType) => {
    return qs.stringify(params)
}

type SubjectsResponseType = {
    errorCode: number
    semester: number
    subjectsCount: number
    subjects: Array<any>
    message: string
}

type ExamsResponseType = {
    errorCode: number
    examsCount: number
    exams: Array<any>
    message: string
}

type ScheduleResponseType = {
    errorCode: number
    key: string
    schedule: Array<any>,
    message: string
}

export const wpsAPI = {
    getSubjects(params: ParamsType) {
        return instance
            .get<SubjectsResponseType>(`wps/subjects${paramsToQS(params)}`)
            .then(response => response.data)
    },
    getExams(params: ParamsType) {
        return instance
            .get<ExamsResponseType>(`wps/exams${paramsToQS(params)}`)
            .then(response => response.data)
    },
    getSchedule(params: ParamsType) {
        return instance
            .get<ScheduleResponseType>(`wps/schedule${paramsToQS(params)}`)
            .then(response => response.data)
    }
}
