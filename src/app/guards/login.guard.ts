import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      this.router.navigate(['commentsdashboard']); // Redirect to the comments dashboard if the user is already logged in
      return false; // Prevent access to the login screen
    }
    return true; // Allow access to the login screen for non-logged-in users
  }
}