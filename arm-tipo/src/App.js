import React from 'react';
import './App.css';
import UserInterface from "./user_interface/UserInterface";

const App = (props) => {
    return (
        <div className="App">
            <UserInterface
                state={props.state}
                addType={props.addType}
                updateTypeNameRu={props.updateTypeNameRu}
                updateTypeNameKz={props.updateTypeNameKz}
            />
        </div>
    );
};

export default App;