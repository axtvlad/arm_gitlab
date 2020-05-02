import {connect} from "react-redux";
import {setFaqsCountCreator, setFaqsCreator, setFaqsIsFetchingCreator} from "../../../../redux/Reducers/FaqReducer";
import React from "react";
import * as axios from "axios";
import Faqs from "./Faqs";
import {BASE_URL} from "../../../../env";

class FaqsContainer extends React.Component {
    componentDidMount() {
        if (this.props.faqs.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setFaqsIsFetching(true);

            axios
                .get(BASE_URL + '/faqs', config)
                .then(response => {
                    this.props.setFaqs(response.data.data);
                    this.props.setFaqsCount(response.data.totalCount);

                    console.log('faqs: ', response.data.data);

                    this.props.setFaqsIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Faqs
                faqs={this.props.faqs}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        faqs: state.faqsDir.faqs,
        isFetching: state.faqsDir.isFetching
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setFaqs: (faqs) => {
            dispatch(setFaqsCreator(faqs))
        },
        setFaqsCount: (faqsCount) => {
            dispatch(setFaqsCountCreator(faqsCount))
        },
        setFaqsIsFetching: (isFetching) => {
            dispatch(setFaqsIsFetchingCreator(isFetching))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FaqsContainer);
