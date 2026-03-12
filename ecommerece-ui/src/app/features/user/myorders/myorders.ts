import { Component,OnInit } from '@angular/core';
import { UserService } from '../../../services/userservices';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
selector:'app-myorders',
imports:[CommonModule,RouterLink],
templateUrl:'./myorders.html',
styleUrls:['./myorders.css']
})

export class MyordersComponent implements OnInit{

  
orders:any[]=[]
orderId:any
status:any

constructor(private userService:UserService){}

ngOnInit(){

const email=this.userService.getEmailFromToken()

this.userService.getUserByEmail(email).subscribe(user=>{

const uid=user[0].u_id

this.userService.getOrders(uid).subscribe(res=>{  
  this.orders=res

})

})

}
cancelOrder(id:number){

this.userService.cancelOrder(id)
.subscribe(()=>{

this.orders // orders refresh

})

}


}