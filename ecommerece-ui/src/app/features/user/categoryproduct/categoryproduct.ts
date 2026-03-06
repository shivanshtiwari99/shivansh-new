import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { UserService , Product } from '../../../services/userservices';

@Component({
  selector: 'app-category-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoryproduct.html',
  styleUrls: ['./categoryproduct.css']
})
export class CategoryProduct implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText = '';
  loading = false;
  categoryId = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.categoryId = +params['cid'] || 0;

      if (this.categoryId) {
        this.loadProducts();
      } else {
        Swal.fire('Error', 'Category ID not found', 'error');
      }

    });

  }

  loadProducts() {

    this.loading = true;

    this.userService.getCategoryProducts(this.categoryId).subscribe({

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
    Swal.fire('Info', `${product.p_name} added to cart (demo)`, 'info');
  }

}