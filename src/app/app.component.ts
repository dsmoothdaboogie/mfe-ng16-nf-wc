import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root', // This selector is less relevant when used as a web component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // Use ShadowDom for style encapsulation (default) or None if you want styles to potentially bleed out (not recommended for MFEs)
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  title = 'Angular 16 Web Component';
  counter = 0;

  increment() {
    console.log('increment ', this.counter);
    this.counter++;
  }

  reset() {
    console.log('reset ', this.counter);
    this.counter = 0;
  }
} 