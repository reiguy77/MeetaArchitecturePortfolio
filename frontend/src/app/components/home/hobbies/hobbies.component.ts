import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteContentService, SiteContent } from '../../../services/site-content.service';
import { AdminService } from '../../../services/admin.service';
import { LoadingService } from '../../../services/loading.service';

export interface Hobby {
  name: string;
  description: string;
}

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.less'
})
export class HobbiesComponent implements OnInit {
  hobbies: Hobby[] = [];
  isEditing = false;
  editingIndex = -1;
  newHobby = '';
  newHobbyDescription = '';
  editHobbyText = '';
  editHobbyDescription = '';
  isAdmin = false;

  constructor(
    private siteContentService: SiteContentService,
    private adminService: AdminService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadHobbies();
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  loadHobbies() {
    this.loadingService.showLoading();
    this.siteContentService.getContent().subscribe({
      next: (content) => {
        const hobbiesContent = content.find(c => c.key === 'hobbies');
        if (hobbiesContent && hobbiesContent.type === 'json') {
          try {
            const hobbiesData = JSON.parse(hobbiesContent.value);
            // Handle both old string format and new object format
            if (Array.isArray(hobbiesData)) {
              this.hobbies = hobbiesData.map(hobby => {
                if (typeof hobby === 'string') {
                  return { name: hobby, description: '' };
                }
                return hobby;
              });
            } else {
              this.setDefaultHobbies();
            }
          } catch (e) {
            console.error('Error parsing hobbies JSON:', e);
            this.setDefaultHobbies();
          }
        } else {
          this.setDefaultHobbies();
        }
        this.loadingService.hideLoading();
      },
      error: (error) => {
        console.error('Error loading hobbies:', error);
        this.setDefaultHobbies();
        this.loadingService.hideLoading();
      }
    });
  }

  private setDefaultHobbies() {
    this.hobbies = [
      { name: 'Hiking', description: 'Exploring nature trails and mountain paths' },
      { name: 'Dancing', description: 'Various dance styles including ballroom and contemporary' },
      { name: 'Cooking', description: 'Experimenting with new recipes and cuisines' },
      { name: 'Hosting events as MC', description: 'Master of ceremonies for various social and professional events' },
      { name: 'LV chapter president for Non-Profit organization- Ekal Vidhyala', description: 'Leading educational initiatives for underprivileged children' },
      { name: 'Organizes annual fundraising event for it raising funds for a noble cause', description: 'Coordinating charity events to support educational programs' }
    ];
  }

  saveHobbies() {
    if (!this.isAdmin) return;
    
    this.loadingService.showLoading();
    this.siteContentService.updateJsonContent('hobbies', this.hobbies).subscribe({
      next: () => {
        this.loadingService.hideLoading();
        console.log('Hobbies saved successfully');
      },
      error: (error) => {
        console.error('Error saving hobbies:', error);
        this.loadingService.hideLoading();
      }
    });
  }

  startEditing(index: number) {
    if (!this.isAdmin) return;
    this.editingIndex = index;
    this.editHobbyText = this.hobbies[index].name;
    this.editHobbyDescription = this.hobbies[index].description;
  }

  saveEdit() {
    if (this.editingIndex >= 0 && this.editHobbyText.trim()) {
      this.hobbies[this.editingIndex] = {
        name: this.editHobbyText.trim(),
        description: this.editHobbyDescription.trim()
      };
      this.editingIndex = -1;
      this.editHobbyText = '';
      this.editHobbyDescription = '';
      this.saveHobbies();
    }
  }

  cancelEdit() {
    this.editingIndex = -1;
    this.editHobbyText = '';
    this.editHobbyDescription = '';
  }

  addHobby() {
    if (!this.isAdmin || !this.newHobby.trim()) return;
    
    this.hobbies.push({
      name: this.newHobby.trim(),
      description: this.newHobbyDescription.trim()
    });
    this.newHobby = '';
    this.newHobbyDescription = '';
    this.saveHobbies();
  }

  deleteHobby(index: number) {
    if (!this.isAdmin) return;
    
    this.hobbies.splice(index, 1);
    this.saveHobbies();
  }
}
