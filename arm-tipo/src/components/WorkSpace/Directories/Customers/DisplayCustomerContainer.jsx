import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getCustomerById} from "../../../../redux/Reducers/CustomerReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";

class DisplayCustomerContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.getCustomerById(id)
    }

    render() {
        return (
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CUSTOMERS),
        currentItem: state.customersDir.currentCustomer,
        isFetching: state.customersDir.isFetching
    }
};

let CustomerContainerUrl = withRouter(DisplayCustomerContainer);

export default connect(mapStateToProps,
    {
        getCustomerById
    }
)(CustomerContainerUrl)