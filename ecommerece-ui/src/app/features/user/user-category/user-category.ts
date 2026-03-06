import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService , Category } from '../../../services/userservices';

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
  searchText = '';
  loading = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;

    this.userService.getCategories().subscribe({
      next: res => {
        this.categories = res;
        this.filteredCategories = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
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
    this.router.navigate(['/cProduct'], { queryParams: { cid: c_id } });
  }
}