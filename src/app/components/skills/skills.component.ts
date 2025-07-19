import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LucideAngularModule, Brain, Monitor, Zap, Code, Database, Globe, Cpu, Shield, BarChart3, Rocket, Mail } from 'lucide-angular';
import skillsData from '../../data/skills.json';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule, 
    HlmButtonDirective,
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
  readonly Brain = Brain;
  readonly Monitor = Monitor;
  readonly Zap = Zap;
  readonly Rocket = Rocket;
  readonly Mail = Mail;

  getIconForCategory(category: string) {
    switch (category) {
      case 'AI & Automation': return this.Brain;
      case 'Web Applications': return this.Monitor;
      case 'Digital Transformation': return this.Zap;
      case 'Contact': return this.Mail;
      default: return this.Code;
    }
  }
}
