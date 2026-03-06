import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const decoded: any = jwtDecode(token);

  const userRole =
    decoded.role ||
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  const expectedRole = route.data?.['role'];

  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};