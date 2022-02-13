import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent, canActivate: [AuthGuard]
   },
  {
    path: 'login',
    component: SigninComponent
   },
  {
    path: 'signup',
    component: SignupComponent,
   },
  {
    path: 'user',
    component: UserComponent, canActivate: [AuthGuard]
   },
  {
    path: 'edit-user/:id', canActivate: [AuthGuard],
    component: EditUserComponent
   },
  // {
  //   path: 'edit-user',
  //   component: EditUserComponent
  //  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
