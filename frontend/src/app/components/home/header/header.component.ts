import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  private mouseX = 0;
  private mouseY = 0;

  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  getTransform(element: string): string {
    // Calculate different movement intensities for different elements
    const intensity = this.getMovementIntensity(element);
    const offsetX = (this.mouseX - window.innerWidth / 2) * intensity;
    const offsetY = (this.mouseY - window.innerHeight / 2) * intensity;

    return `translate(${offsetX}px, ${offsetY}px)`;
  }

  private getMovementIntensity(element: string): number {
    // Different elements move with different intensities for layered effect
    switch (element) {
      case 'central':
        return 0.02; // Central cluster moves least
      case 'main':
        return 0.05; // Main lines move moderately
      case 'secondary':
        return 0.08; // Secondary shapes move more
      case 'radiating':
        return 0.12; // Radiating lines move most
      case 'additional':
        return 0.06; // Additional elements move moderately
      default:
        return 0.05;
    }
  }
}
