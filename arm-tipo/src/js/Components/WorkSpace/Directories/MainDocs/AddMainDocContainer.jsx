import AddMainDoc from "./AddMainDoc";
import {connect} from "react-redux";
import {
    addMainDocCreator,
    updateMainDocBeginDateCreator,
    updateMainDocDepartmentIdCreator,
    updateMainDocDescriptionKzCreator,
    updateMainDocDescriptionRuCreator,
    updateMainDocFileKzCreator,
    updateMainDocFileRuCreator,
    updateMainDocFinishDateCreator,
    updateMainDocHeaderKzCreator,
    updateMainDocHeaderRuCreator,
    updateMainDocNameKzCreator,
    updateMainDocNameRuCreator,
    updateMainDocNumberCreator,
    updateMainDocPubDateCreator,
    updateMainDocStatusIdCreator,
    updateMainDocTextKzCreator,
    updateMainDocTextRuCreator,
    updateMainDocTypeIdCreator
} from "../../../../../redux/Reducers/MainDocReducer";

const dateNow = () => {
    let date = new Date();

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yyyy = date.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
};

let mapStateToProps = (state) => {
    return {
        mainDocsDir: state.mainDocsDir,
        types: state.typesDir.types,
        departments: state.departmentsDir.departments,
        statuses: state.statusesDir.statuses
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addMainDoc: () => {
            dispatch(addMainDocCreator());
        },
        changeMainDocNumber: (number) => {
            dispatch(updateMainDocNumberCreator(number));
        },
        changeMainDocNameRu: (name_ru) => {
            dispatch(updateMainDocNameRuCreator(name_ru));
        },
        changeMainDocNameKz: (name_kz) => {
            dispatch(updateMainDocNameKzCreator(name_kz));
        },
        changeMainDocDepartmentId: (department_id) => {
            dispatch(updateMainDocDepartmentIdCreator(department_id));
        },
        changeMainDocStatusId: (status_id) => {
            dispatch(updateMainDocStatusIdCreator(status_id));
        },
        changeMainDocBeginDate: (begin_date) => {
            dispatch(updateMainDocBeginDateCreator(begin_date));
        },
        changeMainDocFinishDate: (finish_date) => {
            dispatch(updateMainDocFinishDateCreator(finish_date));
        },
        changeMainDocPubDate: () => {
            let pub_date = dateNow();
            dispatch(updateMainDocPubDateCreator(pub_date));
        },
        changeMainDocHeaderRu: (header_ru) => {
            dispatch(updateMainDocHeaderRuCreator(header_ru));
        },
        changeMainDocHeaderKz: (header_kz) => {
            dispatch(updateMainDocHeaderKzCreator(header_kz));
        },
        changeMainDocFileRu: (file_ru) => {
            dispatch(updateMainDocFileRuCreator(file_ru));
        },
        changeMainDocFileKz: (file_kz) => {
            dispatch(updateMainDocFileKzCreator(file_kz));
        },
        changeMainDocDescriptionRu: (description_ru) => {
            dispatch(updateMainDocDescriptionRuCreator(description_ru));
        },
        changeMainDocDescriptionKz: (description_kz) => {
            dispatch(updateMainDocDescriptionKzCreator(description_kz));
        },
        changeMainDocTypeId: (type_id) => {
            dispatch(updateMainDocTypeIdCreator(type_id));
        },
        changeMainDocTextRu: (text_ru) => {
            dispatch(updateMainDocTextRuCreator(text_ru));
        },
        changeMainDocTextKz: (text_kz) => {
            dispatch(updateMainDocTextKzCreator(text_kz));
        }
    }
};

const AddMainDocContainer = connect(mapStateToProps, mapDispatchToProps)(AddMainDoc);

export default AddMainDocContainer;