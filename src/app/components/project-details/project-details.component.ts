import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../data/project.model';
import projectsData from '../../data/projects.json';
@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;

  constructor (private route: ActivatedRoute) {}
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.project = (projectsData as Project[]).find(p => p.id === id);
    }
}
