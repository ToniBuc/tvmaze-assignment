import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:':id', component: ShowDetailsComponent}
];
