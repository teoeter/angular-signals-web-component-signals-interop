import { Component, model } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
      <div style="border: 1px dashed green; padding: 8px">
        <p>Value: {{ value() }}</p>
        <button (click)="updateValue()">Update Signal Value from Angular</button>
      </div>
    `,
})
export class ChildComponent {
  value = model();

  updateValue() {
    this.value.update((value) => `Value updated from angular`);
  }
}
