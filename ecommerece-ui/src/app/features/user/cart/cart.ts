import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/userservices';

interface CartItem{
  cartitem_id:number
  p_id:number
  p_name:string
  p_price:number
  p_picture:string
  quantity:number
}

@Component({
  selector:'app-cart',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./cart.html',
  styleUrls:['./cart.css']
})

export class CartComponent implements OnInit{

cartItems:CartItem[]=[]

constructor(private userService:UserService){}

ngOnInit(){
  this.loadCart()
}

loadCart(){

 const email=this.userService.getEmailFromToken()

 this.userService.getUserByEmail(email).subscribe(user=>{

 const uid=user[0].u_id

 this.userService.getCart(uid).subscribe(res=>{
 this.cartItems=res
 })

 })

}

increase(item:any){

item.quantity++

this.userService.updateQuantity(item.cartitem_id,item.quantity)
.subscribe()

}

decrease(item:any){

if(item.quantity>1){

item.quantity--

this.userService.updateQuantity(item.cartitem_id,item.quantity)
.subscribe()

}

}

remove(id:number){

this.userService.removeCartItem(id).subscribe(()=>{

this.cartItems=this.cartItems.filter(x=>x.cartitem_id!=id)

})

}

getItemTotal(item:CartItem){
 return item.p_price*item.quantity
}

getTotal(){
 return this.cartItems.reduce((t,i)=>t+(i.p_price*i.quantity),0)
}

}