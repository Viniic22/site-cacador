// ==========================================
// TEMA CLARO / ESCURO (todas as páginas)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
    themeIcon?.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ==========================================
// TOAST (aviso flutuante reutilizável)
// ==========================================
function mostrarToast(mensagem, icone) {
    icone = icone || 'fa-solid fa-check';
    let toast = document.getElementById('toast-global');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-global';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="${icone}"></i><span>${mensagem}</span>`;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toast._timeoutId);
    toast._timeoutId = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ==========================================
// SCROLL REVEAL (animação ao rolar a página)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const revealSelectors = '.card, .stat-item, .cta-box, .trust-icons, .simulator-container, .link-card, .faq-item, .pilar-item, .panorama-header, .sobre-projeto-container, .compare-wrapper, .stepper, .timeline-item, .feature-row, .numbered-item, .ibge-painel';
    const revealEls = document.querySelectorAll(revealSelectors);

    if (!('IntersectionObserver' in window) || revealEls.length === 0) return;

    revealEls.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 4) * 90}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));

    // ==========================================
    // CONTADORES ANIMADOS (data-count-to)
    // ==========================================
    const counters = document.querySelectorAll('[data-count-to]');
    if (counters.length && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContador(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach(el => counterObserver.observe(el));
    }

    function animarContador(el) {
        const target = parseFloat(el.dataset.countTo);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const useLocale = el.dataset.format === 'pt-BR';
        const duration = 1400;
        const start = performance.now();

        function formatar(valor) {
            return prefix + (useLocale ? valor.toLocaleString('pt-BR') : valor) + suffix;
        }

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = formatar(Math.floor(eased * target));
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = formatar(target);
            }
        }
        requestAnimationFrame(tick);
    }

    // ==========================================
    // MODAL: RESUMO EM 30 SEGUNDOS (se existir na página)
    // ==========================================
    const resumoTrigger = document.getElementById('resumo-trigger');
    const resumoModal = document.getElementById('resumo-modal');

    if (resumoTrigger && resumoModal) {
        const closeBtn = document.getElementById('resumo-close');

        const abrirModal = () => {
            resumoModal.hidden = false;
            document.body.style.overflow = 'hidden';
        };
        const fecharModal = () => {
            resumoModal.hidden = true;
            document.body.style.overflow = '';
        };

        resumoTrigger.addEventListener('click', abrirModal);
        closeBtn?.addEventListener('click', fecharModal);
        resumoModal.addEventListener('click', (e) => {
            if (e.target === resumoModal) fecharModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !resumoModal.hidden) fecharModal();
        });
        resumoModal.querySelector('#resumo-cta')?.addEventListener('click', fecharModal);
    }
});
