import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls:['./login.css']
})
export class Login {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {

          if (res.token) {
            localStorage.setItem('token', res.token);

            const role = this.authService.getUserRole()?.toLowerCase();

            if (role === 'admin') {
              Swal.fire('Success', 'Admin Login Successfully', 'success').then(()=>{
                this.router.navigate(['/admin-dashboard']);
              });
              
            } else if (role === 'user') {
              Swal.fire('Success', 'User Login Successfully', 'success').then(()=>{
                this.router.navigate(['/userCategory']);
              });
              
            } else {
              this.router.navigate(['/login']);
            }
          }
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            title:'Invalid Credentials',
            text:'Check your Credentials',
            icon:'error'
          })
        }
      });
    }
  }
}