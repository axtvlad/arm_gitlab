import {Request, Response} from "express";
import ServiceRest from "../../services/ServiceRest";
import {ERROR_CODE_BAD_REQUEST, ERROR_CODE_NONE,} from '../../services/ServiceRestCodes';

interface IRestWorkPlanScheduleBySemester {
    semester: number;
    specialization: string;
}

const excelToJson = require('exceljs');
const path = require('path');

const yo = path.resolve('./modules/work_plan_schedule', 'yo.xlsx');

export default new class WorkPlanScheduleController {
    async getRupBySemester(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestWorkPlanScheduleBySemester = <IRestWorkPlanScheduleBySemester>rest.getQuery();

            let operator: any[] = [], programmer: any[] = [];
            let not = [0, 1, 2, 3, 4, 5, 6];

            /**
             * поля для специальности оператора ЭВМ
             */
            for (let i = 40; i < 78; i++) {
                operator.push(i);
                i++
            }

            /**
             * поля для специальности техника-программиста
             */
            for (let i = 79; i < 122; i++) {
                programmer.push(i);
                i++
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
            await workbook.xlsx.readFile(yo);

            let hours = workbook.getWorksheet().columns[getSemester(queryParams.semester)];
            let arr: any[] = [];

            workbook.getWorksheet().columns[1].values.filter(
                (value: string, index: number) => {
                    if (workbook.getWorksheet().columns[0].values[index]
                        && hours.values[index]
                        && (queryParams.specialization === 'operator'
                            ? !programmer.includes(index)
                            : !operator.includes(index))
                        && !not.includes(index)
                    ) {

                        let obj = {
                            subject: value.replace(/\s+/g, ' ').trim(),
                            hours: hours.values[index]
                        }

                        arr.push(obj)
                    }
                }
            )

            return res.send({
                errorCode: ERROR_CODE_NONE,
                semester: queryParams.semester,
                subjectsCount: arr.length,
                subjects: arr,
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
