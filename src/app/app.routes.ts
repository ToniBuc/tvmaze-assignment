import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)},
    {path: ':id', loadComponent: () => import('./components/show-details/show-details.component').then(c => c.ShowDetailsComponent)},
];
