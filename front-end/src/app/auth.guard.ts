import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const otpVerified = localStorage.getItem('otp');

    if (otpVerified === 'Yes') {
      return true; // Allow access
    } else {
      this.router.navigate(['/login']); // Redirect to login
      return false;
    }
  }
}
