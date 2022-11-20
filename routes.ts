import { Routes } from '@angular/router';
import { SignUpComponent } from './src/app/user/sign-up/sign-up.component';
import { UserComponent } from './src/app/user/user.component';
import { SignInComponent } from './src/app/user/sign-in/sign-in.component';
import { UserProfileComponent } from './src/app/user-profile/user-profile.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AddEmployeeComponent } from 'src/app/user-profile/add-employee/add-employee.component';
import { ListEmployeeComponent } from 'src/app/user-profile/list-employee/list-employee.component';
import { EditEmployeeComponent } from 'src/app/user-profile/edit-employee/edit-employee.component';
import { AddMasterComponent } from 'src/app/user-profile/add-master/add-master.component';
import { SuperadminComponent } from 'src/app/superadmin/superadmin/superadmin.component';
import { SuperadminProfileComponent } from 'src/app/superadmin-profile/superadmin-profile/superadmin-profile.component';
import { CompanyComponent } from 'src/app/superadmin-profile/company/company/company.component';
import { PlanComponent } from 'src/app/superadmin-profile/plan/plan/plan.component';
import { ListPlanComponent } from 'src/app/superadmin-profile/list-plan/list-plan/list-plan.component';
import { EmployeeProfileComponent } from 'src/app/user-profile/employee-profile/employee-profile.component';
import { EmployeeSalaryComponent } from 'src/app/user-profile/employee-salary/employee-salary/employee-salary.component';
import { StandardGuard } from 'src/app/auth/standard.guard';
import { PlanFeaturesComponent } from 'src/app/superadmin-profile/plan-features/plan-features/plan-features.component';
import { EmployeeAttendenceComponent } from 'src/app/user-profile/employee-attendence/employee-attendence/employee-attendence.component';
import { PlanGuard } from 'src/app/auth/plan.guard';
import { EmployeeProjectComponent } from 'src/app/user-profile/employee-project/employee-project/employee-project.component';
import { EmployeeLoginComponent } from 'src/app/user/employee-login/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from 'src/app/employee/employee-dashboard/employee-dashboard.component';
import { MyAttendenceComponent } from 'src/app/employee/my-attendence/my-attendence.component';
import { EmployeeTaskComponent } from 'src/app/user-profile/employee-task/employee-task/employee-task.component';
import { ListProjectComponent } from 'src/app/user-profile/list-project/list-project/list-project.component';
import { ListTaskComponent } from 'src/app/user-profile/list-task/list-task/list-task.component';
import { MyTaskComponent } from 'src/app/employee/my-task/my-task/my-task.component';
import { UpdateStatusComponent } from 'src/app/employee/update-status/update-status/update-status.component';
import { NotificationComponent } from 'src/app/user-profile/notification/notification/notification.component';
import { MyNotificationComponent } from 'src/app/employee/my-notification/my-notification/my-notification.component';
import { RequestnotificationComponent } from 'src/app/user-profile/requestnotification/requestnotification/requestnotification.component';
import { MyRequestnotificationComponent } from 'src/app/employee/my-requestnotification/my-requestnotification/my-requestnotification.component';

// import { AuthGuard } from '.src/app/auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'superadmin', component: SuperadminComponent
    },
    {
        path: 'superadminprofile', component: SuperadminProfileComponent
    },
    {
        path: 'companylist', component:SuperadminProfileComponent ,
        children: [{ path: '', component:  CompanyComponent}]
    },
    {
        path: 'addplan', component:SuperadminProfileComponent ,
        children: [{ path: '', component:  PlanComponent}]
    },
    {
        path: 'listplan', component:SuperadminProfileComponent ,
        children: [{ path: '', component:  ListPlanComponent}]
    },
    {
        path: 'addfeature', component:SuperadminProfileComponent ,
        children: [{ path: '', component:  PlanFeaturesComponent}]
    },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'employeelogin', component: UserComponent,
        children: [{ path: '', component: EmployeeLoginComponent }]
    },
    {
        path: 'employeedashboard/:email', component: EmployeeDashboardComponent,
    },
    {
        path: 'myattendence/:email', component: EmployeeDashboardComponent,
        children: [{ path: '', component: MyAttendenceComponent }]
    },
    {
        path: 'mytask/:email', component: EmployeeDashboardComponent,
        children: [{ path: '', component: MyTaskComponent }]
    },
    {
        path: 'myrequestnotification/:email', component: EmployeeDashboardComponent,
        children: [{ path: '', component: MyRequestnotificationComponent }]
    },
    {
        path: 'updatestatus/:_id', component: UpdateStatusComponent,
    },
    {
        path: 'mynotification/:companyName', component: MyNotificationComponent,
    },
    {
        path: 'addempoyee', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: AddEmployeeComponent }]
    },
    {
        path: 'employees', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: ListEmployeeComponent }]
    },
    {
        
        path: 'employees/:_id', component: UserProfileComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: EmployeeProfileComponent }]
    },
    {
        path: 'edit/:_id', component: UserProfileComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: EditEmployeeComponent }]
    },
    
    {
        path: 'master', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: AddMasterComponent }]
    },
    {
        path: 'salary', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: EmployeeSalaryComponent }]
    },
    {
        path: 'attendence', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: EmployeeAttendenceComponent }]
    },
    {
        path: 'addproject', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: EmployeeProjectComponent }]
    },
    {
        path: 'taskregister', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: EmployeeTaskComponent }]
    },
    {
        path: 'projects', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: ListProjectComponent }]
    },
    {
        path: 'tasks', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: ListTaskComponent }]
    },
    {
        path: 'notification', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: NotificationComponent }]
    },
    {
        path: 'requestnotification', component: UserProfileComponent,canActivate:[PlanGuard],
        children: [{ path: '', component: RequestnotificationComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    // {
    //     path: 'addempoyee', component: AddEmployeeComponent
    // },
    // {
    //     path: 'employees', component: ListEmployeeComponent
    // },
    // {
    //     path: 'edit/:_id', component: EditEmployeeComponent
    // },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
    
];

