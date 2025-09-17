import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteAuthService {
  private readonly SITE_PASSWORD = 'MShah5452';
  private readonly STORAGE_KEY = 'site_authenticated';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkStoredAuth());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  private checkStoredAuth(): boolean {
    // Check if user is already authenticated (session storage)
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    return stored === 'true';
  }

  authenticate(password: string): boolean {
    if (password === this.SITE_PASSWORD) {
      sessionStorage.setItem(this.STORAGE_KEY, 'true');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
