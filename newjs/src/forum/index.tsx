import 'expose-loader?punycode!punycode';
import 'expose-loader?ColorThief!color-thief-browser';
import ReactDOM from 'react-dom';
import App from './App';
import compat from './compat';

const inits = {};

export const app = {
  initializers: {
    add: (name: string, init: () => void) => {
      inits[name] = init;
    },
  },
  translator: {
    addTranslations: () => {},
  },
  load: () => {},
  bootExtensions: () => {},
  boot: () => {
    Object.keys(inits).forEach(k => inits[k]());
    ReactDOM.render(<App />, document.getElementById('app'));
  },
}

compat.app = app;

export { compat };

