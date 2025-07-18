import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, Send, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule,
    LucideAngularModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  readonly Send = Send;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Linkedin = Linkedin;
  readonly Github = Github;

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  contactInfo = [
    {
      icon: this.Mail,
      label: 'Email',
      value: 'zaheer@example.com',
      link: 'mailto:zaheer@example.com'
    },
    {
      icon: this.Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: this.MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      link: null
    }
  ];

  socialLinks = [
    {
      icon: this.Github,
      label: 'GitHub',
      url: 'https://github.com/zaheerkhan'
    },
    {
      icon: this.Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/zaheerkhan'
    }
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}
  
  onSubmit() {
    if (this.contactForm.valid) {
      this.snackBar.open('Message sent successfully! (Demo mode)', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.contactForm.reset();
    } else {
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);
    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }
}
