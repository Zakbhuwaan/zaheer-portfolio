import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LucideAngularModule, Briefcase, GraduationCap, Code, Calendar, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  readonly Briefcase = Briefcase;
  readonly GraduationCap = GraduationCap;
  readonly Code = Code;
  readonly Calendar = Calendar;
  readonly MapPin = MapPin;

  timeline = [
    {
      year: '2024',
      role: 'Senior Full-Stack Developer',
      company: 'AEC India',
      location: 'Remote',
      type: 'work',
      icon: this.Briefcase,
      description: 'Leading end-to-end development of enterprise web applications using modern technologies. Architecting scalable solutions and mentoring junior developers.',
      achievements: [
        'Increased application performance by 40%',
        'Led team of 5 developers',
        'Implemented CI/CD pipelines'
      ],
      technologies: ['Angular', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      year: '2023',
      role: 'AI/ML Engineer',
      company: 'Tech Innovations Lab',
      location: 'San Francisco, CA',
      type: 'work',
      icon: this.Code,
      description: 'Developed and deployed machine learning models for predictive analytics and automation. Built data pipelines and implemented AI solutions for business optimization.',
      achievements: [
        'Reduced operational costs by 35%',
        'Deployed 8 ML models to production',
        'Automated 15+ business processes'
      ],
      technologies: ['Python', 'TensorFlow', 'Docker', 'Kubernetes']
    },
    {
      year: '2022',
      role: 'Frontend Developer',
      company: 'Digital Solutions Inc',
      location: 'New York, NY',
      type: 'work',
      icon: this.Briefcase,
      description: 'Created responsive and interactive user interfaces for web applications. Collaborated with UX designers to implement pixel-perfect designs and enhance user experience.',
      achievements: [
        'Improved user engagement by 50%',
        'Built 12+ responsive web applications',
        'Optimized page load times by 60%'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase']
    },
    {
      year: '2021',
      role: 'Computer Science Degree',
      company: 'University of Technology',
      location: 'Mumbai, India',
      type: 'education',
      icon: this.GraduationCap,
      description: 'Bachelor of Technology in Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning.',
      achievements: [
        'Graduated Magna Cum Laude (GPA: 3.8/4.0)',
        'Published 2 research papers',
        'Led university coding club'
      ],
      technologies: ['Data Structures', 'Algorithms', 'AI/ML', 'Software Engineering']
    }
  ];
}
