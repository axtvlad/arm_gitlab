import {Breadcrumb, Layout} from "antd";
import React from "react";
import Base from "./Base/Base";
import {Route} from "react-router-dom";
import Home from "./Home/Home";
import Doc from "./Docs/Doc";
import AddMainDoc from "./Docs/AddMainDoc";
import Types from "./Directories/Types/Types";
import Departments from "./Directories/Departments";
import Statuses from "./Directories/Statuses";
import DepartmentDescription from "./Departments/DepartmentDescription";
import AddType from "./Directories/Types/AddType";

const {Content} = Layout;

const WorkSpace = (props) => {
    return (
        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0', textAlign: 'left'}}>
                <Breadcrumb.Item>Основная база</Breadcrumb.Item>
                <Breadcrumb.Item>Приказы</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <Route
                    exact
                    path={'/home'}
                    render={() =>
                        <Home/>
                    }
                />

                <Route
                    exact
                    path={'/base'}
                    render={() =>
                        <Base/>
                    }
                />
                <Route
                    exact
                    path={'/addMainDoc'}
                    render={() =>
                        <AddMainDoc
                            directories={props.directories}
                        />
                    }
                />
                <Route
                    exact
                    path={'/doc'}
                    render={() =>
                        <Doc/>
                    }
                />

                <Route
                    exact
                    path={'/types'}
                    render={() =>
                        <Types
                            directories={props.directories}
                        />
                    }
                />
                <Route
                    exact
                    path={'/addType'}
                    render={() =>
                        <AddType
                            directories={props.directories}
                            dispatch={props.dispatch}
                        />
                    }
                />

                <Route
                    exact
                    path={'/departments'}
                    render={() =>
                        <Departments
                            directories={props.directories}
                        />
                    }
                />
                <Route
                    exact
                    path={'/departmentDescription'}
                    render={() =>
                        <DepartmentDescription
                            directories={props.directories}
                        />
                    }
                />

                <Route
                    exact
                    path={'/statuses'}
                    render={() =>
                        <Statuses
                            directories={props.directories}
                        />
                    }
                />

            </div>
            {/*
                Прочие документы
                Шаблоны
                Эксперты
                Пользователи
            */}
        </Content>
    )
};
export default WorkSpace;