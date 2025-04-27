import { Component, CUSTOM_ELEMENTS_SCHEMA, model } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MyWebComponent } from './my.web-component';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <h1>Angular - Web Component - Interop - with Singals</h1>
    <div style="border: 1px dashed green; padding: 8px">
      Value parent: {{ value() }}
      
      <h2>Angular child component</h2>
      <app-test [(value)]="value" ></app-test><br />

      <h2>Web component</h2>
      <my-web-component [value]="value"></my-web-component>
    </div>
  `,
  imports: [ChildComponent],
})
export class ParentComponent {
  value = model('initial');
}

bootstrapApplication(ParentComponent);
customElements.define('my-web-component', MyWebComponent);
