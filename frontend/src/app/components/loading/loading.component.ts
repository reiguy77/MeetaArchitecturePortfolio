import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.less'
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Output() loadingComplete = new EventEmitter<void>();
  
  private animation: any;
  private minLoadTime = 1000; // 1 second minimum
  private startTime = Date.now();
  private imagesLoaded = 0;
  private totalImages = 0;
  private lottieLoaded = false;

  ngOnInit() {
    this.initializeAnimation();
    this.preloadImages();
  }

  ngOnDestroy() {
    if (this.animation) {
      this.animation.destroy();
    }
  }

  private initializeAnimation() {
    const container = document.getElementById('lottie-container');
    if (container) {
      try {
        this.animation = lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'house.json' // Try relative path first
        });

        this.animation.addEventListener('DOMLoaded', () => {
          this.lottieLoaded = true;
          this.checkAllLoaded();
        });

        this.animation.addEventListener('error', (error: any) => {
          console.warn('Lottie animation failed to load, using fallback:', error);
          this.lottieLoaded = true; // Continue without animation
          this.checkAllLoaded();
        });
      } catch (error) {
        console.warn('Failed to initialize Lottie animation:', error);
        this.lottieLoaded = true; // Continue without animation
        this.checkAllLoaded();
      }
    } else {
      this.lottieLoaded = true;
      this.checkAllLoaded();
    }
  }

  private preloadImages() {
    this.totalImages = this.images.length;
    
    if (this.totalImages === 0) {
      // If no images to load, just wait for minimum time
      setTimeout(() => {
        this.completeLoading();
      }, this.minLoadTime);
      return;
    }

    this.images.forEach(imageSrc => {
      const img = new Image();
      img.onload = () => {
        this.imagesLoaded++;
        this.checkAllLoaded();
      };
      img.onerror = () => {
        this.imagesLoaded++;
        this.checkAllLoaded();
      };
      img.src = imageSrc;
    });
  }

  private checkAllLoaded() {
    if (this.imagesLoaded >= this.totalImages && this.lottieLoaded) {
      const elapsedTime = Date.now() - this.startTime;
      const remainingTime = Math.max(0, this.minLoadTime - elapsedTime);
      
      setTimeout(() => {
        this.completeLoading();
      }, remainingTime);
    }
  }

  private completeLoading() {
    console.log('completeLoading');
    this.loadingComplete.emit();
  }
}
