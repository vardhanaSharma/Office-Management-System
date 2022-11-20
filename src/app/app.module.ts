// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from 'routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { AddEmployeeComponent } from './user-profile/add-employee/add-employee.component';


import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

// rechaptcha
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ListEmployeeComponent } from './user-profile/list-employee/list-employee.component';
import {MatSortModule} from '@angular/material/sort';
import { EditEmployeeComponent } from './user-profile/edit-employee/edit-employee.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AddMasterComponent } from './user-profile/add-master/add-master.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

import { SuperadminComponent } from './superadmin/superadmin/superadmin.component';
import { SuperadminProfileComponent } from './superadmin-profile/superadmin-profile/superadmin-profile.component';
import { CompanyComponent } from './superadmin-profile/company/company/company.component';
import { PlanComponent } from './superadmin-profile/plan/plan/plan.component';
import { ListPlanComponent } from './superadmin-profile/list-plan/list-plan/list-plan.component';
import { EmployeeProfileComponent } from './user-profile/employee-profile/employee-profile.component';
import { EmployeeSalaryComponent } from './user-profile/employee-salary/employee-salary/employee-salary.component';
import { PlanFeaturesComponent } from './superadmin-profile/plan-features/plan-features/plan-features.component';
import { EmployeeAttendenceComponent } from './user-profile/employee-attendence/employee-attendence/employee-attendence.component';
import { EmployeeProjectComponent } from './user-profile/employee-project/employee-project/employee-project.component';
import { EmployeeLoginComponent } from './user/employee-login/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { MyAttendenceComponent } from './employee/my-attendence/my-attendence.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeTaskComponent } from './user-profile/employee-task/employee-task/employee-task.component';
import { ListTaskComponent } from './user-profile/list-task/list-task/list-task.component';
import { ListProjectComponent } from './user-profile/list-project/list-project/list-project.component';
import { MyTaskComponent } from './employee/my-task/my-task/my-task.component';
import { UpdateStatusComponent } from './employee/update-status/update-status/update-status.component';
import { NotificationComponent } from './user-profile/notification/notification/notification.component';
import { MyNotificationComponent } from './employee/my-notification/my-notification/my-notification.component';
import { RequestnotificationComponent } from './user-profile/requestnotification/requestnotification/requestnotification.component';
import { MyRequestnotificationComponent } from './employee/my-requestnotification/my-requestnotification/my-requestnotification.component';

 
// import { NgxCaptchaModule } from 'ngx-captcha';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    EditEmployeeComponent,
    AddMasterComponent,
    SuperadminComponent,
    SuperadminProfileComponent,
    CompanyComponent,
    PlanComponent,
    ListPlanComponent,
    EmployeeProfileComponent,
    EmployeeSalaryComponent,
    PlanFeaturesComponent,
    EmployeeAttendenceComponent,
    EmployeeProjectComponent,
    EmployeeLoginComponent,
    EmployeeDashboardComponent,
    MyAttendenceComponent,
    EmployeeTaskComponent,
    ListTaskComponent,
    ListProjectComponent,
    MyTaskComponent,
    UpdateStatusComponent,
    NotificationComponent,
     MyNotificationComponent,
     RequestnotificationComponent,
     MyRequestnotificationComponent,
    
    ],
  imports: [
    
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSelectModule,
    MatInputModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
