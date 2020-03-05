import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import UserInterface from "./user_interface/UserInterface";
import AdminInterface from "./admin_interface/AdminInterface";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="App">
                {/*
                <Route exact path={'/admin/'} render={() => <AdminInterface state={props.state}/>}/>
                <Route exact path={'/'} render={() =>
                    */}
                    <UserInterface state={props.state}/>
                //}/>
            </div>
        </BrowserRouter>
    );
};

export default App;