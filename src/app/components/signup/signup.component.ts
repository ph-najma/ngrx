import { Component, inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupObj: any = {
    name: '',
    email: '',
    password: '',
  };

  userService = inject(UserService);
  router = inject(Router);

  signup() {
    this.userService.createNewUser(this.signupObj).subscribe((res: any) => {
      if (res.result) {
        alert(res.message);
      } else {
        this.router.navigateByUrl('home');
      }
    });
  }
}
