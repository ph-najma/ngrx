import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user.actions';
import { selectUsers, selectError } from '../../store/user.selectors';
import { Observable, of } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userId: string | null | number = null;
  userList$: Observable<any[]> = of([]); // Observable for the user list
  error$: Observable<string | null> = of(); // Observable for error messages

  private store = inject(Store); // Inject Store
  private userService = inject(UserService); // Inject UserService

  ngOnInit(): void {
    this.loadUserId();
    this.loadUsers();

    // Subscribe to the users and error observables
    this.userList$ = this.store.select(selectUsers);
    this.error$ = this.store.select(selectError);
    console.log(this.userList$);
    this.userList$.subscribe((users) => {
      console.log('Current users:', users); // This will log the actual user data
    });
  }

  loadUserId() {
    this.userId = this.userService.getUserId();
    console.log(this.userId); // Use the injected UserService
  }

  loadUsers() {
    this.store.dispatch(UserActions.loadUsers());
    this.userService.getUsers().subscribe(
      (response: any) => {
        console.log('Fetched users:', response); // Debug: Log the fetched users
        if (Array.isArray(response.data)) {
          // Check if response.data is an array
          this.store.dispatch(
            UserActions.loadUsersSuccess({ users: response.data })
          ); // Dispatch success action
        } else {
          console.error('Expected an array but received:', response.data); // Log an error if data is not an array
        }
      },
      (error) => {
        this.store.dispatch(
          UserActions.loadUsersFailure({ error: error.message })
        ); // Dispatch failure action
      }
    );
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      this.userService.deleteUserById(id).subscribe((res: any) => {
        if (res.result) {
          this.loadUsers(); // Reload users after deletion
        } else {
          alert(res.message);
        }
      });
    }
  }
  onLogout() {
    this.userService.logout();
  }
}
