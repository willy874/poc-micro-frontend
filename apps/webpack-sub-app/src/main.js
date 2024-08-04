import Logo from './assets/reactjs.png';

export function setup() {
  const el = document.querySelector('#root')
  el.innerHTML = `
    <div>
      <h1>Webpack Sub App</h1>
      <img src="${Logo}" alt="ReactJS" height="200" />
    </div>
  `;
  console.log('Webpack Sub App loaded');
}