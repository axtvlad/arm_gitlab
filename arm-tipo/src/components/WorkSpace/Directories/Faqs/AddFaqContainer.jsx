import {connect} from "react-redux";
import {
    addFaq,
    updateFaqAnswerKz,
    updateFaqAnswerRu,
    updateFaqQuestionKz,
    updateFaqQuestionRu
} from "../../../../redux/Reducers/FaqReducer";
import AddFaq from "./AddFaq";


let MapStateToProps = (state) => {
    return {
        faqsDir: state.faqsDir
    }
};

const AddFaqContainer = connect(MapStateToProps,
    {
        addFaq,
        updateFaqQuestionRu,
        updateFaqQuestionKz,
        updateFaqAnswerRu,
        updateFaqAnswerKz,
    }
)(AddFaq);

export default AddFaqContainer;