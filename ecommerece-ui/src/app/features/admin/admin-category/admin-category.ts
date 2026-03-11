import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService , Category } from '../../../services/adminservices';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-category.html',
  styleUrls: ['./admin-category.css']
})
export class AdminCategory implements OnInit {

  categories: Category[] = [];
  filteredCategories: Category[] = [];
  loading = false;

  addName = '';
  addFile?: File;

  editId?: number;
  editName = '';
  editFile?: File;
  editOldImage?: string;

  searchText = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadCategories();
  }
  
  // LOAD
  loadCategories() {
    this.loading = true;
    this.adminService.getCategories().subscribe({
      next: res => {
        this.categories = res;
        this.filteredCategories = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        Swal.fire('Error!', 'Failed to load categories', 'error');
        this.loading = false;
      }
    });
  }

  filterCategories() {
    const val = this.searchText.toLowerCase();
    this.filteredCategories = this.categories.filter(c =>
      c.c_name.toLowerCase().includes(val)
    );
  }

  // ADD 
  addCategory() {
    this.adminService.addCategory(this.addName, this.addFile).subscribe({
      next: () => {
        Swal.fire('Success!', 'Category added', 'success');
        this.addName = '';
        this.addFile = undefined;
        this.loadCategories();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error!', 'Failed to add category', 'error');
      }
    });
  }

  onAddFileChange(event: any) {
    this.addFile = event.target.files[0];
  }

  //  EDIT 
  openEdit(category: Category) {
    this.editId = category.c_id;
    this.editName = category.c_name;
    this.editOldImage = category.c_picture;
    console.log(this.editOldImage);
    
    
  }

  onEditFileChange(event: any) {
    this.editFile = event.target.files[0];
  }

  saveEdit() {
    if (!this.editId) return;
    this.adminService.updateCategory(this.editId, this.editName, this.editFile, this.editOldImage)
      .subscribe({
        next: () => {
          Swal.fire('Success!', 'Category updated', 'success');
          this.loadCategories();
          this.editId = undefined;
          this.editName = '';
          this.editFile = undefined;
          this.editOldImage = undefined;
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error!', 'Update failed!', 'error');
        }
      });
  }

  //  DELETE 
  deleteCategory(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Category deleted', 'success');
            this.loadCategories();
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error!', 'Delete failed!', 'error');
          }
        });
      }
    });
  }
}