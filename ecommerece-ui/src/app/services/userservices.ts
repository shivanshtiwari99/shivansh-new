import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { count, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Token } from '@angular/compiler';

export interface Category {
  c_id: number;
  c_name: string;
  c_picture?: string;
}

export interface Product {
  p_id: number;
  p_name: string;
  p_picture?: string;
  p_price: number;
  p_desc: string;
}
export interface User {

  u_id: any;
  name: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}UserApi`;

  constructor(private http: HttpClient) { }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  // Category Page

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiUrl}/categories`,
      { headers: this.headers }
    );
  }

  // Explore Product Page
  getCategoryProducts(cid: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/categproducts?cid=${cid}`,
      { headers: this.headers }
    );
  }

  // Product Page
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/products`,
      { headers: this.headers }
    );
  }

  // Profile Page

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/emailuser?email=${email}`,
      { headers: this.headers }
    );

  }

  updateUser(user: User): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/edituser`,
      user,
      { headers: this.headers }
    );
  }

  getEmailFromToken(): string {

    const token = localStorage.getItem('token');
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

  }

getOrders(uid:number){
  console.log(uid);
  
  return this.http.get<any>(this.apiUrl+'/getorders/'+uid,{ headers: this.headers });
}
getOrderItems(orderId:number){
 return this.http.get<any>(this.apiUrl+'/getorderitems/'+orderId,{ headers: this.headers });
}

cancelOrder(order_id:number){

return this.http.post(
this.apiUrl+'/cancelorder?order_id='+order_id,
{},
{ headers: this.headers }
)

}

  

}