import {Breadcrumb, Layout} from "antd";
import React from "react";
import Base from "./Base/Base";
import {Route} from "react-router-dom";
import Home from "./Home/Home";
import Doc from "./Doc/Doc";
import AddDoc from "./Doc/AddDoc";

const {Content} = Layout;

const WorkSpace = (props) => {
    return (
        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0', textAlign: 'left'}}>
                <Breadcrumb.Item>Основная база</Breadcrumb.Item>
                <Breadcrumb.Item>Приказы</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <Route exact path={'/home'} render={() => <Home/>}/>
                <Route exact path={'/base'} render={() => <Base/>}/>
                <Route path={'/doc'} render={() => <Doc/>}/>
                <Route exact path={'/addDoc'} render={() => <AddDoc/>}/>
            </div>
            {/*
                Прочие документы
                Шаблоны
                Эксперты
            */}

        </Content>
    )
};
export default WorkSpace;