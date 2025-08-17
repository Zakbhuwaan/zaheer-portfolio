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
      color: 'blue'
    },
    {
      icon: this.Server,
      title: 'Backend Development', 
      technologies: ['Node.js', 'Python', 'FastAPI', 'Express.js', 'Django'],
      color: 'green'
    },
    {
      icon: this.Brain,
      title: 'AI & Machine Learning',
      technologies: ['LangChain', 'OpenAI API', 'Pinecone', 'Hugging Face'],
      color: 'purple'
    },
    {
      icon: this.Database,
      title: 'Database & Cloud',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker'],
      color: 'orange'
    }
  ];

  ngOnInit() {}

  async copyEmailToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.professionalEmail);
      
      // Update button text to show success
      const originalText = this.emailButtonText;
      this.emailButtonText = 'Email Copied!';
      
      // Reset button text after 2 seconds
      setTimeout(() => {
        this.emailButtonText = originalText;
      }, 2000);
      
    } catch (error) {
      console.error('Failed to copy email to clipboard:', error);
      
      // Fallback: show email in alert if clipboard fails
      alert(`Please copy this email: ${this.professionalEmail}`);
    }
  }
}
