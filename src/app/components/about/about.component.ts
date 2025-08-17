import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Code, Server, Brain, Database, Zap, Globe } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  readonly Code = Code;
  readonly Server = Server;
  readonly Brain = Brain;
  readonly Database = Database;
  readonly Zap = Zap;
  readonly Globe = Globe;

  emailButtonText = 'Start Your Project Today';
  private readonly professionalEmail = 'zaheerkhan.khalid@proton.me';

  techStacks = [
    {
      icon: this.Code,
      title: 'Frontend Development',
      technologies: ['Angular', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      color: 'blue',
      hoverClass: 'hover:border-blue-400/50',
      iconClass: 'bg-gradient-to-br from-blue-400 to-blue-600',
      techClass: 'bg-blue-400/20 text-blue-400 border-blue-400/30'
    },
    {
      icon: this.Server,
      title: 'Backend Development', 
      technologies: ['Node.js', 'Python', 'FastAPI', 'Express.js', 'Django'],
      color: 'green',
      hoverClass: 'hover:border-green-400/50',
      iconClass: 'bg-gradient-to-br from-green-400 to-green-600',
      techClass: 'bg-green-400/20 text-green-400 border-green-400/30'
    },
    {
      icon: this.Brain,
      title: 'AI & Machine Learning',
      technologies: ['LangChain', 'OpenAI API', 'Pinecone', 'Hugging Face'],
      color: 'purple',
      hoverClass: 'hover:border-purple-400/50',
      iconClass: 'bg-gradient-to-br from-purple-400 to-purple-600',
      techClass: 'bg-purple-400/20 text-purple-400 border-purple-400/30'
    },
    {
      icon: this.Database,
      title: 'Database & Cloud',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker'],
      color: 'orange',
      hoverClass: 'hover:border-orange-400/50',
      iconClass: 'bg-gradient-to-br from-orange-400 to-orange-600',
      techClass: 'bg-orange-400/20 text-orange-400 border-orange-400/30'
    }
  ];

  ngOnInit() {}

  async copyEmailToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.professionalEmail);
      
      const originalText = this.emailButtonText;
      this.emailButtonText = 'Email Copied!';
      
      setTimeout(() => {
        this.emailButtonText = originalText;
      }, 2000);
      
    } catch (error) {
      console.error('Failed to copy email to clipboard:', error);
      alert(`Please copy this email: ${this.professionalEmail}`);
    }
  }
}
