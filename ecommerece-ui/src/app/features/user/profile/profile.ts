import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService , User } from '../../../services/userservices';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: User = {u_id:'', name: '', email: '', mobile: '', dob: '', gender: '' };
  editUser: User = { ...this.user };

  avatarUrl = '/Photos/product/Cricket_2.webp';
  modalOpen = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {

    const email = this.userService.getEmailFromToken();

    if (!email) return;

    this.userService.getUserByEmail(email).subscribe({

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
      this.editUser = { ...this.user };
      this.editUser.dob=(this.editUser.dob).split('T')[0];
    }

  }

  updateProfile() {

    this.userService.updateUser(this.editUser).subscribe({

      next: () => {

        Swal.fire('Success!', 'Profile updated successfully', 'success')
          .then(() => {

            this.user = { ...this.editUser };
            this.modalOpen = false;

          });

      },

      error: () => Swal.fire('Error!', 'Update failed.', 'error')

    });

  }

}