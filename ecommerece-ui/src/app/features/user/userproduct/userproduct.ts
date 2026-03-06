// all-product.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface Product {
  p_id: number;
  p_name: string;
  p_picture?: string;
  p_price: number;
  p_desc: string;
}

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
  searchText: string = '';
  loading: boolean = false;

  private apiUrl = 'https://localhost:7071/api/UserApi/products'; // Update backend URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Product[]>(this.apiUrl, { headers }).subscribe({
      next: (res) => {
        this.products = res;
        this.filteredProducts = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
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
    // Optional: implement cart logic
    Swal.fire('Info', `${product.p_name} added to cart (demo)`, 'info');
  }

}