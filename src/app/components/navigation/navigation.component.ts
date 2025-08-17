import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LucideAngularModule, Home, User, Code, Mail, Menu, Briefcase, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, LucideAngularModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  readonly Home = Home;
  readonly User = User;
  readonly Code = Code;
  readonly Mail = Mail;
  readonly Menu = Menu;
  readonly Briefcase = Briefcase;
  readonly CheckCircle = CheckCircle;

  emailButtonText = 'Contact Me';
  private readonly professionalEmail = 'zaheerkhan.khalid@proton.me';

  navItems = [
    { href: '#home', label: 'Home', icon: this.Home },
    { href: '#about', label: 'About', icon: this.User },
    { href: '#skills', label: 'Skills', icon: this.Code },
    { href: '#projects', label: 'Projects', icon: this.Briefcase },
    { href: '#contact', label: 'Contact', icon: this.Mail }
  ];

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
