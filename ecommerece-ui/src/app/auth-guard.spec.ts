import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    return false;
  }
};