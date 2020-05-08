import AddTemplate from "./AddTemplate";
import {
    addTemplate,
    updateCategoryID,
    updateFileNameKz,
    updateFileNameRu,
    updateTemplateNameKz, updateTemplateNameRu
} from "../../../../redux/Reducers/TemplateReducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        templatesDir: state.templatesDir,
        categories: state.categoriesDir.categories
    }
};

const AddTemplateContainer = connect(mapStateToProps, {
    addTemplate,
    updateTemplateNameRu,
    updateTemplateNameKz,
    updateFileNameRu,
    updateFileNameKz,
    updateCategoryID
}
)(AddTemplate);

export default AddTemplateContainer;