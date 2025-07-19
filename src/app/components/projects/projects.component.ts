import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LucideAngularModule, ExternalLink, Github, Eye, Star } from 'lucide-angular';
import { Project } from '../../data/project.model';
import projectsData from '../../data/projects.json';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HlmButtonDirective,
    LucideAngularModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  readonly ExternalLink = ExternalLink;
  readonly Github = Github;
  readonly Eye = Eye;
  readonly Star = Star;

  projects: Project[] = [];

  ngOnInit() {
    this.projects = (projectsData as Project[]);
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-yellow-500';
      case 'planning':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }
}
