import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './service/user.service';
export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']); // If no token, redirect to login page
    return false;
  }
};
