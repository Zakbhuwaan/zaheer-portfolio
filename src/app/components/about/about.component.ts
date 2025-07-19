import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Award, Target, Lightbulb, Rocket } from 'lucide-angular';

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
export class AboutComponent {
  readonly Award = Award;
  readonly Target = Target;
  readonly Lightbulb = Lightbulb;
  readonly Rocket = Rocket;

  highlights = [
    {
      icon: this.Award,
      title: 'Excellence',
      description: 'Committed to delivering high-quality solutions with attention to detail'
    },
    {
      icon: this.Target,
      title: 'Results-Driven',
      description: 'Focused on achieving measurable outcomes and exceeding expectations'
    },
    {
      icon: this.Lightbulb,
      title: 'Innovation',
      description: 'Always exploring cutting-edge technologies and creative solutions'
    },
    {
      icon: this.Rocket,
      title: 'Fast Delivery',
      description: 'Efficient development process ensuring timely project completion'
    }
  ];
}
