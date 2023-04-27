import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.baseUrl

const headers = new HttpHeaders({
  Authorization: `Bearer ${localStorage.getItem('auth-token')}`
});

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserAll(): Observable<any> {
    return this.http.get(API_URL + 'user',);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(API_URL + 'auth/user/register', data);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.patch(API_URL + "user?id=" + id, data);
  }

  deleteUser(id: string) {
    return this.http.delete(API_URL + "user?id=" + id)
  }

  findUser(id: string) {
    return this.http.get(API_URL + "user/" + id)
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
