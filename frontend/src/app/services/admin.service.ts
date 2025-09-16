import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Admin {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;
  private tokenKey = 'admin_token';
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  isLoggedIn = signal(false);

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          this.isAdminSubject.next(true);
          this.isLoggedIn.set(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAdminSubject.next(false);
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getAuthHeaders(): { [key: string]: string } {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  verifyToken(): Observable<{ valid: boolean; admin: Admin }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ valid: boolean; admin: Admin }>(`${this.apiUrl}/verify`, {
      headers
    }).pipe(
      tap(response => {
        if (!response.valid) {
          this.logout();
        }
      })
    );
  }

  private checkAuthStatus(): void {
    const token = this.getToken();
    if (token) {
      this.verifyToken().subscribe({
        next: (response) => {
          this.isAdminSubject.next(response.valid);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }
}
