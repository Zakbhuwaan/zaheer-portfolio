import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule, Code, Database, Globe, Cpu, Shield, BarChart3 } from 'lucide-angular';
import skillsData from '../../data/skills.json';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatChipsModule, 
    MatIconModule,
    LucideAngularModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  readonly Code = Code;
  readonly Database = Database;
  readonly Globe = Globe;
  readonly Cpu = Cpu;
  readonly Shield = Shield;
  readonly BarChart3 = BarChart3;

  skills: any = skillsData;

  getIconForCategory(title: string) {
    if (title.includes('AI') || title.includes('Machine Learning')) return this.Cpu;
    if (title.includes('Fullstack') || title.includes('Platform')) return this.Code;
    if (title.includes('Interface') || title.includes('Business')) return this.Globe;
    if (title.includes('Live') || title.includes('Collaborative')) return this.BarChart3;
    if (title.includes('Security') || title.includes('Authentication')) return this.Shield;
    return this.Database;
  }
}
