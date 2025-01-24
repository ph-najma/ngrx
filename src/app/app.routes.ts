import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { authGuard } from './auth.guard';

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
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
     
     
  {
    path: 'userList',
    component: UserListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'createUser',
    component: CreateUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'updateUser',
    component: UpdateUserComponent,
    canActivate: [authGuard],
  },
];
