import React from 'react';
import './App.css';
import UserInterface from "./components/UserInterface";
import {useTranslation} from "react-i18next";

const App = () => {
    const {i18n} = useTranslation();
    i18n.changeLanguage('ru');
    return (
        <div className="App">
            <UserInterface/>
        </div>
    );
};

export default App;