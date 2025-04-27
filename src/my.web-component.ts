import { signal } from '@angular/core';
import {
  createWatch,
  setPostSignalSetFn,
  Watch,
} from '@angular/core/primitives/signals';

const queue = new Set<Watch>();

export class MyWebComponent extends HTMLElement {
  value = signal('Initial web component signal value');
  watcher: Watch;

  constructor() {
    super();

    this.configureSignals();

    this.watcher = createWatch(
      () => console.log('EFFECT !!:', this.value()),
      queue.add.bind(queue),
      true
    );
    this.watcher.notify();
  }

  private configureSignals() {
    setPostSignalSetFn(() => {
      console.log('POST SIGNAL', this.value());
      this.watcher.notify();
      this.render();
    });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = `
        <div style="border: 1px dashed red; padding: 8px">
          <p>Value: ${this.value()}</p>
          <button id="updateValue">Update Signal Value from Web Component</button>
        </div>
    `;

    this.registerButtonClick();
  }

  private updateValue = () => {
    this.value.set('Value updated from Web Component');
    this.flushEffects();
  };

  flushEffects(): void {
    for (const watch of queue) {
      queue.delete(watch);
      watch.run();
    }
  }

  private registerButtonClick() {
    const button = this.querySelector('#updateValue') as HTMLButtonElement;
    button?.addEventListener('click', this.updateValue);
  }
}
