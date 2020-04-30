import {connect} from "react-redux";
import Faqs from "./Faqs"
import {setFaqsCreator} from "../../../../../redux/Reducers/FaqReducer";

let mapStateToProps = (state) => {
    return {
        faqs: state.faqsDir.faqs
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setFaqs: (faqs) => {
            dispatch(setFaqsCreator(faqs))
        }
    }
};

const FaqsContainer = connect(mapStateToProps, mapDispatchToProps)(Faqs);

export default FaqsContainer;