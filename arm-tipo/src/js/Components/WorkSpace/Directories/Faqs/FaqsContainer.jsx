import {connect} from "react-redux";
import Faqs from "./Faqs"

let mapStateToProps = (state) => {
    return {
        faqs: state.faqsDir.faqs
    }
};

const FaqsContainer = connect(mapStateToProps, null)(Faqs);

export default FaqsContainer;