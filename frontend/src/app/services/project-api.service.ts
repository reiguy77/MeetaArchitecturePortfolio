import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { environment } from '../../environments/environment';

export interface ProjectImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  projectId: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  role: string;
  constructionCompleted: string;
  details: string;
  categoryId: number;
  images?: ProjectImage[];
  category?: {
    id: number;
    name: string;
  };
}

export interface ProjectCategory {
  id: number;
  name: string;
  description: string;
  projects: Project[];
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  role: string;
  constructionCompleted: string;
  details: string;
  categoryId: number;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  role?: string;
  constructionCompleted?: string;
  details?: string;
  categoryId?: number;
}

export interface CreateImageRequest {
  file: File;
  alt: string;
  caption?: string;
}

export interface UpdateImageRequest {
  file?: File;
  alt?: string;
  caption?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {
  public apiUrl = `${environment.apiUrl}/projects`;

  constructor(
    private http: HttpClient,
    private adminService: AdminService
  ) {}

  getCategories(): Observable<ProjectCategory[]> {
    return this.http.get<ProjectCategory[]>(`${this.apiUrl}/categories`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  createProject(projectData: CreateProjectRequest): Observable<Project> {
    const headers = this.adminService.getAuthHeaders();
    return this.http.post<Project>(this.apiUrl, projectData, { headers });
  }

  updateProject(id: number, projectData: UpdateProjectRequest): Observable<Project> {
    const headers = this.adminService.getAuthHeaders();
    return this.http.put<Project>(`${this.apiUrl}/${id}`, projectData, { headers });
  }

  deleteProject(id: number): Observable<{ message: string }> {
    const headers = this.adminService.getAuthHeaders();
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers });
  }

  addImageToProject(projectId: number, imageData: CreateImageRequest): Observable<ProjectImage> {
    const formData = new FormData();
    formData.append('file', imageData.file);
    formData.append('alt', imageData.alt);
    if (imageData.caption) {
      formData.append('caption', imageData.caption);
    }

    const headers = this.adminService.getAuthHeaders();
    return this.http.post<ProjectImage>(`${this.apiUrl}/${projectId}/images`, formData, { headers });
  }

  updateImage(imageId: number, imageData: UpdateImageRequest): Observable<ProjectImage> {
    const formData = new FormData();
    if (imageData.file) {
      formData.append('file', imageData.file);
    }
    if (imageData.alt) {
      formData.append('alt', imageData.alt);
    }
    if (imageData.caption) {
      formData.append('caption', imageData.caption);
    }

    const headers = this.adminService.getAuthHeaders();
    return this.http.put<ProjectImage>(`${this.apiUrl}/images/${imageId}`, formData, { headers });
  }

  deleteImage(imageId: number): Observable<{ message: string }> {
    const headers = this.adminService.getAuthHeaders();
    return this.http.delete<{ message: string }>(`${this.apiUrl}/images/${imageId}`, { headers });
  }
}
