import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  userId: string | null | number = null;
  userService = inject(UserService);
  userList: any[] = [];
  ngOnInit(): void {
    this.loadUsers();
    this.loadUserId();
  }
  loadUserId() {
    this.userId = this.userService.getUserId();
  }
  loadUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.userList = res.data;
    });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure want to Delete');
    if (isDelete) {
      this.userService.deleteUserById(id).subscribe((res: any) => {
        if (res.result) {
          this.loadUsers();
        } else {
          alert(res.message);
        }
      });
    }
  }

  update() {}
}
