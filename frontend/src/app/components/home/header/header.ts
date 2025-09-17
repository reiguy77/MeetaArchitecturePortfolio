import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.less'
})
export class HeaderComponent {
  @Input() isAdmin = false;
  @Input() editMode = false;
  @Input() coverImage = '';
  @Input() tagline = '';
  @Input() subtext = '';
  @Input() backendUrl = '';
  @Input() editForm: any = {};

  @Output() editModeChange = new EventEmitter<boolean>();
  @Output() coverImageSelected = new EventEmitter<File>();
  @Output() taglineChange = new EventEmitter<string>();
  @Output() subtextChange = new EventEmitter<string>();
  @Output() scrollToProjects = new EventEmitter<void>();

  onCoverImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverImageSelected.emit(file);
    }
  }

  onTaglineChange(value: string) {
    this.taglineChange.emit(value);
  }

  onSubtextChange(value: string) {
    this.subtextChange.emit(value);
  }

  onScrollToProjects() {
    this.scrollToProjects.emit();
  }
}
