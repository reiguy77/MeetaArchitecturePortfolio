import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiteAuthService } from '../../services/site-auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.less'
})
export class ToolbarComponent {
  isProjectsActive = false;
  isAboutActive = false;
  isContactActive = false;

  constructor(
    private router: Router,
    private siteAuthService: SiteAuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveStates();
      }
    });
  }

  scrollToSection(sectionId: string) {
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    }
  }

  logout() {
    this.siteAuthService.logout();
  }

  private updateActiveStates() {
    // Reset all states
    this.isProjectsActive = false;
    this.isAboutActive = false;
    this.isContactActive = false;

    // You can add logic here to determine which section is currently visible
    // For now, we'll keep it simple
  }
}
