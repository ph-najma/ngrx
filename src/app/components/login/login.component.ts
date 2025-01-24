// login.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user.actions';
import { selectToken } from '../../store/user.selectors';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: any = {
    email: '',
    password: '',
    role: '',
  };

  userService = inject(UserService);
  router = inject(Router);
  store = inject(Store);

  login() {
    const loginMethod =
      this.loginObj.role === 'admin' ? 'loginAdmin' : 'onLogin';

    this.userService[loginMethod](this.loginObj)
      .pipe(
        catchError((error) => {
          this.store.dispatch(
            UserActions.loginFailure({ error: 'Login failed' })
          );
          return of(null);
        })
      )
      .subscribe((res) => {
        console.log(res);
        if (res && res.token) {
          this.store.dispatch(UserActions.loginSuccess({ token: res.token }));
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl(
            this.loginObj.role === 'user' ? 'home' : 'userList'
          );
        } else {
          // Handle login failure if necessary
        }
      });
  }
}
