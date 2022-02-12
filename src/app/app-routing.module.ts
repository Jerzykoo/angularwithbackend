import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent
   },
  {
    path: 'login',
    component: SigninComponent
   },
  {
    path: 'signup',
    component: SignupComponent
   },
  {
    path: 'user',
    component: UserComponent
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
