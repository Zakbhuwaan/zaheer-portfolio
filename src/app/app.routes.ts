import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-details/project-details.component';

export const routes: Routes = [
    {path: '', component: HeroComponent},
    {path: 'projects/:category/:id', component: ProjectDetailComponent},
    {path: "**", redirectTo: ''}
];
