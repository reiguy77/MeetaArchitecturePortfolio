import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-controls.html',
  styleUrl: './admin-controls.less'
})
export class AdminControlsComponent {
  @Input() isAdmin = false;
  @Input() editMode = false;

  @Output() logout = new EventEmitter<void>();
  @Output() toggleEditMode = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }

  onToggleEditMode() {
    this.toggleEditMode.emit();
  }

  onSaveChanges() {
    this.saveChanges.emit();
  }

  onCancelEdit() {
    this.cancelEdit.emit();
  }
}
