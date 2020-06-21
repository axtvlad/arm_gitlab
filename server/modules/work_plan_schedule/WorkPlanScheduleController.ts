import {Request, Response} from "express";
import ServiceRest from "../../services/ServiceRest";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';
import {Cell} from "exceljs";

interface IRestWpsSubjects {
    semester: number;
    specialization: string;
}

interface IRestWpsExams {
    specialization: string;
}

interface IRestWpsSchedule {
    key: string;
    course: number;
}

const Keys = {
    k: 'k',
    bm: 'bm',
    pm: 'pm',
    pdn: 'pdn',
    pa: 'pa',
    ia: 'ia',
    dp: 'dp',
    moo: 'moo',
}


const excelToJson = require('exceljs');
const path = require('path');

const yo = path.resolve('./modules/work_plan_schedule', 'yo.xlsx');

export default new class WorkPlanScheduleController {
    async getWpsSubjects(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestWpsSubjects = <IRestWpsSubjects>rest.getQuery();

            if (!queryParams.specialization && !queryParams.semester) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAMS_SPECIALIZATION_AND_SEMESTER')
                });
            } else if (!queryParams.specialization) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAMS_SPECIALIZATION')
                });
            } else if (!queryParams.semester) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAMS_SEMESTER')
                });
            }

            let programmer: number[] = [];
            let not = [0, 1, 2, 3, 4, 5, 6, 123, 124, 125, 126, 127, 128, 129, 130];

            /**
             * поля для специальности техника-программиста
             */
            for (let i = 80; i < 118; i++) {
                programmer.push(i);
            }

            const getSemester = (semester: number) => {
                switch (semester) {
                    case 1:
                        return 10;
                    case 2:
                        return 11
                    case 3:
                        return 12;
                    case 4:
                        return 13;
                    case 5:
                        return 14;
                    case 6:
                        return 15;
                    case 7:
                        return 16;
                    case 8:
                        return 17;
                }
            }

            const workbook = new excelToJson.Workbook();

            await workbook.xlsx.readFile(yo);                                                   // считываем файл yo.xlsx

            let hoursCol = workbook.getWorksheet().columns[getSemester(queryParams.semester)];  // получаем колонку с семестрами
            let subjects: any[] = [];                   // создаем массив, который потом отдадим в теле ответа

            const worksheet = workbook.getWorksheet('План')

            worksheet.columns[1].values.filter(                            // фильтруем столбец с предметами по условиям ниже
                (value: string, index: number) => {              // value - ячейка с предметом, index - ее индекс
                    if (queryParams.specialization === 'operator' ?
                        (worksheet.columns[0].values[index]                 // первая колонка не пустая
                            && hoursCol.values[index]                          // колонка с количеством часов не пустая
                            && !not.includes(index)                        // исключаем ненужные строки
                            && !programmer.includes(index)) :
                        (worksheet.columns[0].values[index]                 // первая колонка не пустая
                            && hoursCol.values[index]                          // колонка с количеством часов не пустая
                            && !not.includes(index))
                    ) {
                        let obj = {
                            subject: value.replace(/\s+/g, ' ').trim(),
                            hours: hoursCol.values[index]
                        }

                        subjects.push(obj)
                    }
                }
            )

            return res.send({
                errorCode: ERROR_CODE_NONE,
                semester: queryParams.semester,
                subjectsCount: subjects.length,
                subjects: subjects,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }

    async getWpsExams(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestWpsExams = <IRestWpsExams>rest.getQuery();

            if (!queryParams.specialization) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAMS_SPECIALIZATION')
                });
            }

            let programmer: number[] = [];
            let not = [0, 1, 2, 3, 4, 5, 6, 123, 124, 125, 126, 127, 128, 129, 130];

            /**
             * поля для специальности техника-программиста
             */
            for (let i = 80; i < 118; i++) {
                programmer.push(i);
            }

            const workbook = new excelToJson.Workbook();
            await workbook.xlsx.readFile(yo);                        // считываем файл yo.xlsx

            let exams: any[] = [];                                   // создаем массив, который потом отдадим в теле ответа

            const examCol = workbook.getWorksheet().columns[2];      // колонка с экзаменами
            const worksheet = workbook.getWorksheet('План')

            worksheet.columns[1].values.filter(
                (value: string, index: number) => {
                    if (queryParams.specialization === 'operator' ?
                        (workbook.getWorksheet().columns[0].values[index]    // первая колонка не пустая
                            && examCol.values[index]                              // колонка с курсом экзамена не пустая
                            && !not.includes(index)
                            && !programmer.includes(index)) :
                        (workbook.getWorksheet().columns[0].values[index]    // первая колонка не пустая
                            && examCol.values[index]                              // колонка с курсом экзамена не пустая
                            && !not.includes(index))
                    ) {
                        let obj = {
                            exam: value,
                            semester: examCol.values[index]
                        }

                        exams.push(obj)
                    }
                }
            )

            return res.send({
                errorCode: ERROR_CODE_NONE,
                examsCount: exams.length,
                exams: exams,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }

    async getWpsSchedule(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestWpsSchedule = <IRestWpsSchedule>rest.getQuery();

            if (!queryParams.course && !queryParams.key) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAMS_COURSE_AND_KEY')
                });
            } else if (!queryParams.course) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAMS_COURSE')
                });
            } else if (!queryParams.key) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAMS_KEY')
                });
            }

            const getCourse = (course: number) => {
                switch (course) {
                    case 1:
                        return 23;
                    case 2:
                        return 24;
                    case 3:
                        return 25;
                    case 4:
                        return 26;
                }
            }

            const getFilterByKey = (key: string) => {
                switch (key) {
                    case Keys.bm:
                        return courseArr.filter(item =>
                            item.cell.includes('БМ') ||
                            item.cell.includes('Бм') ||
                            item.cell.includes('бм')
                        );
                    case Keys.pm:
                        return courseArr.filter(item =>
                            item.cell.includes('ПМ') ||
                            item.cell.includes('Пм') ||
                            item.cell.includes('пм')
                        );
                    case Keys.k:
                        return courseArr.filter(item => item.cell === 'К' || item.cell === 'к');
                    case Keys.pa:
                        return courseArr.filter(item =>
                            item.cell.includes('ПА') ||
                            item.cell.includes('Па') ||
                            item.cell.includes('па')
                        );
                    case Keys.ia:
                        return courseArr.filter(item => item.cell === 'ИА' || item.cell === 'Иа' || item.cell === 'иа');
                    case Keys.dp:
                        return courseArr.filter(item => item.cell === 'ДП' || item.cell === 'Дп' || item.cell === 'дп');
                    case Keys.moo:
                        return courseArr.filter(item =>
                            item.cell.includes('МОО') ||
                            item.cell.includes('Моо') ||
                            item.cell.includes('моо')
                        );
                    case Keys.pdn:
                        return courseArr.filter(item =>
                            item.cell.includes('ПДН') ||
                            item.cell.includes('Пдн') ||
                            item.cell.includes('пдн')
                        );
                }
            }

            const workbook = new excelToJson.Workbook();
            await workbook.xlsx.readFile(yo); // считываем файл yo.xlsx

            const worksheet = workbook.getWorksheet('График');

            let course = worksheet.getRow(getCourse(queryParams.course)); // строка курса
            let courseArr: any[] = []; // массив ячеек строки данного курса

            course.eachCell((cell: Cell, colNumber: number) => {
                courseArr.push({
                    cell: cell.value,
                    colNumber
                })
            })

            let filteredCourseArr = getFilterByKey(queryParams.key);
            let schedule: any[] = [];

            filteredCourseArr.forEach(item => schedule.push({
                month: worksheet.getCell(19, item.colNumber).value.toString().trim(),
                dayFrom: worksheet.getCell(20, item.colNumber).value.toString().trim(),
                dayTo: worksheet.getCell(21, item.colNumber).value.toString().trim()
            }))

            return res.send({
                errorCode: ERROR_CODE_NONE,
                key: queryParams.key,
                schedule: schedule,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }
}
