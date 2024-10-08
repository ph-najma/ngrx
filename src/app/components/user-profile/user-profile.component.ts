import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userObj: any = {
    name: '',
    sname: '',
    email: '',
    password: '',
    mobileNo: '',
    address1: '',
    address2: '',
    image: '',
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

  // Load user data based on user ID
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
  fileToUpload: File | null = null; // Holds the selected image file

  // Method triggered when a file is selected
  onFileChange(event: any) {
    const file = event.target.files[0]; // Get the first file from the file input
    if (file) {
      this.fileToUpload = file;
      console.log(file); // Store the file in the component
    }
  }

  // Handle user update
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

    // Append the image file if it exists
    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload); // File input name should match the one in the backend
      console.log(this.fileToUpload);
    }

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

  // Basic form validation
}
