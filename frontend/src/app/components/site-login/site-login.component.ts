import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteAuthService } from '../../services/site-auth.service';

@Component({
  selector: 'app-site-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './site-login.component.html',
  styleUrl: './site-login.component.less'
})
export class SiteLoginComponent {
  password = '';
  error = '';
  isLoading = false;

  constructor(private siteAuthService: SiteAuthService) {}

  onSubmit() {
    this.error = '';
    this.isLoading = true;

    // Simulate a brief loading state
    setTimeout(() => {
      if (this.siteAuthService.authenticate(this.password)) {
        this.error = '';
        this.password = '';
      } else {
        this.error = 'Incorrect password. Please try again.';
        this.password = '';
      }
      this.isLoading = false;
    }, 500);
  }
}
