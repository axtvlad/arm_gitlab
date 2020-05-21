import {Breadcrumb, Layout} from "antd";
import React from "react";
import {Route} from "react-router-dom";
import AddTypeContainer from "./Directories/Types/AddTypeContainer";
import AddMainDocContainer from "./Directories/MainDocs/AddMainDocContainer";
import TypesContainer from "./Directories/Types/TypesContainer";
import DepartmentsContainer from "./Directories/Departments/DepartmentsContainer";
import StatusesContainer from "./Directories/Statuses/StatusesContainer";
import AddStatusContainer from "./Directories/Statuses/AddStatusContainer";
import AddDepartmentContainer from "./Directories/Departments/AddDepartmentContainer";
import MainDocsContainer from "./Directories/MainDocs/MainDocsContainer";
import RolesContainer from "./Directories/Roles/RolesContainer";
import AddRoleContainer from "./Directories/Roles/AddRoleContainer";
import FaqsContainer from "./Directories/Faqs/FaqsContainer";
import AddFaqContainer from "./Directories/Faqs/AddFaqContainer";
import CustomersContainer from "./Directories/Customers/CustomersContainer";
import AddCustomerContainer from "./Directories/Customers/AddCustomerContainer";
import CategoriesContainer from "./Directories/Categories/CategoriesContainer";
import AddCategoryContainer from "./Directories/Categories/AddCategoryContainer";
import AddCityContainer from "./Directories/Cities/AddCityContainer";
import CitiesContainer from "./Directories/Cities/CitiesContainer";
import HomeContainer from "./Home/HomeContainer";
import SearchPageContainer from "./Search/SearchPageContainer";
import DisplayRoleContainer from "./Directories/Roles/DisplayRoleContainer";
import GendersContainer from "./Directories/Genders/GendersContainer";
import TemplatesContainer from "./Directories/Templates/TemplatesContainer";
import AddTemplateContainer from "./Directories/Templates/AddTemplateContainer";
import UsersContainer from "./Directories/Users/UsersContainer";
import AddUserContainer from "./Directories/Users/AddUserContainer";
import DisplayCategoryContainer from "./Directories/Categories/DisplayCategoryContainer";
import DisplayCityContainer from "./Directories/Cities/DisplayCityContainer";
import DisplayCustomerContainer from "./Directories/Customers/DisplayCustomerContainer";
import DisplayDepartmentContainer from "./Directories/Departments/DisplayDepartmentContainer";
import DisplayStatusContainer from "./Directories/Statuses/DisplayStatusContainer";
import DisplayTypeContainer from "./Directories/Types/DisplayTypeContainer";

const {Content} = Layout;

const WorkSpace = () => {
    return (
        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0', textAlign: 'left'}}>
                <Breadcrumb.Item>ARM_TIPO</Breadcrumb.Item>
                <Breadcrumb.Item>ARM_TIPO</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <Route exact path={'/'} render={() => <HomeContainer/>}/>
                <Route exact path={'/search'} render={() => <SearchPageContainer/>}/>

                <Route exact path={'/mainDocs'} render={() => <MainDocsContainer/>}/>
                <Route exact path={'/addMainDoc'} render={() => <AddMainDocContainer/>}/>

                <Route exact path={'/types'} render={() => <TypesContainer/>}/>
                <Route exact path={'/addType'} render={() => <AddTypeContainer/>}/>
                <Route exact path={'/type/:id'} render={() => <DisplayTypeContainer/>}/>

                <Route exact path={'/departments'} render={() => <DepartmentsContainer/>}/>
                <Route exact path={'/addDepartment'} render={() => <AddDepartmentContainer/>}/>
                <Route exact path={'/department/:id'} render={() => <DisplayDepartmentContainer/>}/>

                <Route exact path={'/statuses'} render={() => <StatusesContainer/>}/>
                <Route exact path={'/addStatus'} render={() => <AddStatusContainer/>}/>
                <Route exact path={'/status/:id'} render={() => <DisplayStatusContainer/>}/>

                <Route exact path={'/roles'} render={() => <RolesContainer/>}/>
                <Route exact path={'/addRole'} render={() => <AddRoleContainer/>}/>
                <Route exact path={'/role/:id?'} render={() => <DisplayRoleContainer/>}/>

                <Route exact path={'/faqs'} render={() => <FaqsContainer/>}/>
                <Route exact path={'/addFaq'} render={() => <AddFaqContainer/>}/>

                <Route exact path={'/customers'} render={() => <CustomersContainer/>}/>
                <Route exact path={'/addCustomer'} render={() => <AddCustomerContainer/>}/>
                <Route exact path={'/customer/:id?'} render={() => <DisplayCustomerContainer/>}/>

                <Route exact path={'/categories'} render={() => <CategoriesContainer/>}/>
                <Route exact path={'/addCategory'} render={() => <AddCategoryContainer/>}/>
                <Route exact path={'/category/:id'} render={() => <DisplayCategoryContainer/>}/>

                <Route exact path={'/cities'} render={() => <CitiesContainer/>}/>
                <Route exact path={'/addCity'} render={() => <AddCityContainer/>}/>
                <Route exact path={'/city/:id'} render={() => <DisplayCityContainer/>}/>

                <Route exact path={'/genders'} render={() => <GendersContainer/>}/>

                <Route exact path={'/templates'} render={() => <TemplatesContainer/>}/>
                <Route exact path={'/addTemplate'} render={() => <AddTemplateContainer/>}/>

                <Route exact path={'/users'} render={() => <UsersContainer/>}/>
                <Route exact path={'/addUser'} render={() => <AddUserContainer/>}/>
            </div>
        </Content>
    )
};

export default WorkSpace;
