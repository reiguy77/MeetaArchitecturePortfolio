import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { ProjectApiService, Project, ProjectCategory } from '../../services/project-api.service';
import { AdminService } from '../../services/admin.service';
import { SiteContentService, SiteContent } from '../../services/site-content.service';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HobbiesComponent, Nl2brPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  projectCategories: ProjectCategory[] = [];
  loading = true;
  error: string | null = null;
  isAdmin = false;
  editMode = false;
  showAddProject = false;

  // Site content
  coverImage = 'header.jpeg';
  tagline = 'Creating spaces that inspire';
  subtext = 'With a passion for innovative design and sustainable architecture, I create spaces that harmoniously blend form and function.';
  about = '';

  // Edit form data
  editForm = {
    coverImage: null as File | null,
    tagline: '',
    subtext: '',
    about: ''
  };

  // New project form data
  newProjectForm = {
    name: '',
    description: '',
    role: '',
    constructionCompleted: '',
    details: '',
    categoryId: 0
  };

  backendUrl = environment.backendUrl;

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private projectApiService: ProjectApiService,
    private adminService: AdminService,
    private siteContentService: SiteContentService
  ) {}

  ngOnInit() {
    // Check admin status
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    // Load site content
    this.siteContentService.getContent().subscribe({
      next: (content) => {
        content.forEach(item => {
          switch (item.key) {
            case 'coverImage':
              this.coverImage = item.value;
              break;
            case 'tagline':
              this.tagline = item.value;
              break;
            case 'subtext':
              this.subtext = item.value;
              break;
            case 'about':
              this.about = item.value;
              break;
          }
        });
      },
      error: (error) => {
        console.error('Error loading site content:', error);
      }
    });

    // Get project categories from the API
    this.projectApiService.getCategories().subscribe({
      next: (categories) => {
        this.projectCategories = categories;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching project categories:', error);
        this.error = 'Failed to load projects. Please try again later.';
        this.loading = false;
      }
    });

    // Show loading with images that need to be preloaded
    const imagesToLoad = [this.coverImage];
    this.loadingService.showLoading(imagesToLoad);
  }

  toggleEditMode() {
    if (!this.isAdmin) return;
    this.editMode = !this.editMode;

    if (this.editMode) {
      // Initialize edit form with current values
      this.editForm = {
        coverImage: null,
        tagline: this.tagline,
        subtext: this.subtext,
        about: this.about
      };
    }
  }

  toggleAddProject() {
    if (!this.isAdmin) return;
    this.showAddProject = !this.showAddProject;

    if (this.showAddProject) {
      // Reset form
      this.newProjectForm = {
        name: '',
        description: '',
        role: '',
        constructionCompleted: '',
        details: '',
        categoryId: this.projectCategories.length > 0 ? this.projectCategories[0].id : 0
      };
    }
  }

  onCoverImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editForm.coverImage = file;
    }
  }

  saveChanges() {
    if (!this.isAdmin) return;

    this.loadingService.showLoading();

    // Save cover image if changed
    if (this.editForm.coverImage) {
      this.siteContentService.updateImageContent('coverImage', this.editForm.coverImage).subscribe({
        next: () => {
          this.coverImage = `/uploads/content/${this.editForm.coverImage!.name}`;
          this.saveTextContent();
        },
        error: (error) => {
          console.error('Error updating cover image:', error);
          this.loadingService.hideLoading();
        }
      });
    } else {
      this.saveTextContent();
    }
  }

  private saveTextContent() {
    // Save tagline
    this.siteContentService.updateContent('tagline', this.editForm.tagline).subscribe({
      next: () => {
        this.tagline = this.editForm.tagline;
        // Save subtext
        this.siteContentService.updateContent('subtext', this.editForm.subtext).subscribe({
          next: () => {
            this.subtext = this.editForm.subtext;
            // Save about
            this.siteContentService.updateContent('about', this.editForm.about).subscribe({
              next: () => {
                this.about = this.editForm.about;
                this.editMode = false;
                this.loadingService.hideLoading();
              },
              error: (error) => {
                console.error('Error updating about:', error);
                this.loadingService.hideLoading();
              }
            });
          },
          error: (error) => {
            console.error('Error updating subtext:', error);
            this.loadingService.hideLoading();
          }
        });
      },
      error: (error) => {
        console.error('Error updating tagline:', error);
        this.loadingService.hideLoading();
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.editForm = {
      coverImage: null,
      tagline: '',
      subtext: '',
      about: ''
    };
  }

  addProject() {
    if (!this.isAdmin) return;

    // Validate form
    if (!this.newProjectForm.name.trim() ||
        !this.newProjectForm.description.trim() ||
        !this.newProjectForm.role.trim() ||
        !this.newProjectForm.constructionCompleted.trim() ||
        !this.newProjectForm.details.trim() ||
        !this.newProjectForm.categoryId) {
      this.error = 'Please fill in all required fields';
      return;
    }

    this.loadingService.showLoading();

    // Create new project
    const projectData = {
      name: this.newProjectForm.name.trim(),
      description: this.newProjectForm.description.trim(),
      role: this.newProjectForm.role.trim(),
      constructionCompleted: this.newProjectForm.constructionCompleted.trim(),
      details: this.newProjectForm.details.trim(),
      categoryId: this.newProjectForm.categoryId
    };

    this.projectApiService.createProject(projectData).subscribe({
      next: (newProject: any) => {
        // Add the new project to the appropriate category
        const category = this.projectCategories.find(cat => cat.id === this.newProjectForm.categoryId);
        if (category) {
          category.projects.push(newProject);
        }

        this.showAddProject = false;
        this.newProjectForm = {
          name: '',
          description: '',
          role: '',
          constructionCompleted: '',
          details: '',
          categoryId: 0
        };
        this.error = null;
        this.loadingService.hideLoading();
      },
      error: (error) => {
        console.error('Error adding project:', error);
        this.error = 'Failed to add project: ' + (error.error?.error || error.message || 'Unknown error');
        this.loadingService.hideLoading();
      }
    });
  }

  cancelAddProject() {
    this.showAddProject = false;
    this.newProjectForm = {
      name: '',
      description: '',
      role: '',
      constructionCompleted: '',
      details: '',
      categoryId: 0
    };
    this.error = null;
  }

  scrollToProjects() {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onProjectClick(project: Project) {
    this.router.navigate(['/project', project.id]);
  }


  deleteProject(projectId: number, categoryIndex: number, projectIndex: number) {
    if (!this.isAdmin) return;

    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    this.loadingService.showLoading();

    this.projectApiService.deleteProject(projectId).subscribe({
      next: () => {
        // Remove the project from the local array
        this.projectCategories[categoryIndex].projects.splice(projectIndex, 1);
        this.loadingService.hideLoading();
      },
      error: (error) => {
        console.error("Error deleting project:", error);
        this.error = "Failed to delete project: " + (error.error?.error || error.message || "Unknown error");
        this.loadingService.hideLoading();
      }
    });
  }

  retryLoad() {
    this.loading = true;
    this.error = null;
    this.ngOnInit();
  }

  logout() {
    this.adminService.logout();
    this.editMode = false;
    this.showAddProject = false;
  }
}
