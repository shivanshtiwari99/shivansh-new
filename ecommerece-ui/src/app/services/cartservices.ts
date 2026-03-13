import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { count, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

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
  providedIn: 'root',
})
export class Cartservices {
  
  private apiUrl = `${environment.apiUrl}UserApi`;
  constructor(private http: HttpClient) { }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  getEmailFromToken(): string {

    const token = localStorage.getItem('token');
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

  }

  getUserByEmail(email: string): Observable<User[]> {
      return this.http.get<User[]>(
        `${this.apiUrl}/emailuser?email=${email}`,
        { headers: this.headers }
      );
  
    }

  // ADD TO CART
  addToCart(u_id: number, p_id: number, quantity: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/addtocart?u_id=${u_id}&p_id=${p_id}&quantity=${quantity}`,
      {},
      { headers: this.headers }
    );
  }

  // GET CART
  getCart(u_id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getcart?u_id=${u_id}`,
      { headers: this.headers }
    );
  }

  // REMOVE CART ITEM
  removeCartItem(cartitem_id: number) {
    return this.http.delete(`${this.apiUrl}/removecart?cartitem_id=${cartitem_id}`, { headers: this.headers })
  }

  updateQuantity(cartitem_id: number, qty: number) {
    return this.http.put(
      `${this.apiUrl}/updatecartqty?cartitem_id=${cartitem_id}&qty=${qty}`,
      {},
      { headers: this.headers }
    )

  }
  cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  updateCartCount(count: number) {
    this.cartCount.next(count);
  }

  placeOrder(uid:number){
  return this.http.post<any>(this.apiUrl+'/placeorder?u_id='+uid,{},
    { headers: this.headers }
  );
}

}
