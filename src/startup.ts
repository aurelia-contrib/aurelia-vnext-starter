import { BasicConfiguration } from '@aurelia/jit';
import { Aurelia } from '@aurelia/runtime';
import { App } from './app';

const au = window['au'] = new Aurelia()
  .register(BasicConfiguration)
  .app({ host: document.querySelector('app'), component: new App() })
  .start();

declare var module: any;

if (module['hot']) {
  module['hot'].dispose(() => {
    au.stop();
  });

  module['hot'].accept(() => {
    au.start();
  });
}
