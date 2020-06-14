import React from "react";
import SearchPage from "./SearchPage";
import {connect} from "react-redux";
import {clearSearchResults, clearTags, getSearchResult, updateSearchTags} from "../../../redux/Reducers/SearchReducer";

class SearchPageContainer extends React.Component {
    render() {
        return (
            <SearchPage {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        searchDir: state.searchDir
    }
};

export default connect(mapStateToProps,
    {
        updateSearchTags,
        getSearchResult,
        clearTags,
        clearSearchResults
    }
)(SearchPageContainer);
