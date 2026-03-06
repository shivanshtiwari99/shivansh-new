// category-product.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

interface Product {
  p_id: number;
  p_name: string;
  p_picture?: string;
  p_price: number;
  p_desc: string;
}

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
  searchText: string = '';
  loading: boolean = false;

  private apiUrl = 'https://localhost:7071/api/UserApi/categproducts'; // Update your API URL
  private categoryId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get category id from query param
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

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Product[]>(`${this.apiUrl}?cid=${this.categoryId}`, { headers }).subscribe({
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
    // Optional: implement add to cart logic
    Swal.fire('Info', `${product.p_name} added to cart (demo)`, 'info');
  }
}