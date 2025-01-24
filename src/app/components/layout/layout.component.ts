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
  userId: string | null | number = null; 

  userService = inject(UserService);
  router = inject(Router); 

  ngOnInit(): void {
    this.loadUserId(); 
  }

  
  loadUserId() {
   
    this.userId = this.userService.getUserId();
  }
  navigateToProfile() {
    console.log('Navigating to profile with userId:', this.userId);
  
    this.router.navigate(['/profile'], { queryParams: { id: this.userId } });
  }
  onLogout() {
    this.userService.logout();
  }
}
