import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface User {
  u_id: number;
  name: string;
  email: string;
  password?: number;
  mobile: string;
  dob: string;
  gender: string;
  role?: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrls: ['./admin-users.css']
})
export class AdminUsers implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  searchText = '';

  // EDIT
  editId?: number;
  editName = '';
  editEmail = '';
  editMobile = '';
  editGender = '';
  editDob = '';

  private apiUrl = 'https://localhost:7071/api/AdminApi';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  get headers() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  // ================= LOAD =================
  loadUsers() {
    this.loading = true;

    this.http.get<User[]>(
      `${this.apiUrl}/users`,
      { headers: this.headers }
    ).subscribe({
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

  // ================= SEARCH =================
  filterUsers() {
    const val = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(u =>
      u.name.toLowerCase().includes(val)
    );
  }

  // ================= OPEN EDIT =================
  openEdit(user: User) {
    this.editId = user.u_id;
    this.editName = user.name;
    this.editEmail = user.email;
    this.editMobile = user.mobile;
    this.editGender = user.gender;

    if (user.dob) {
      const date = new Date(user.dob);
      this.editDob = date.toISOString().split('T')[0];
    }
  }

  // ================= UPDATE =================
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

    this.http.put(
      `${this.apiUrl}/updateuser`,
      userObj,
      {
        headers: this.headers,
        responseType: 'text'
      }
    ).subscribe({
      next: () => {
        Swal.fire('Success!', 'User updated successfully', 'success');
        this.loadUsers();
        this.editId = undefined;
        this.editName = '';
        this.editEmail = '';
        this.editMobile = '';
        this.editGender = '';
        this.editDob = '';
      },
      error: err => {
        console.error(err);
        Swal.fire('Error!', 'Update failed!', 'error');
      }
    });
  }

  // ================= DELETE =================
  deleteUser(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {

      if (result.isConfirmed) {

        this.http.delete(
          `${this.apiUrl}/deleteUser?uid=${id}`,
          {
            headers: this.headers,
            responseType: 'text'
          }
        ).subscribe({
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
}