import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SiteLoginComponent } from './components/site-login/site-login.component';
import { LoadingService } from './services/loading.service';
import { SiteAuthService } from './services/site-auth.service';
import { ProjectApiService, ProjectCategory } from './services/project-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, LoadingComponent, SiteLoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoading = true;
  isSiteAuthenticated = false;
  projectCategories: ProjectCategory[] = [];

  constructor(
    public loadingService: LoadingService,
    private siteAuthService: SiteAuthService,
    private projectApiService: ProjectApiService
  ) {}

  ngOnInit() {
    // Check site authentication status
    this.siteAuthService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isSiteAuthenticated = isAuthenticated;
    });

    this.projectApiService.getCategories().subscribe(categories => {
      this.projectCategories = categories;
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  onLoadingComplete() {
    this.loadingService.hideLoading();
  }
}
