import Template from './templates/Template.js';
//se importa directamente el css
import './styles/main.css'

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
