import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/userservices';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  constructor(private userService:UserService,private router:Router){}

placeOrder(){

const email = this.userService.getEmailFromToken();

this.userService.getUserByEmail(email).subscribe(user=>{

const uid = user[0].u_id;

this.userService.placeOrder(uid).subscribe(res=>{

alert("Order Placed Successfully");

this.router.navigate(['/']);

});

});

}

}
