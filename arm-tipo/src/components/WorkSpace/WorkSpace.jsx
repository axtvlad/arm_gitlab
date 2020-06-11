import {Breadcrumb, Layout} from "antd";
import React from "react";
import {Route, withRouter} from "react-router-dom";
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
import DisplayUserContainer from "./Directories/Users/DisplayUserContainer";
import DisplayFaqContainer from "./Directories/Faqs/DisplayFaqContainer";
import DisplayMainDocContainer from "./Directories/MainDocs/DisplayMainDocContainer";
import OtherDocsContainer from "./Directories/OtherDocs/OtherDocsContainer";
import AddOtherDocContainer from "./Directories/OtherDocs/AddOtherDocContainer";
import DisplayOtherDocContainer from "./Directories/OtherDocs/DisplayOtherDocContainer";
import WorkPlanScheduleContainer from "./WorkPlanSchedule/WorkPlanScheduleContainer";
import EmailForm from "./Directories/Experts/EmailForm";

const {Content} = Layout;

class WorkSpace extends React.Component {
    render() {
        return (
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0', textAlign: 'left'}}>
                    <Breadcrumb.Item>ARM-TIPO</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.location.pathname.substr(1)}</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Route exact path={'/'} render={() => <HomeContainer/>}/>
                    <Route exact path={'/search'} render={() => <SearchPageContainer/>}/>

                    <Route exact path={'/mainDocs'} render={() => <MainDocsContainer/>}/>
                    <Route exact path={'/addMainDoc'} render={() => <AddMainDocContainer/>}/>
                    <Route exact path={'/mainDocs/:id'} render={() => <DisplayMainDocContainer/>}/>

                    <Route exact path={'/otherDocs'} render={() => <OtherDocsContainer/>}/>
                    <Route exact path={'/addOtherDoc'} render={() => <AddOtherDocContainer/>}/>
                    <Route exact path={'/otherDocs/:id'} render={() => <DisplayOtherDocContainer/>}/>

                    <Route exact path={'/types'} render={() => <TypesContainer/>}/>
                    <Route exact path={'/addType'} render={() => <AddTypeContainer/>}/>
                    <Route exact path={'/types/:id'} render={() => <DisplayTypeContainer/>}/>

                    <Route exact path={'/departments'} render={() => <DepartmentsContainer/>}/>
                    <Route exact path={'/addDepartment'} render={() => <AddDepartmentContainer/>}/>
                    <Route exact path={'/departments/:id'} render={() => <DisplayDepartmentContainer/>}/>

                    <Route exact path={'/statuses'} render={() => <StatusesContainer/>}/>
                    <Route exact path={'/addStatus'} render={() => <AddStatusContainer/>}/>
                    <Route exact path={'/statuses/:id'} render={() => <DisplayStatusContainer/>}/>

                    <Route exact path={'/roles'} render={() => <RolesContainer/>}/>
                    <Route exact path={'/addRole'} render={() => <AddRoleContainer/>}/>
                    <Route exact path={'/roles/:id'} render={() => <DisplayRoleContainer/>}/>

                    <Route exact path={'/faqs'} render={() => <FaqsContainer/>}/>
                    <Route exact path={'/addFaq'} render={() => <AddFaqContainer/>}/>
                    <Route exact path={'/faqs/:id'} render={() => <DisplayFaqContainer/>}/>

                    <Route exact path={'/customers'} render={() => <CustomersContainer/>}/>
                    <Route exact path={'/addCustomer'} render={() => <AddCustomerContainer/>}/>
                    <Route exact path={'/customers/:id'} render={() => <DisplayCustomerContainer/>}/>

                    <Route exact path={'/categories'} render={() => <CategoriesContainer/>}/>
                    <Route exact path={'/addCategory'} render={() => <AddCategoryContainer/>}/>
                    <Route exact path={'/categories/:id'} render={() => <DisplayCategoryContainer/>}/>

                    <Route exact path={'/cities'} render={() => <CitiesContainer/>}/>
                    <Route exact path={'/addCity'} render={() => <AddCityContainer/>}/>
                    <Route exact path={'/cities/:id'} render={() => <DisplayCityContainer/>}/>

                    <Route exact path={'/genders'} render={() => <GendersContainer/>}/>

                    <Route exact path={'/expert'} render={() => <EmailForm/>}/>

                    <Route exact path={'/templates'} render={() => <TemplatesContainer/>}/>
                    <Route exact path={'/addTemplate'} render={() => <AddTemplateContainer/>}/>

                    <Route exact path={'/users'} render={() => <UsersContainer/>}/>
                    <Route exact path={'/addUser'} render={() => <AddUserContainer/>}/>
                    <Route exact path={'/users/:userId'} render={() => <DisplayUserContainer/>}/>

                    <Route exact path={'/workPlanSchedule'} render={() => <WorkPlanScheduleContainer/>}/>
                </div>
            </Content>
        )
    }
}

export default withRouter(WorkSpace);

