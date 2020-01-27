import React from 'react';
import './App.css';
import UserInterface from "./UserInterface/UserInterface";
import {BrowserRouter} from "react-router-dom";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="App">
                {/*<Landing/>*/}

                <UserInterface/>
                {/*
            <Admin /> */}
            </div>
        </BrowserRouter>
    );
};

export default App;