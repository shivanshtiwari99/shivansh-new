// register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  registerForm: FormGroup;
  loading = false;

  private apiUrl = 'https://localhost:7071/api/HomeApi/Register'; // backend URL

  constructor(private fb: FormBuilder, private http: HttpClient,private authService:AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  onSubmit() {

  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Fill all fields correctly'
      });
    return;
  }

  const payload = this.registerForm.value;

  this.authService.register(payload).subscribe({
    next: (res:any) => {
      console.log(res);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Registration Successful'
      });

      this.registerForm.reset();
    },

    error: (err) => {
      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Registration failed'
      });
    }
  });

}
}