export function ThemeSet(name: string): void {
    document.documentElement.dataset.theme = name;
    localStorage.setItem('theme', name);
}

export function ThemeGet(): string {
    return localStorage.getItem('theme') ?? 'quizmatix';
}