import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cartservices } from '../../../services/cartservices';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-layout.html',
  styleUrls: ['./user-layout.css']
})
export class UserLayout {
  constructor(private cartServices:Cartservices){}
  ngOnInit(){
    this.cartServices.cartCount$.subscribe(count=>{
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

const email=this.cartServices.getEmailFromToken();

this.cartServices.getUserByEmail(email).subscribe(user=>{

const u_id=user[0].u_id;

this.cartServices.getCart(u_id).subscribe(res=>{

this.cartServices.updateCartCount(res.length);

});

});

}

sidebarOpen = false;

toggleSidebar(){
  this.sidebarOpen = !this.sidebarOpen;
}

}
