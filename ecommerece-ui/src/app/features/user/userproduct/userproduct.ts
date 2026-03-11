import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService , Product } from '../../../services/userservices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './userproduct.html',
  styleUrls: ['./userproduct.css']
})
export class AllProduct implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText = '';
  loading = false;
  
  constructor(private userService: UserService) {
    this.loadProducts();
  }

  ngOnInit(): void {
    
  }

  loadProducts() {

    this.loading = true;

    this.userService.getAllProducts().subscribe({

      next: res => {
        this.products = res;
        this.filteredProducts = res;
        this.loading = false;
      },

      error: err => {
        console.error(err);
        Swal.fire('Error!', 'Failed to load products.', 'error');
        this.loading = false;
      }
    });
  }

  filterProducts() {

    const value = this.searchText.toLowerCase();

    this.filteredProducts = this.products.filter(p =>
      p.p_name.toLowerCase().includes(value)
    );
  }

  addToCart(product: Product) {

  const email = this.userService.getEmailFromToken();

  this.userService.getUserByEmail(email).subscribe(user => {

    const u_id = user[0].u_id;

   this.userService.addToCart(u_id, product.p_id, 1).subscribe(res=>{

if(res==1){
Swal.fire('Success','Product added to cart','success')
this.userService.cartCount.next(
this.userService.cartCount.value + 1
);
}
else if(res==-1){
Swal.fire('Info','Product already added in cart','info')
}

})

  });
  

}


}