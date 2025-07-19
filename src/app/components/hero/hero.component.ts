import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LucideAngularModule, Download, Mail, Github, ExternalLink, User } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    LucideAngularModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  readonly Download = Download;
  readonly Mail = Mail;
  readonly Github = Github;
  readonly ExternalLink = ExternalLink;
  readonly User = User;

  displayedText = '';
  private roles = [
    'AI/ML Engineer',
    'Full-Stack Developer', 
    'Software Architect',
    'Tech Innovator'
  ];
  private currentRoleIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;

  ngOnInit() {
    this.typeWriter();
  }

  private typeWriter() {
    const currentRole = this.roles[this.currentRoleIndex];
    
    if (this.isDeleting) {
      this.displayedText = currentRole.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.displayedText = currentRole.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let typeSpeed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.currentCharIndex === currentRole.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
    }

    setTimeout(() => this.typeWriter(), typeSpeed);
  }
}
