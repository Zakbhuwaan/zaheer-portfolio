import { Component, OnInit } from '@angular/core';
import { Project } from '../../data/project.model';
import projectsData from '../../data/projects.json';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  ngOnInit() {
      this.projects = ( projectsData as Project[]);
  }
}
