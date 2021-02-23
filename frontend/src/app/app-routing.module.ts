import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { LogoutComponent } from './logout/logout.component';
import { UseraccComponent } from './useracc/useracc.component';
import { AuthGaurdService } from './auth-gaurd.service';
import { DonReqListComponent } from './don-req-list/don-req-list.component';
import { AdminGuardService } from './admin-guard.service';
import { AdminlogoutComponent } from './adminlogout/adminlogout.component';
import { HomeauthGuardService } from './homeauth-guard.service';
import { RegisterReqComponent } from './register-req/register-req.component';
import { LogingaurdService } from './logingaurd.service';
import { UserDonationComponent } from './user-donation/user-donation.component';
import { AdminAccComponent } from './admin-acc/admin-acc.component';
import { ApprovedRequestComponent } from './approved-request/approved-request.component';
import { AdminOrgDetailsComponent } from './admin-org-details/admin-org-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent,canActivate:[HomeauthGuardService] },
  { path: 'register-admin', component: RegisterAdminComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'login-admin', component: LoginAdminComponent,canActivate:[LogingaurdService] },
  { path: 'login-user', component: LoginUserComponent,canActivate:[LogingaurdService] },
  { path: 'org_details/:id', component: OrgDetailsComponent},
  {path: 'logout',component:LogoutComponent,canActivate:[AuthGaurdService]},
  {path: 'logoutadmin',component:AdminlogoutComponent,canActivate:[AdminGuardService]},
  {path:'useracc',component:UseraccComponent,canActivate:[AuthGaurdService]},
  {path:'addreq',component:RegisterReqComponent,canActivate:[AdminGuardService]},
  { path: 'approve_requests', component:DonReqListComponent,canActivate:[AdminGuardService]},
  { path: 'approved', component:ApprovedRequestComponent,canActivate:[AdminGuardService]},
  { path: 'mydonation', component:UserDonationComponent},
  { path: 'admin', component:AdminOrgDetailsComponent,canActivate:[AdminGuardService]},
  
  { path: 'admin1', component:AdminAccComponent,canActivate:[AdminGuardService]},
 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
