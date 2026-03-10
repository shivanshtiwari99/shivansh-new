import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  imports:[CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {

  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Product One',
      price: 499,
      qty: 1,
      image: 'https://localhost:7071/photos/product/MenShirt_3.webp'
    },
    {
      id: 2,
      name: 'Product Two',
      price: 899,
      qty: 2,
      image: 'https://localhost:7071/photos/product/MenShirt_1.webp'
    }
  ];

  increase(item: CartItem) {
    item.qty++;
  }

  decrease(item: CartItem) {
    if (item.qty > 1) {
      item.qty--;
    }
  }

  remove(id: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
  }

  getTotal() {
    return this.cartItems.reduce((t, i) => t + i.price * i.qty, 0);
  }
}