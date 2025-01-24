import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user.actions'; // Import user actions
import { selectError, selectUpdateMessage } from '../../store/user.selectors'; // Import selectors
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
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
  route = inject(ActivatedRoute);
  private store = inject(Store); // Inject Store

  // Observable for error messages and update success message
  error$: Observable<string | null> = this.store.select(selectError);
  updateMessage$: Observable<string | null> =
    this.store.select(selectUpdateMessage);

  ngOnInit(): void {
    // Get user id from the query parameter
    this.route.queryParamMap.subscribe((params) => {
      const userId = params.get('id');

      console.log(userId); // Fetch the 'id' query parameter

      if (userId) {
        this.loadUserData(userId); // Load user data if ID is valid
      } else {
        console.error('Invalid User ID or User ID is not a number');
      }
    });
  }

  loadUserData(userId: string) {
    this.userService.getUserById(userId).subscribe(
      (res: any) => {
        if (res) {
          this.userObj = { ...this.userObj, ...res }; // Patch the user data
        } else {
          console.error('User not found');
        }
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );
  }

  update() {
    const userId = this.userService.getUserId(); // Get the user ID
    console.log('Updating User ID:', userId); // Log the userId being updated

    // Dispatch the update action with the user ID and user object
    this.store.dispatch(
      UserActions.updateUser({ userId, userData: this.userObj })
    );

    // Call the service to update the user
    this.userService.updateUser(userId, this.userObj).subscribe(
      (res: any) => {
        if (res.result) {
          // Dispatch success action
          this.store.dispatch(
            UserActions.updateUserSuccess({ message: res.message })
          );
          alert('User updated successfully');
          window.location.reload();
        } else {
          // Dispatch failure action
          this.store.dispatch(
            UserActions.updateUserFailure({ error: res.message })
          );
          alert(res.message);
        }
      },
      (error) => {
        // Dispatch failure action on error
        this.store.dispatch(
          UserActions.updateUserFailure({ error: error.message })
        );
        alert('An error occurred: ' + error.message);
      }
    );
  }
  onLogout() {
    this.userService.logout();
  }
}
