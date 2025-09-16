import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoading = true;

  constructor(public loadingService: LoadingService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  onLoadingComplete() {
    this.loadingService.hideLoading();
  }
}
