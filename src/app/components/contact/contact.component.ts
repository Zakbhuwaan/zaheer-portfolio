import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})



export class ContactComponent {
  contactForm = this.fb.group({
    name: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  successMessage = '';
  errorMessage = '';

  constructor (private fb: FormBuilder) {}
  
  onSubmit() {
    if (this.contactForm.valid) {
      this.successMessage = "Message sent! (This is a demo, no email sent.)";
      this.errorMessage = '';
      this.contactForm.reset();
    }
    else {
      this.successMessage = '';
      this.errorMessage = "Please fill out the form correctly.";
    }
  }
}
