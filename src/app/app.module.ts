import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  // No bootstrap array needed for web components
  // entryComponents: [AppComponent] // Not needed in modern Angular, but good to remember for older versions
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Important for using custom elements
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    // Convert AppComponent to a custom element
    const ngElement = createCustomElement(AppComponent, { injector: this.injector });

    // Define the custom element (check if not already defined)
    if (!customElements.get('my-angular-element')) {
      customElements.define('my-angular-element', ngElement);
      console.log('my-angular-element defined');
    } else {
      console.log('my-angular-element already defined');
    }
  }
} 