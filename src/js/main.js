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

function randint(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const scale = (number, [inMin, inMax], [outMin, outMax]) => {
    // if you need an integer value use Math.floor or Math.ceil here
    return Math.floor((number - inMin) / (inMax - inMin) * (outMax - outMin) + outMin);
}

function random_light_color() {
    // use hsl
    const hue = Math.floor(Math.random() * 360);
    // random saturation and lightness between 50% and 100%
    const sat_min = 0;
    const sat_max = 90;
    const light_min = 85;
    const light_max = 97;
    const saturation = randint(sat_min, sat_max);
    // const lightness = randint(scale(saturation, [sat_min, sat_max], [light_min, light_max]), light_max);
    var lightness = randint(light_min, light_max);
    if (saturation > 50) {
        lightness = Math.min(lightness + 5, 100);
    }
    return [hue, saturation, lightness];
}

function randomize_theme() {
    var [h,s,l] = random_light_color();
    const color = `hsl(${h}, ${s}%, ${l}%)`;
    document.documentElement.style.setProperty(`--bg`, color);
}
randomize_theme();
document.dispatchEvent(new Event('random_theme'));

function _calculateScrollbarWidth() {
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
  }
  // recalculate on resize
  window.addEventListener('resize', _calculateScrollbarWidth, false);
  // recalculate on dom load
  document.addEventListener('DOMContentLoaded', _calculateScrollbarWidth, false); 
  // recalculate on load (assets loaded as well)
  window.addEventListener('load', _calculateScrollbarWidth);