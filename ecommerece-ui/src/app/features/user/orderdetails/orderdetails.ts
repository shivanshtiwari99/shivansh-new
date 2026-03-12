import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/userservices';
import { CommonModule } from '@angular/common';

@Component({
selector:'app-orderdetails',
imports:[CommonModule],
templateUrl:'./orderdetails.html',
styleUrls: ['./orderdetails.css']
})

export class OrderdetailsComponent implements OnInit{

items:any[]=[]
orderId:any

constructor(
private route:ActivatedRoute,
private userService:UserService){}

ngOnInit(){

this.orderId=this.route.snapshot.paramMap.get('id')

this.userService.getOrderItems(this.orderId)
.subscribe(res=>{
    console.log(res);
    
this.items=res
})

}

}