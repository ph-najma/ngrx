import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
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
  ngOnInit(): void {
    // Get user id from the query parameter
    this.route.queryParamMap.subscribe((params) => {
      const userId = params.get('id');

      console.log(userId); // Fetch the 'id' query parameter

      if (userId) {
        this.loadUserData(userId); // Load user data if ID is valid
      } else {
        console.error('Invalid User ID or User ID is not a number');
        // Optionally handle redirect or error here (e.g., navigate to error page)
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

    const formData = new FormData(); // Create a FormData object

    // Append the fields to FormData
    if (this.userObj.name !== '') formData.append('name', this.userObj.name);
    if (this.userObj.sname !== '') formData.append('sname', this.userObj.sname);
    if (this.userObj.mobileNo !== '')
      formData.append('mobileNo', this.userObj.mobileNo);
    if (this.userObj.address1 !== '')
      formData.append('address1', this.userObj.address1);
    if (this.userObj.address2 !== '')
      formData.append('address2', this.userObj.address2);
    if (this.userObj.email !== '') formData.append('email', this.userObj.email);

    // Call the user service to update user data with FormData
    this.userService.updateUser(userId, formData).subscribe(
      (res: any) => {
        if (res.message === 'User updated successfully') {
          alert('User updated successfully');
        } else {
          alert(res.message || 'Failed to update user');
        }
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('An error occurred while updating the user');
      }
    );
  }
}
