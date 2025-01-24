import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user.actions'; // Import actions
import { selectError, selectSignupMessage } from '../../store/user.selectors'; // Import selectors
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
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
  private store = inject(Store); // Inject Store

  // Observable for error messages and signup success message
  error$: Observable<string | null> = this.store.select(selectError);
  signupMessage$: Observable<string | null> =
    this.store.select(selectSignupMessage);

  onSave() {
    // Dispatch the signup action
    this.store.dispatch(UserActions.signup({ ...this.userObj }));

    // Call the service to create the user
    this.userService.createNewUser(this.userObj).subscribe(
      (res: any) => {
        if (res.result) {
          // Dispatch success action
          this.store.dispatch(
            UserActions.signupSuccess({ message: res.message })
          );
          alert('User created successfully');
        } else {
          // Dispatch failure action
          this.store.dispatch(
            UserActions.signupFailure({ error: res.message })
          );
          alert(res.message);
        }
      },
      (error) => {
        // Dispatch failure action on error
        this.store.dispatch(
          UserActions.signupFailure({ error: error.message })
        );
        alert('An error occurred: ' + error.message);
      }
    );
  }
  onLogout() {
    this.userService.logout();
  }
}
