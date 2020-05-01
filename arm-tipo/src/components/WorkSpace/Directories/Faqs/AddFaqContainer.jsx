import {connect} from "react-redux";
import {
    addFaqCreator, updateFaqAnswerKzCreator, updateFaqAnswerRuCreator,
    updateFaqQuestionKzCreator,
    updateFaqQuestionRuCreator
} from "../../../../redux/Reducers/FaqReducer";
import AddFaq from "./AddFaq";


let MapStateToProps = (state) => {
    return {
        faqsDir: state.faqsDir
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        addFaq: () => {
            dispatch(addFaqCreator());
        },
        updateFaqQuestionRu: (newQuestionRu) => {
            dispatch(updateFaqQuestionRuCreator(newQuestionRu));
        },
        updateFaqQuestionKz: (newQuestionKz) => {
            dispatch(updateFaqQuestionKzCreator(newQuestionKz));
        },
        updateFaqAnswerRu: (newAnswerRu) => {
            dispatch(updateFaqAnswerRuCreator(newAnswerRu));
        },
        updateFaqAnswerKz: (newAnswerKz) => {
            dispatch(updateFaqAnswerKzCreator(newAnswerKz));
        },
    }
};

const AddFaqContainer = connect(MapStateToProps, MapDispatchToProps)(AddFaq);

export default AddFaqContainer;