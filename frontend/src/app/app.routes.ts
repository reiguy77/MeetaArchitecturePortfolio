import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectGalleryComponent } from './components/project-gallery/project-gallery.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'project/:id',
        component: ProjectGalleryComponent
    },
    {
        path: 'admin',
        component: AdminLoginComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
