import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService ,Product,Category } from '../../../services/adminservices';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-product.html',
  styleUrls: ['./admin-product.css']
})
export class AdminProduct implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];

  loading = false;
  searchText = '';

  addName = '';
  addPrice?: number;
  addDesc = '';
  addCategoryId?: number;
  addFile?: File;

  editId?: number;
  editName = '';
  editPrice?: number;
  editDesc = '';
  editCategoryId?: number;
  editFile?: File;
  editOldImage?: string;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  // ================= LOAD =================
  loadProducts() {
    this.loading = true;
    this.adminService.getProducts().subscribe({
      next: res => {
        this.products = res;
        this.filteredProducts = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        Swal.fire('Error!', 'Failed to load products', 'error');
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.adminService.getCategories().subscribe({
      next: res => this.categories = res,
      error: err => {
        console.error(err);
        Swal.fire('Error!', 'Failed to load categories', 'error');
      }
    });
  }

  filterProducts() {
    const val = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.p_name.toLowerCase().includes(val)
    );
  }

  // ================= ADD =================
  addProduct() {
    const formData = new FormData();
    formData.append('p_name', this.addName);
    formData.append('p_price', this.addPrice?.toString() || '0');
    formData.append('p_desc', this.addDesc);
    formData.append('c_id', this.addCategoryId?.toString() || '0');
    if (this.addFile) formData.append('imageFile', this.addFile);

    this.adminService.addProduct(formData).subscribe({
      next: () => {
        Swal.fire('Success!', 'Product added successfully', 'success');
        this.resetAddForm();
        this.loadProducts();
      },
      error: err => {
        console.error(err);
        Swal.fire('Error!', 'Failed to add product', 'error');
      }
    });
  }

  onAddFileChange(event: any) {
    this.addFile = event.target.files[0];
  }

  openEdit(product: Product) {
    this.editId = product.p_id;
    this.editName = product.p_name;
    this.editPrice = product.p_price;
    this.editDesc = product.p_desc;
    this.editCategoryId = product.c_id;
    this.editOldImage = product.p_picture;
  }

  onEditFileChange(event: any) {
    this.editFile = event.target.files[0];
  }

  saveEdit() {
    if (!this.editId) return;

    const formData = new FormData();
    formData.append('p_id', this.editId.toString());
    formData.append('p_name', this.editName);
    formData.append('p_price', this.editPrice?.toString() || '0');
    formData.append('p_desc', this.editDesc);
    formData.append('c_id', this.editCategoryId?.toString() || '0');
    if (this.editOldImage) formData.append('p_picture', this.editOldImage);
    if (this.editFile) formData.append('imageFile', this.editFile);

    this.adminService.updateProduct(formData).subscribe({
      next: () => {
        Swal.fire('Success!', 'Product updated successfully', 'success');
        this.resetEditForm();
        this.loadProducts();
      },
      error: err => {
        console.error(err);
        Swal.fire('Error!', 'Update failed!', 'error');
      }
    });
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Product deleted', 'success');
            this.loadProducts();
          },
          error: err => {
            console.error(err);
            Swal.fire('Error!', 'Delete failed!', 'error');
          }
        });
      }
    });
  }

  private resetAddForm() {
    this.addName = '';
    this.addPrice = undefined;
    this.addDesc = '';
    this.addCategoryId = undefined;
    this.addFile = undefined;
  }

  private resetEditForm() {
    this.editId = undefined;
    this.editName = '';
    this.editPrice = undefined;
    this.editDesc = '';
    this.editCategoryId = undefined;
    this.editFile = undefined;
    this.editOldImage = undefined;
  }
}