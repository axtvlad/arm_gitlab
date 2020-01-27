import React from "react";
import {Route} from "react-router-dom";
import Orders from "./Orders";
import Regulations from "./Regulations";

const MainData = (props) => {
    return (
        <div>
            <Route path={'/orders'} component={Orders}/>
            <Route path={'/regulations'} component={Regulations}/>
        </div>
    )
};

export default MainData;