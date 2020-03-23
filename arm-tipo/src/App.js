import React from 'react';
import './App.css';
import UserInterface from "./user_interface/UserInterface";

const App = (props) => {
    return (
        <div className="App">
            <UserInterface
                store={props.store}
                dispatch={props.dispatch}
            />
        </div>
    );
};

export default App;