import React from 'react';
import './App.css';
import UserInterface from "./UserInterface/UserInterface";

const App = (props) => {
    return (
        <div className="App">
            {/*<Landing/>*/}

            <UserInterface/>
            {/*
            <Admin /> */}
        </div>
    );
};

export default App;