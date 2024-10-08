import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  userObj: any = {
    name: '',
    email: '',
    mobileNo: '',
    city: '',
    address1: '',
    address2: '',
    password: '',
  };

  userService = inject(UserService);
  onSave() {
    this.userService.createNewUser(this.userObj).subscribe((res: any) => {
      if (res.result) {
        alert('User created success');
      } else {
        alert(res.message);
      }
    });
  }
}
