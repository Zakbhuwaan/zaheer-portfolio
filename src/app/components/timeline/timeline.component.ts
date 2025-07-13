import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  timeline = [
    {
      year: '2024',
      role: 'Web Developer',
      company: 'AEC India',
      description: 'Leading web development projects and implementing modern solutions'
    },
    {
      year: '2023',
      role: 'Frontend Engineer',
      company: 'Tech Solutions',
      description: 'Developed scalable and responsive user interfaces for enterprise clients.'
    },
    {
      year: '2022',
      role: 'AI Intern',
      company: 'InnovateAI',
      description: 'Worked on machine learning models and data pipelines for real-world applications.'
    }
  ];
}
