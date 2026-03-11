import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/userservices';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-layout.html',
  styleUrls: ['./user-layout.css']
})
export class UserLayout {
  constructor(private userService:UserService){}
  ngOnInit(){
    this.userService.cartCount$.subscribe(count=>{
this.cartCount = count;
});

  this.loadCartCount();

}

  loading:boolean=false;

  cartCount:number=0;

  logout(){
    localStorage.removeItem("token");
  }
  loadCartCount(){

const email=this.userService.getEmailFromToken();

this.userService.getUserByEmail(email).subscribe(user=>{

const u_id=user[0].u_id;

this.userService.getCart(u_id).subscribe(res=>{

this.userService.updateCartCount(res.length);

});

});

}

}
