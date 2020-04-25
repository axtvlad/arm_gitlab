import {Breadcrumb, Layout} from "antd";
import React from "react";
import {Route} from "react-router-dom";
import Home from "./Home/Home";
import Doc from "./Docs/Doc";
import DepartmentDescription from "./Descriptions/DepartmentDescription";
import AddTypeContainer from "./Directories/Types/AddTypeContainer";
import AddMainDocContainer from "./MainDocs/AddMainDocContainer";
import TypesContainer from "./Directories/Types/TypesContainer";
import DepartmentsContainer from "./Directories/Departments/DepartmentsContainer";
import StatusesContainer from "./Directories/Statuses/StatusesContainer";
import AddStatusContainer from "./Directories/Statuses/AddStatusContainer";
import AddDepartmentContainer from "./Directories/Departments/AddDepartmentContainer";
import MainDocsContainer from "./MainDocs/MainDocsContainer";
import RolesContainer from "./Directories/Roles/RolesContainer";
import AddRoleContainer from "./Directories/Roles/AddRoleContainer";

const {Content} = Layout;

const WorkSpace = () => {
    return (
        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0', textAlign: 'left'}}>
                <Breadcrumb.Item>ARM_TIPO</Breadcrumb.Item>
                <Breadcrumb.Item>ARM_TIPO</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <Route exact path={'/'} render={() => <Home/>}/>

                <Route exact path={'/mainDocs'} render={() => <MainDocsContainer/>}/>

                <Route exact path={'/addMainDoc'} render={() => <AddMainDocContainer/>}/>
                <Route exact path={'/doc'} render={() => <Doc/>}/>

                <Route exact path={'/types'} render={() => <TypesContainer/>}/>
                <Route exact path={'/addType'} render={() => <AddTypeContainer/>}/>

                <Route exact path={'/departments'} render={() => <DepartmentsContainer/>}/>
                <Route exact path={'/addDepartment'} render={() => <AddDepartmentContainer/>}/>
                <Route exact path={'/departmentDescription'} render={() => <DepartmentDescription/>}/>

                <Route exact path={'/statuses'} render={() => <StatusesContainer/>}/>
                <Route exact path={'/addStatus'} render={() => <AddStatusContainer/>}/>
                <Route exact path={'/roles'} render={() => <RolesContainer/>}/>
                <Route exact path={'/addRole'} render={() => <AddRoleContainer/>}/>
            </div>
        </Content>
    );
};

export default WorkSpace;
