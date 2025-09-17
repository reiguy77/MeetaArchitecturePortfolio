import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-controls" *ngIf="isAdmin">
      <div class="admin-buttons">
        <button class="add-btn primary" (click)="onLogout.emit()">Logout</button>
        <button
          *ngIf="!editMode"
          class="edit-toggle-btn"
          (click)="onEditToggle.emit()">
          Edit Content
        </button>
        <ng-container *ngIf="editMode">
          <button class="save-btn" (click)="onSave.emit()">Save Changes</button>
          <button class="cancel-btn" (click)="onCancel.emit()">Cancel</button>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .admin-controls {
      position: fixed;
      top: 0;
      right: 0;
      padding: 1rem;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-bottom-left-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .admin-buttons {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      background: #f5f5f5;
      color: #333;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      &.primary {
        background: #333;
        color: white;
      }

      &.save-btn {
        background: #28a745;
        color: white;
      }

      &.cancel-btn {
        background: #dc3545;
        color: white;
      }

      &.edit-toggle-btn {
        background: #007bff;
        color: white;
      }
    }
  `]
})
export class AdminControlsComponent {
  @Input() isAdmin = false;
  @Input() editMode = false;

  @Output() onLogout = new EventEmitter<void>();
  @Output() onEditToggle = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
}