const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');
const color_toggle_elem = document.querySelector('#color_toggle')

button.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

function color_toggle() {
    const event = new Event('color_change');
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark');
        event.value='light';
    }
    else  {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
        event.value='dark';
    }
    event.key = key; // Optional..
    document.dispatchEvent(event);
}

function _calculateScrollbarWidth() {
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
  }
  // recalculate on resize
  window.addEventListener('resize', _calculateScrollbarWidth, false);
  // recalculate on dom load
  document.addEventListener('DOMContentLoaded', _calculateScrollbarWidth, false); 
  // recalculate on load (assets loaded as well)
  window.addEventListener('load', _calculateScrollbarWidth);