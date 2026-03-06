import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService, User } from '../../../services/adminservices';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-users.html',
  styleUrls: ['./admin-users.css']
})
export class AdminUsers implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  searchText = '';

  editId?: number;
  editName = '';
  editEmail = '';
  editMobile = '';
  editGender = '';
  editDob = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ================= LOAD =================
  loadUsers() {
    this.loading = true;
    this.adminService.getUsers().subscribe({
      next: res => {
        this.users = res;
        this.filteredUsers = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        Swal.fire('Error!', 'Failed to load users', 'error');
        this.loading = false;
      }
    });
  }

  filterUsers() {
    const val = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(u =>
      u.name.toLowerCase().includes(val)
    );
  }

  openEdit(user: User) {
    this.editId = user.u_id;
    this.editName = user.name;
    this.editEmail = user.email;
    this.editMobile = user.mobile;
    this.editGender = user.gender;
    if (user.dob) this.editDob = new Date(user.dob).toISOString().split('T')[0];
  }

  saveEdit() {
    if (!this.editId) return;

    const userObj = {
      u_id: this.editId,
      name: this.editName,
      email: this.editEmail,
      mobile: this.editMobile,
      gender: this.editGender,
      dob: this.editDob
    };

    this.adminService.updateUser(userObj).subscribe({
      next: () => {
        Swal.fire('Success!', 'User updated successfully', 'success');
        this.resetEditForm();
        this.loadUsers();
      },
      error: err => {
        console.error(err);
        Swal.fire('Error!', 'Update failed!', 'error');
      }
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'User deleted', 'success');
            this.loadUsers();
          },
          error: err => {
            console.error(err);
            Swal.fire('Error!', 'Delete failed!', 'error');
          }
        });
      }
    });
  }

  private resetEditForm() {
    this.editId = undefined;
    this.editName = '';
    this.editEmail = '';
    this.editMobile = '';
    this.editGender = '';
    this.editDob = '';
  }
}