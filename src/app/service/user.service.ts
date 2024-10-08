import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, obj);
  }
  loginAdmin(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginAdmin`, obj);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/userList`);
  }

  createNewUser(obj: any) {
    return this.http.post(`${this.apiUrl}/createNewUser`, obj);
  }

  deleteUserById(userId: number) {
    return this.http.delete(`${this.apiUrl}/deleteUser?id=` + userId);
  }

  updateUser(id: string | null, obj: any) {
    return this.http.post(`${this.apiUrl}/updateUser?id=` + id, obj);
  }
  getUserId(): string | null {
    const token = localStorage.getItem('token');
    console.log(token); // Or wherever you store the token
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded._id; // Return user ID from decoded token
    }
    return null;
  }
  getUserById(userId: string) {
    return this.http.get(`${this.apiUrl}/profile?id=${userId}`);
  }
}
