import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApiService, Project, ProjectImage, ProjectCategory, UpdateProjectRequest, UpdateImageRequest, CreateImageRequest } from '../../services/project-api.service';
import { AdminService } from '../../services/admin.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.less'
})
export class ProjectGalleryComponent implements OnInit {
  project: Project | undefined;
  projectCategories: ProjectCategory[] = [];
  showSlideshow = false;
  currentSlideIndex = 0;
  loading = true;
  error: string | null = null;
  isAdmin = false;

  // Edit mode states
  editMode = false;
  editingImage: ProjectImage | null = null;
  addingImage = false;

  // Form data
  editForm = {
    name: '',
    description: '',
    role: '',
    constructionCompleted: '',
    details: '',
    categoryId: 0
  };

  newImageForm = {
    file: null as File | null,
    caption: ''
  };

  editImageForm = {
    file: null as File | null,
    caption: ''
  };

  private backendUrl = environment.backendUrl;

  constructor(
    private route: ActivatedRoute,
    private projectApiService: ProjectApiService,
    protected adminService: AdminService,
    private router: Router
  ) {
    this.adminService.isAdmin$.subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      });
    }

  ngOnInit() {
    // Check admin status


    this.route.params.subscribe(params => {
      const projectId = +params['id'];
      if (projectId) {
        this.loadProject(projectId);
        this.loadCategories();
      }
    });
  }

  private loadProject(projectId: number) {
    this.loading = true;
    this.error = null;

    this.projectApiService.getProject(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.populateEditForm();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.error = 'Failed to load project';
        this.loading = false;
      }
    });
  }

  private loadCategories() {
    this.projectApiService.getCategories().subscribe({
      next: (categories) => {
        this.projectCategories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  deleteProject() {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    if (!this.project || !this.isAdmin) return;
    this.projectApiService.deleteProject(this.project.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }

  private populateEditForm() {
    if (this.project) {
      this.editForm = {
        name: this.project.name,
        description: this.project.description,
        role: this.project.role,
        constructionCompleted: this.project.constructionCompleted,
        details: this.project.details,
        categoryId: this.project.categoryId
      };
    }
  }

  toggleEditMode() {
    if (!this.isAdmin) return;

    this.editMode = !this.editMode;
    if (this.editMode) {
      this.populateEditForm();
    }
  }

  saveProject() {
    if (!this.project || !this.isAdmin) return;

    const updateData: UpdateProjectRequest = {
      name: this.editForm.name,
      description: this.editForm.description,
      role: this.editForm.role,
      constructionCompleted: this.editForm.constructionCompleted,
      details: this.editForm.details,
      categoryId: this.editForm.categoryId
    };

    this.projectApiService.updateProject(this.project.id, updateData).subscribe({
      next: (updatedProject) => {
        this.project = updatedProject;
        this.editMode = false;
      },
      error: (error) => {
        console.error('Error updating project:', error);
        this.error = 'Failed to update project';
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.populateEditForm();
  }

  startAddingImage() {
    if (!this.isAdmin) return;

    this.addingImage = true;
    this.newImageForm = { file: null, caption: '' };
    this.error = null;
  }

  cancelAddingImage() {
    this.addingImage = false;
    this.newImageForm = { file: null, caption: '' };
    this.error = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newImageForm.file = file;
      this.error = null;
      console.log('File selected:', file.name, file.size, 'bytes');
    }
  }

  addImage() {
    if (!this.project || !this.isAdmin) {
      this.error = 'Admin access required';
      return;
    }

    if (!this.newImageForm.file) {
      this.error = 'Please select an image file';
      return;
    }


    const imageData: CreateImageRequest = {
      file: this.newImageForm.file,
      caption: this.newImageForm.caption
    };

    console.log('Uploading file:', this.newImageForm.file.name, 'to project:', this.project.id);

    this.projectApiService.addImageToProject(this.project.id, imageData).subscribe({
      next: (newImage) => {
        if (this.project) {
          this.project.images?.push(newImage);
        }
        this.addingImage = false;
        this.newImageForm = { file: null, caption: '' };
        this.error = null;
      },
      error: (error) => {
        console.error('Error adding image:', error);

        if (error.status === 0) {
          this.error = 'Cannot connect to server. Please make sure the backend is running.';
        } else if (error.status === 400) {
          this.error = 'Bad request: ' + (error.error?.error || 'Invalid file or data');
        } else if (error.status === 401) {
          this.error = 'Authentication required. Please log in as admin.';
        } else if (error.status === 404) {
          this.error = 'Project not found';
        } else if (error.status === 500) {
          this.error = 'Server error: ' + (error.error?.error || 'Internal server error');
        } else {
          this.error = 'Failed to add image: ' + (error.error?.error || error.message || 'Unknown error');
        }
      }
    });
  }

  startEditingImage(image: ProjectImage) {
    if (!this.isAdmin) return;

    this.editingImage = image;
    this.editImageForm = {
      file: null,
      caption: image.caption || ''
    };
  }

  cancelEditingImage() {
    this.editingImage = null;
    this.editImageForm = { file: null, caption: '' };
  }

  onEditImageFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('File selected:', file.name, file.size, 'bytes');
    if (file) {
      this.editImageForm.file = file;
      this.error = null;
    }
  }

  saveImage() {
    if (!this.editingImage || !this.isAdmin) return;

    console.log('Saving image:', this.editImageForm.file, this.editImageForm.caption);
    const imageData: UpdateImageRequest = {
      file: this.editImageForm.file || undefined,
      caption: this.editImageForm.caption
    };

    this.projectApiService.updateImage(this.editingImage.id, imageData).subscribe({
      next: (updatedImage) => {
        if (this.project) {
          const index = this.project.images?.findIndex(img => img.id === this.editingImage!.id);
          if (index !== -1 && this.project.images && index !== undefined) {
            this.project.images[index] = updatedImage;
          }
        }
        this.editingImage = null;
        this.editImageForm = { file: null, caption: '' };
      },
      error: (error) => {
        console.error('Error updating image:', error);
        this.error = 'Failed to update image';
      }
    });
  }

  deleteImage(imageId: number) {
    if (!this.isAdmin) return;

    if (!confirm('Are you sure you want to delete this image?')) return;

    this.projectApiService.deleteImage(imageId).subscribe({
      next: () => {
        if (this.project) {
          this.project.images = this.project.images?.filter(img => img.id !== imageId);
        }
      },
      error: (error) => {
        console.error('Error deleting image:', error);
        this.error = 'Failed to delete image';
      }
    });
  }

  getImageUrl(src: string): string {
    if (src.startsWith('http')) {
      return src;
    }
    if (src.startsWith('/uploads/')) {
      return `${this.backendUrl}${src}`;
    }
    return src;
  }

  get title(): string {
    return this.project?.name || '';
  }

  get description(): string {
    return this.project?.description || '';
  }

  get images(): ProjectImage[] {
    return this.project?.images || [];
  }

  get role(): string {
    return this.project?.role || '';
  }

  get completionYear(): string {
    return this.project?.constructionCompleted || '';
  }

  get projectDetails(): string {
    return this.project?.details || '';
  }

  onImageClick(index: number) {
    this.currentSlideIndex = index;
    this.showSlideshow = true;
  }

  closeSlideshow() {
    this.showSlideshow = false;
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.images.length;
  }

  previousSlide() {
    this.currentSlideIndex = this.currentSlideIndex === 0
      ? this.images.length - 1
      : this.currentSlideIndex - 1;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeSlideshow();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      this.previousSlide();
    }
  }
}
