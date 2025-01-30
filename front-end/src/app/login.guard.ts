import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const otpVerified = localStorage.getItem('otp');

    if (otpVerified === 'Yes') {
      this.router.navigate(['/seat-selection']); // ✅ Redirect to seat selection if logged in
      return false; // ✅ Prevent access to login page
    }
    
    return true; // ✅ Allow access to login page
  }
}
