import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule, Menu, Home, User, Code, Briefcase, Clock, Mail } from 'lucide-angular';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    LucideAngularModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  readonly Menu = Menu;
  readonly Home = Home;
  readonly User = User;
  readonly Code = Code;
  readonly Briefcase = Briefcase;
  readonly Clock = Clock;
  readonly Mail = Mail;

  navItems = [
    { label: 'Home', href: '#hero', icon: this.Home },
    { label: 'About', href: '#about', icon: this.User },
    { label: 'Skills', href: '#skills', icon: this.Code },
    { label: 'Projects', href: '#projects', icon: this.Briefcase },
    { label: 'Timeline', href: '#timeline', icon: this.Clock },
    { label: 'Contact', href: '#contact', icon: this.Mail }
  ];
}
