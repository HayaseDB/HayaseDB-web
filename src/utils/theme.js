export function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);

    saveThemeToLocalStorage(newTheme);
}

export function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';

    setTheme(savedTheme);
}

export function saveThemeToLocalStorage(theme) {
    localStorage.setItem('theme', theme);
}

initializeTheme();
