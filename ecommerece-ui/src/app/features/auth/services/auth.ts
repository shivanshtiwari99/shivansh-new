import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = 'https://localhost:7071/api/homeapi';  

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  getUserRole(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decoded: any = jwtDecode(token);

  return decoded.role 
    || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
}
}