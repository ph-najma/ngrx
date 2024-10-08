import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user.actions';
import { selectToken } from '../../store/user.selectors';

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
    this.store.dispatch(UserActions.login(this.loginObj));
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        localStorage.setItem('token', token); // Store JWT
        this.router.navigateByUrl(
          this.loginObj.role === 'user' ? 'home' : 'userList'
        );
      }
    });
  }
}
