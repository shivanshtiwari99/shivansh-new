import { Component, OnInit } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface User {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
}

@Component({
  selector: 'app-profile',
  imports:[FormsModule,CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: User = { name: '', email: '', mobile: '', dob: '', gender: '' };
  editUser: User = { ...this.user };
  avatarUrl: string = '/Photos/product/Cricket_2.webp';
  modalOpen: boolean = false;

  private apiBase = 'https://localhost:7071/api/UserApi';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUser();
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getEmailFromToken(): string {
    const token = this.getToken();
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  }

  loadUser() {
    const email = this.getEmailFromToken();
    if (!email) return;

    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.getToken() });

    this.http.get<User[]>(`${this.apiBase}/emailuser?email=${email}`, { headers })
      .subscribe({
        next: res => {
          if (res.length > 0) {
            this.user = res[0];
            this.editUser = { ...this.user };
          }
        },
        error: err => console.error('Failed to load user:', err)
      });
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
    if (this.modalOpen) {
      this.editUser = { ...this.user }; // autofill
    }
  }

  updateProfile() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    this.http.put(`${this.apiBase}/edituser`, this.editUser, { headers })
      .subscribe({
        next: () => {
          Swal.fire('Success!', 'Profile updated successfully', 'success')
            .then(() => {
              this.user = { ...this.editUser };
              this.modalOpen = false;
            });
        },
        error: err => Swal.fire('Error!', 'Update failed.', 'error')
      });
  }

}