import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  userId: string | null | number = null; // Declare userId as a property of the class

  userService = inject(UserService);
  router = inject(Router); // Inject the UserService

  ngOnInit(): void {
    this.loadUserId(); // Load userId on component initialization
  }

  // Example method to load userId
  loadUserId() {
    // Assuming you have a method in UserService to get the current user ID
    this.userId = this.userService.getUserId();
  }
  navigateToProfile() {
    console.log('Navigating to profile with userId:', this.userId);
    // This uses the Angular Router for navigation
    this.router.navigate(['/profile'], { queryParams: { id: this.userId } });
  }
}
