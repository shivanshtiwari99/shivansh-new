import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cartservices } from '../../../services/cartservices';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  constructor(private cartServices:Cartservices,private router:Router){}

placeOrder(){

const email = this.cartServices.getEmailFromToken();

this.cartServices.getUserByEmail(email).subscribe(user=>{

const uid = user[0].u_id;

this.cartServices.placeOrder(uid).subscribe(res=>{

alert("Order Placed Successfully");

this.router.navigate(['/']);

});

});

}

}
