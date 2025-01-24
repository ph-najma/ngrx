import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Set the token in the Authorization header
    });
  }

  onLogin(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, obj);
  }

  loginAdmin(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginAdmin`, obj);
  }

  getUsers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/userList`, { headers: this.getAuthHeaders() }) // Include token in request
      .pipe(tap((users) => console.log('fetched users:', users)));
  }

  createNewUser(obj: any) {
    return this.http.post(`${this.apiUrl}/createNewUser`, obj, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUserById(userId: number) {
    return this.http.delete(`${this.apiUrl}/deleteUser?id=` + userId, {
      headers: this.getAuthHeaders(),
    }); // Include token in request
  }

  updateUser(id: string | null, obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateUser?id=` + id, obj, {
      headers: this.getAuthHeaders(),
    }); // Include token in request
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded._id; // Return user ID from decoded token
    }
    return null;
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile?id=${userId}`, {
      headers: this.getAuthHeaders(),
    }); // Include token in request
  }
  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
