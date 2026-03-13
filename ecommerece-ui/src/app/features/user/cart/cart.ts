import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cartservices } from '../../../services/cartservices';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface CartItem {
  cartitem_id: number
  p_id: number
  p_name: string
  p_price: number
  p_picture: string
  quantity: number
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})

export class CartComponent implements OnInit {

  cartItems: CartItem[] = []

  constructor(private cartServices: Cartservices,private router:Router) { }

  ngOnInit() {
    this.loadCart()
  }

  loadCart() {

    const email = this.cartServices.getEmailFromToken()

    this.cartServices.getUserByEmail(email).subscribe(user => {

      const uid = user[0].u_id

      this.cartServices.getCart(uid).subscribe(res => {
        this.cartItems = res
      })

    })

  }

  increase(item: any) {

    item.quantity++

    this.cartServices.updateQuantity(item.cartitem_id, item.quantity)
      .subscribe()

  }

  decrease(item: any) {

    if (item.quantity > 1) {

      item.quantity--

      this.cartServices.updateQuantity(item.cartitem_id, item.quantity)
        .subscribe()

    }

  }

  remove(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.cartServices.removeCartItem(id).subscribe(() => {

          this.cartItems = this.cartItems.filter(x => x.cartitem_id != id);

          Swal.fire(
            'Removed!',
            'Your item has been removed.',
            'success'
          );
          this.cartServices.cartCount.next(
        this.cartServices.cartCount.value - 1
      );

        });

      }
      
    });

  }
  getItemTotal(item: CartItem) {
    return item.p_price * item.quantity
  }

  getTotal() {
    return this.cartItems.reduce((t, i) => t + (i.p_price * i.quantity), 0)
  }

  goToCheckout(){
this.router.navigate(['/checkout']);
}
placeOrder(){

const email = this.cartServices.getEmailFromToken();

this.cartServices.getUserByEmail(email).subscribe(user=>{

const uid = user[0].u_id;

this.cartServices.placeOrder(uid).subscribe(res=>{

Swal.fire('Success', 'Order Placed Successfully', 'success')

this.router.navigate(['/cart']);
this.loadCart();
this.cartServices.cartCount.next(0);

});

});

}


}