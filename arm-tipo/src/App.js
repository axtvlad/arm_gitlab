import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import UserInterface from "./UserInterface/UserInterface";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="App">
                {/* <Landing/>*/}

                <UserInterface/>
                {/*
            <Admin /> */}
            </div>
        </BrowserRouter>
    );
};

export default App;