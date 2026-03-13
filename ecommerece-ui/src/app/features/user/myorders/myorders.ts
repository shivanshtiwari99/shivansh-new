import { Component,OnInit } from '@angular/core';
import { UserService } from '../../../services/userservices';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
selector:'app-myorders',
imports:[CommonModule,RouterLink],
templateUrl:'./myorders.html',
styleUrls:['./myorders.css']
})

export class MyordersComponent implements OnInit{

orders:any[]=[]

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

Swal.fire({
title:'Are you sure?',
text:'You want to cancel this order',
icon:'warning',
showCancelButton:true,
confirmButtonColor:'#e73838',
cancelButtonColor:'#6c757d',
confirmButtonText:'Yes, Cancel Order'
}).then((result)=>{

if(result.isConfirmed){

this.userService.cancelOrder(id)
.subscribe(()=>{

const order=this.orders.find(o=>o.order_id===id)

if(order){
order.status="Cancelled"
}

Swal.fire(
'Cancelled!',
'Your order has been cancelled.',
'success'
)

})

}

})

}

}