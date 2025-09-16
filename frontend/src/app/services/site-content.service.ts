import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { environment } from '../../environments/environment';

export interface SiteContent {
  id: number;
  key: string;
  value: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class SiteContentService {
  private apiUrl = `${environment.apiUrl}/site-content`;

  constructor(
    private http: HttpClient,
    private adminService: AdminService
  ) {}

  getContent(): Observable<SiteContent[]> {
    return this.http.get<SiteContent[]>(this.apiUrl);
  }

  updateContent(key: string, value: string): Observable<SiteContent> {
    const headers = this.adminService.getAuthHeaders();
    return this.http.put<SiteContent>(`${this.apiUrl}/${key}`, { value }, { headers });
  }

  updateImageContent(key: string, file: File): Observable<SiteContent> {
    const formData = new FormData();
    formData.append('file', file);
    const headers = this.adminService.getAuthHeaders();
    return this.http.put<SiteContent>(`${this.apiUrl}/${key}/image`, formData, { headers });
  }

  updateJsonContent(key: string, value: any): Observable<SiteContent> {
    const headers = this.adminService.getAuthHeaders();
    return this.http.put<SiteContent>(`${this.apiUrl}/${key}/json`, { value }, { headers });
  }
}
