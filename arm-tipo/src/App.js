import React from 'react';
import {Spin} from "antd";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/Reducers/appReducer";
import ARM from "./components/ARM";

class App extends React.Component {
    componentDidMount() {
        const {initializeApp} = this.props

        initializeApp();
    }

    render() {
        const {initialized} = this.props;

        if (!initialized) {
            return <Spin size={'large'}/>
        }

        return (
            <div className={'App'}>
                <ARM/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default compose(
    connect(mapStateToProps, {
        initializeApp
    })
)(App);