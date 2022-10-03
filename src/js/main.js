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