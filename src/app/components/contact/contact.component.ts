import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Mail, MapPin, Linkedin, Github, ExternalLink, Clock } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  readonly Mail = Mail;
  readonly MapPin = MapPin;
  readonly Linkedin = Linkedin;
  readonly Github = Github;
  readonly ExternalLink = ExternalLink;
  readonly Clock = Clock;
}
