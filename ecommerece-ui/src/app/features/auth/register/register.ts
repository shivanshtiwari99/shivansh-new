// register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete!',
        text: 'Please fill all fields correctly.',
      });
      return;
    }

    const payload = this.registerForm.value;
    this.loading = true;
  
    console.log(payload,"adj")
     try {
    const res: any =  this.http.post(this.apiUrl, payload);
    console.log("Response:", res);

    Swal.fire({
      icon: 'success',
      title: 'Welcome!',
      text: res?.message || 'Registration Successful!',
    });
    this.registerForm.reset();
  } catch (err: any) {
    console.error(err);

    const msg = err?.error?.message || 'Registration failed. Check your inputs.';
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: msg,
    });
  } finally {
    this.loading = false;
  }
}
}