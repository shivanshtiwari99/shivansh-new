import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

interface Category {
  c_id: number;
  c_name: string;
  c_picture?: string;
}

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-category.html',
  styleUrls: ['./admin-category.css']
})
export class AdminCategory implements OnInit {

  categories: Category[] = [];
  filteredCategories: Category[] = [];
  loading = false;

  // Add
  addName = '';
  addFile?: File;

  // Edit
  editId?: number;
  editName = '';
  editFile?: File;
  editOldImage?: string;

  searchText = '';

  private apiUrl = 'https://localhost:7071/api/AdminApi';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
  }

  get headers() {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  // ================= LOAD =================
  loadCategories() {
    this.loading = true;

    this.http.get<Category[]>(
      `${this.apiUrl}/categories`,
      { headers: this.headers }
    ).subscribe({
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

  // ================= ADD =================
  addCategory() {

    const formData = new FormData();
    formData.append('c_name', this.addName);
    if (this.addFile) formData.append('imageFile', this.addFile);

    this.http.post(
      `${this.apiUrl}/addcategory`,
      formData,
      {
        headers: this.headers,
        responseType: 'text'
      }
    ).subscribe(
      () => {
        Swal.fire('Success!', 'Category added', 'success');
        this.addName = '';
        this.addFile = undefined;
        this.loadCategories();
      },
      (err) => {
        console.error(err);
        Swal.fire('Error!', 'Failed to add category', 'error');
      }
    );
  }

  onAddFileChange(event: any) {
    this.addFile = event.target.files[0];
  }

  // ================= EDIT =================
  openEdit(category: Category) {
    this.editId = category.c_id;
    this.editName = category.c_name;
    this.editOldImage = category.c_picture;
  }

  onEditFileChange(event: any) {
    this.editFile = event.target.files[0];
  }

  saveEdit() {

    if (!this.editId) return;

    const formData = new FormData();
    formData.append('c_id', this.editId.toString());
    formData.append('c_name', this.editName);

    if (this.editFile) formData.append('file', this.editFile);
    if (this.editOldImage) formData.append('oldImage', this.editOldImage);

    this.http.put(
      `${this.apiUrl}/updatecategory`,
      formData,
      {
        headers: this.headers,
        responseType: 'text'
      }
    ).subscribe(
      () => {
        Swal.fire('Success!', 'Category updated', 'success');
        this.loadCategories();
        this.editId = undefined;
        this.editName = '';
        this.editFile = undefined;
        this.editOldImage = undefined;
      },
      (err) => {
        console.error(err);
        Swal.fire('Error!', 'Update failed!', 'error');
      }
    );
  }

  // ================= DELETE =================
  deleteCategory(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {

      if (result.isConfirmed) {

        this.http.delete(
          `${this.apiUrl}/deleteCateg?cid=${id}`,
          {
            headers: this.headers,
            responseType: 'text'
          }
        ).subscribe(
          () => {
            Swal.fire('Deleted!', 'Category deleted', 'success');
            this.loadCategories();
          },
          (err) => {
            console.error(err);
            Swal.fire('Error!', 'Delete failed!', 'error');
          }
        );

      }

    });
  }
}