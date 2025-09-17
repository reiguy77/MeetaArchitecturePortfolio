import { Component, Input } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiteAuthService } from '../../services/site-auth.service';
import { ProjectCategory } from '../../services/project-api.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.less'
})
export class ToolbarComponent {
  @Input() projectCategories: ProjectCategory[] = [];
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
    const performScroll = () => {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const navbarHeight = 80; // Height of the fixed navbar
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    };

    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      performScroll();
    } else {
      this.router.navigate(['/']).then(() => {
        performScroll();
      });
    }
  }

  logout() {
    this.siteAuthService.logout();
  }

  private updateActiveStates() {
    this.isProjectsActive = false;
    this.isAboutActive = false;
    this.isContactActive = false;
  }
}
