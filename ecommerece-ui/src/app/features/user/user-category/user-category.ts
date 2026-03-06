// user-category.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Category {
  c_id: number;
  c_name: string;
  c_picture?: string;
}

@Component({
  selector: 'app-user-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-category.html',
  styleUrls: ['./user-category.css']
})
export class UserCategory implements OnInit {

  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchText: string = '';
  loading: boolean = false;

  private apiUrl = 'https://localhost:7071/api/UserApi/categories'; // Update your API URL

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Category[]>(this.apiUrl, { headers }).subscribe({
      next: (res) => {
        this.categories = res;
        this.filteredCategories = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        Swal.fire('Error!', 'Failed to load categories.', 'error');
        this.loading = false;
      }
    });
  }

  filterCategories() {
    const value = this.searchText.toLowerCase();
    this.filteredCategories = this.categories.filter(c =>
      c.c_name.toLowerCase().includes(value)
    );
  }

  exploreCategory(c_id: number) {
    // Navigate to category product page with cid query param
    this.router.navigate(['/cProduct'], { queryParams: { cid: c_id } });
  }
}