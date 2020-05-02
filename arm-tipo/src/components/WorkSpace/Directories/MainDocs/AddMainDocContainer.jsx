import AddMainDoc from "./AddMainDoc";
import {connect} from "react-redux";
import {
    addMainDoc,
    updateMainDocBeginDate,
    updateMainDocDepartmentId,
    updateMainDocDescriptionKz,
    updateMainDocDescriptionRu,
    updateMainDocFileKz,
    updateMainDocFileRu,
    updateMainDocFinishDate,
    updateMainDocHeaderKz,
    updateMainDocHeaderRu,
    updateMainDocNameKz,
    updateMainDocNameRu,
    updateMainDocNumber,
    updateMainDocPubDate,
    updateMainDocStatusId,
    updateMainDocTextKz,
    updateMainDocTextRu,
    updateMainDocTypeId
} from "../../../../redux/Reducers/MainDocReducer";

let mapStateToProps = (state) => {
    return {
        mainDocsDir: state.mainDocsDir,
        types: state.typesDir.types,
        departments: state.departmentsDir.departments,
        statuses: state.statusesDir.statuses
    }
};

const AddMainDocContainer = connect(mapStateToProps,
    {
        addMainDoc,
        updateMainDocNumber,
        updateMainDocNameRu,
        updateMainDocNameKz,
        updateMainDocDepartmentId,
        updateMainDocStatusId,
        updateMainDocBeginDate,
        updateMainDocFinishDate,
        updateMainDocPubDate,
        updateMainDocHeaderRu,
        updateMainDocHeaderKz,
        updateMainDocFileRu,
        updateMainDocFileKz,
        updateMainDocDescriptionRu,
        updateMainDocDescriptionKz,
        updateMainDocTypeId,
        updateMainDocTextRu,
        updateMainDocTextKz,
    }
)(AddMainDoc);

export default AddMainDocContainer;