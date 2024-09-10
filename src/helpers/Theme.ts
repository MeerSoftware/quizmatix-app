export function ThemeSet(name: string) {
    document.documentElement.dataset.theme = name;
    localStorage.setItem('theme', name);
}

export function ThemeGet() {
    return localStorage.getItem('theme') ?? 'quizmatix';
}