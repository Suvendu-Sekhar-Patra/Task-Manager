import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

export function authGuard(): boolean | UrlTree {
  const router = inject(Router);

  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  const isLoggedIn = !!token; 

  if (isLoggedIn) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
}
