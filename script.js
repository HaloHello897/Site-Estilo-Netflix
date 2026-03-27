// Dark/Light Mode Toggle

// Função para inicializar o tema
function initTheme() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Se não houver tema armazenado, usa a preferência do sistema
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');
    
    applyTheme(theme);
}

// Função para aplicar o tema
function applyTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeIcon.textContent = '☀️'; // Ícone do sol
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        themeIcon.textContent = '🌙'; // Ícone da lua
        localStorage.setItem('theme', 'dark');
    }
}

// Função para alternar entre temas
function toggleTheme() {
    const body = document.body;
    const isLightMode = body.classList.contains('light-mode');
    const newTheme = isLightMode ? 'dark' : 'light';
    
    applyTheme(newTheme);
}

// Event listener para o botão de toggle
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o tema ao carregar a página
    initTheme();
    
    // Adiciona event listener ao botão
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Também adiciona suporte a teclado (Enter/Space)
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    // Detecta mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Só aplica se não houver preferência armazenada pelo usuário
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Salva perfil selecionado para usar em catalogo/main.js
    const profileLinks = document.querySelectorAll('.profile-link');
    profileLinks.forEach(link => {
        const nome = link.dataset.perfilNome;
        const imagem = link.dataset.perfilImg;

        if (!nome || !imagem) return;

        link.addEventListener('click', () => {
            localStorage.setItem('perfilAtivoNome', nome);
            localStorage.setItem('perfilAtivoImagem', imagem);
        });
    });
});
