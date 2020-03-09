import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import UserInterface from "./user_interface/UserInterface";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="App">
                <UserInterface state={props.state}/>
            </div>
        </BrowserRouter>
    );
};

export default App;