import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  fullText = 'AI Engineer & Fullstack Developer';
  displayedText = '';
  typingSpeed = 80; // ms per character

  ngOnInit() {
    this.typeText();
  }

  typeText(i: number = 0) {
    if (i < this.fullText.length) {
      this.displayedText += this.fullText.charAt(i);
      setTimeout(() => this.typeText(i + 1), this.typingSpeed);
    }
  }
}
