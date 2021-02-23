import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrgListComponent } from './org-list/org-list.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { ReqListComponent } from './req-list/req-list.component';
import { ReqDetailsComponent } from './req-details/req-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DonReqListComponent } from './don-req-list/don-req-list.component';
import { RegisterReqComponent } from './register-req/register-req.component';
import { UserDonationComponent } from './user-donation/user-donation.component';
import { BasicAuthHtppInterceptorService } from './basic-auth-htpp-interceptor.service';
import { ApprovedRequestComponent } from './approved-request/approved-request.component';
import { DisplayOrgInListComponent } from './display-org-in-list/display-org-in-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminOrgDetailsComponent } from './admin-org-details/admin-org-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginAdminComponent,
    LoginUserComponent,
    RegisterUserComponent,
    RegisterAdminComponent,
    PageNotFoundComponent,
    OrgListComponent,
    OrgDetailsComponent,
    ReqListComponent,
    ReqDetailsComponent,
    NavbarComponent,
    DonReqListComponent,
    RegisterReqComponent,
    UserDonationComponent,
    ApprovedRequestComponent,
    DisplayOrgInListComponent,
    AdminOrgDetailsComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: BasicAuthHtppInterceptorService,
    multi   : true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
