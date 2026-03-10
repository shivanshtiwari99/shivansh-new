import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


export interface Category {
  c_id: number;
  c_name: string;
  c_picture?: string;
}
export interface Product {
  p_id: number;
  p_name: string;
  p_price: number;
  p_desc: string;
  c_id: number;
  c_name?: string;
  p_picture?: string;
}
export interface User {
  u_id: number;
  name: string;
  email: string;
  password?: number;
  mobile: string;
  dob: string;
  gender: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private apiUrl = environment.apiUrl + 'adminapi';

  constructor(private http: HttpClient) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  // Dashboard Page
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashcount`, { headers: this.headers });
  }

  //Category Page\
  
  getCategories(): Observable<Category[]> {
    
    return this.http.get<Category[]>(`${this.apiUrl}/categories`, { headers: this.headers });
  }

  addCategory(name: string, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('c_name', name);
    if (file) formData.append('imageFile', file);
    return this.http.post(`${this.apiUrl}/addcategory`, formData, { headers: this.headers, responseType: 'text' });
  }

  updateCategory(id: number, name: string, file?: File, oldImage?: string): Observable<any> {
    const formData = new FormData();
    formData.append('c_id', id.toString());
    formData.append('c_name', name);
    if (file) formData.append('file', file);
    if (oldImage) formData.append('oldImage', oldImage);
    return this.http.put(`${this.apiUrl}/updatecategory`, formData, { headers: this.headers, responseType: 'text' });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteCateg?cid=${id}`, { headers: this.headers, responseType: 'text' });
  }

  // Product page

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { headers: this.headers });
  }

  addProduct(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/addproduct`, data, { headers: this.headers, responseType: 'text' });
  }

  updateProduct(data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateProduct`, data, { headers: this.headers, responseType: 'text' });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteProd?pid=${id}`, { headers: this.headers, responseType: 'text' });
  }

  // User Page

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers: this.headers });
  }

  updateUser(userObj: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateuser`, userObj, { headers: this.headers, responseType: 'text' });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser?uid=${id}`, { headers: this.headers, responseType: 'text' });
  }
}