import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nl2brPipe } from '../../../pipes/nl2br.pipe';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, FormsModule, Nl2brPipe],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.less'
})
export class AboutSectionComponent {
  @Input() about: string = '';
  @Input() editMode: boolean = false;
  @Input() isAdmin: boolean = false;
  
  @Output() aboutChange = new EventEmitter<string>();

  onAboutChange(value: string) {
    this.aboutChange.emit(value);
  }
}
