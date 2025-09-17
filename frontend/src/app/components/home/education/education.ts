import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteContentService } from '../../../services/site-content.service';
import { AdminService } from '../../../services/admin.service';
import { LoadingService } from '../../../services/loading.service';

interface EducationItem {
  id?: number;
  type: 'credential' | 'membership' | 'degree';
  title: string;
  institution: string;
  location: string;
  year: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './education.html',
  styleUrl: './education.less'
})
export class EducationComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  @Input() editMode = false;

  educationItems: EducationItem[] = [];
  editingIndex: number | null = null;
  editForm: EducationItem = { type: 'credential', title: '', institution: '', location: '', year: '' };
  showAddForm = false;
  newEducationItem: EducationItem = { type: 'credential', title: '', institution: '', location: '', year: '' };
  error: string | null = null;

  constructor(
    private siteContentService: SiteContentService,
    private adminService: AdminService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadEducation();
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  loadEducation(): void {
    this.loadingService.showLoading();
    this.siteContentService.getContent().subscribe({
      next: (content) => {
        const educationContent = content.find(c => c.key === 'education');
        if (educationContent && educationContent.type === 'json') {
          try {
            this.educationItems = JSON.parse(educationContent.value);
          } catch (e) {
            console.error('Error parsing education JSON:', e);
            this.setDefaultEducation();
          }
        } else {
          this.setDefaultEducation();
        }
        this.loadingService.hideLoading();
      },
      error: (error) => {
        console.error('Error loading education:', error);
        this.error = 'Failed to load education. Please try again later.';
        this.setDefaultEducation();
        this.loadingService.hideLoading();
      }
    });
  }

  private setDefaultEducation(): void {
    this.educationItems = [
      { type: 'credential', title: 'Registered Architect, NSBAIDRD', institution: 'NCARB Certified', location: '', year: '' },
      { type: 'membership', title: 'Member, American Institute of Architects (AIA)', institution: '', location: '', year: '' },
      { type: 'degree', title: 'Bachelor of Architecture', institution: 'L.S. Raheja School of Architecture', location: 'Mumbai', year: '' }
    ];
  }

  saveEducation(): void {
    if (!this.isAdmin) return;
    this.loadingService.showLoading();
    this.siteContentService.updateJsonContent('education', this.educationItems).subscribe({
      next: () => {
        this.loadingService.hideLoading();
        this.error = null;
        console.log('Education saved successfully');
      },
      error: (error) => {
        console.error('Error saving education:', error);
        this.error = 'Failed to save education: ' + (error.error?.error || error.message || 'Unknown error');
        this.loadingService.hideLoading();
      }
    });
  }

  startEditing(index: number): void {
    if (!this.isAdmin) return;
    this.editingIndex = index;
    this.editForm = { ...this.educationItems[index] };
  }

  saveEdit(): void {
    if (this.editingIndex !== null && this.editForm.title.trim()) {
      this.educationItems[this.editingIndex] = { ...this.editForm };
      this.cancelEdit();
      this.saveEducation();
    } else {
      this.error = 'Title cannot be empty.';
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editingIndex = null;
    this.error = null;
    this.editForm = { type: 'credential', title: '', institution: '', location: '', year: '' };
  }

  startAdding(): void {
    if (!this.isAdmin) return;
    this.showAddForm = true;
    this.newEducationItem = { type: 'credential', title: '', institution: '', location: '', year: '' };
    this.error = null;
  }

  addEducationItem(): void {
    if (!this.isAdmin || !this.newEducationItem.title.trim()) {
      this.error = 'Title cannot be empty.';
      return;
    }
    this.educationItems.push({ ...this.newEducationItem });
    this.cancelAdding();
    this.saveEducation();
  }

  cancelAdding(): void {
    this.showAddForm = false;
    this.newEducationItem = { type: 'credential', title: '', institution: '', location: '', year: '' };
    this.error = null;
  }

  deleteEducationItem(index: number): void {
    if (!this.isAdmin) return;
    if (confirm('Are you sure you want to delete this education item?')) {
      this.educationItems.splice(index, 1);
      this.saveEducation();
    }
  }

  getIconForType(type: string): string {
    switch (type) {
      case 'credential':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
          <path d="M19 9v5c0 5-7 7-7 7s-7-2-7-7V9c0-5 7-7 7-7s7 2 7 7Z"/>
        </svg>`;
      case 'membership':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 7c0-5.333-12-5.333-12 0"/>
          <path d="M6 7v10c0 5.333 12 5.333 12 0V7"/>
          <path d="M12 7v10"/>
        </svg>`;
      case 'degree':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 4 3 9l9 5 9-5-9-5Z"/>
          <path d="M20 16 12 21l-8-5"/>
          <path d="M12 9v12"/>
        </svg>`;
      default:
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 4v16"/>
          <path d="M4 12h16"/>
        </svg>`;
    }
  }

  getLabelForType(type: string): string {
    switch (type) {
      case 'credential': return 'Credential';
      case 'membership': return 'Membership';
      case 'degree': return 'Degree';
      default: return 'Item';
    }
  }
}
