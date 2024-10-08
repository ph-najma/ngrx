import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LandingComponent } from './landing/landing.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'home',
    component: LayoutComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'userList',
    component: UserListComponent,
  },
  {
    path: 'createUser',
    component: CreateUserComponent,
  },
  {
    path: 'updateUser',
    component: UpdateUserComponent,
  },
];
