import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService, LoginRequest } from '../../services/admin.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styles: [`
    .admin-login {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
    }

    .login-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }

    .login-btn {
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }

    .login-btn:hover {
      background: #0056b3;
    }

    .error-message {
      color: #dc3545;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
    }

    .loading {
      text-align: center;
      padding: 2rem;
    }
  `]
})
export class AdminLoginComponent implements OnInit {
  loginForm: LoginRequest = {
    username: '',
    password: ''
  };

  isLoading = false;
  error: string | null = null;

  constructor(
    protected adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    // Redirect if already logged in
    if (this.adminService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.error = null;

    this.adminService.login(this.loginForm).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error?.error || 'Login failed';
      }
    });
  }

  onLogout() {
    this.adminService.logout();
  }
}