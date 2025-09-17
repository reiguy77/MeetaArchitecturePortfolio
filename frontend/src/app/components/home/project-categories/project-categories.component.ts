import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project, ProjectCategory, CreateProjectRequest, CreateCategoryRequest } from '../../../services/project-api.service';

@Component({
  selector: 'app-project-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-categories.component.html',
  styleUrl: './project-categories.component.less'
})
export class ProjectCategoriesComponent {
  @Input() projectCategories: ProjectCategory[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() isAdmin: boolean = false;
  @Input() editMode: boolean = false;
  @Input() backendUrl: string = '';

  @Output() projectClick = new EventEmitter<Project>();
  @Output() deleteProject = new EventEmitter<{projectId: number, categoryIndex: number, projectIndex: number}>();
  @Output() retryLoad = new EventEmitter<void>();
  @Output() createProject = new EventEmitter<{projectData: CreateProjectRequest, categoryIndex: number}>();
  @Output() createCategory = new EventEmitter<CreateCategoryRequest>();
  @Output() deleteCategory = new EventEmitter<{categoryId: number, categoryIndex: number}>();

  // Add new category form
  showAddCategory = false;
  newCategoryForm = {
    name: '',
    description: ''
  };

  // Add new project forms (one per category)
  showAddProject: { [key: number]: boolean } = {};
  newProjectForms: { [key: number]: CreateProjectRequest } = {};

  onProjectClick(project: Project) {
    this.projectClick.emit(project);
  }

  onDeleteProject(projectId: number, categoryIndex: number, projectIndex: number) {
    this.deleteProject.emit({projectId, categoryIndex, projectIndex});
  }

  onRetryLoad() {
    this.retryLoad.emit();
  }

  onDeleteCategory(categoryId: number, categoryIndex: number) {
    if (!this.isAdmin) return;

    if (confirm('Are you sure you want to delete this category? This will also delete all projects and images in this category.')) {
      this.deleteCategory.emit({ categoryId, categoryIndex });
    }
  }

  toggleAddCategory() {
    if (!this.isAdmin) return;
    this.showAddCategory = !this.showAddCategory;
    if (this.showAddCategory) {
      this.newCategoryForm = { name: '', description: '' };
    }
  }

  addCategory() {
    if (!this.isAdmin || !this.newCategoryForm.name.trim() || !this.newCategoryForm.description.trim()) {
      return;
    }
    this.createCategory.emit({
      name: this.newCategoryForm.name.trim(),
      description: this.newCategoryForm.description.trim()
    });
    this.showAddCategory = false;
    this.newCategoryForm = { name: '', description: '' };
  }

  cancelAddCategory() {
    this.showAddCategory = false;
    this.newCategoryForm = { name: '', description: '' };
  }

  toggleAddProject(categoryIndex: number, categoryId: number) {
    if (!this.isAdmin) return;
    this.showAddProject[categoryIndex] = !this.showAddProject[categoryIndex];
    if (this.showAddProject[categoryIndex]) {
      this.newProjectForms[categoryIndex] = {
        name: '',
        description: '',
        role: '',
        constructionCompleted: '',
        details: '',
        categoryId: categoryId
      };
    }
  }

  addProject(categoryIndex: number) {
    const form = this.newProjectForms[categoryIndex];
    if (!this.isAdmin || !form || !form.name.trim() || !form.description.trim() ||
        !form.role.trim() || !form.constructionCompleted.trim() || !form.details.trim()) {
      return;
    }
    this.createProject.emit({
      projectData: {
        name: form.name.trim(),
        description: form.description.trim(),
        role: form.role.trim(),
        constructionCompleted: form.constructionCompleted.trim(),
        details: form.details.trim(),
        categoryId: form.categoryId
      },
      categoryIndex: categoryIndex
    });
    this.showAddProject[categoryIndex] = false;
    this.newProjectForms[categoryIndex] = {
      name: '',
      description: '',
      role: '',
      constructionCompleted: '',
      details: '',
      categoryId: form.categoryId
    };
  }

  cancelAddProject(categoryIndex: number) {
    this.showAddProject[categoryIndex] = false;
    const categoryId = this.newProjectForms[categoryIndex]?.categoryId || 0;
    this.newProjectForms[categoryIndex] = {
      name: '',
      description: '',
      role: '',
      constructionCompleted: '',
      details: '',
      categoryId: categoryId
    };
  }
}
