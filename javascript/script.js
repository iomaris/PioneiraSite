/* ==================== MENU MOBILE ==================== */
document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navbarToggle) {
        navbarToggle.addEventListener('click', function () {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navbarMenu.classList.remove('active');
            if (navbarToggle) navbarToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar-container')) {
            navbarMenu.classList.remove('active');
            if (navbarToggle) navbarToggle.classList.remove('active');
        }
    });
});

/* ==================== NAVBAR SCROLL ==================== */
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ==================== ACTIVE NAV LINK ==================== */
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});

/* ==================== REVEAL ON SCROLL ==================== */
document.addEventListener('DOMContentLoaded', function () {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach(el => observer.observe(el));
});

/* ==================== CONTADOR DE ESTATÍSTICAS ==================== */
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const suffix = el.querySelector('.stat-suffix') ? el.querySelector('.stat-suffix').textContent : '';
                const duration = 2000;
                let start = 0;
                const step = target / (duration / 16);

                const timer = setInterval(() => {
                    start += step;
                    if (start >= target) {
                        el.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(start) + (start > target * 0.5 ? '+' : '');
                    }
                }, 16);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !document.querySelector(href)) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

/* ==================== FORMULÁRIO DE ORÇAMENTO ==================== */
document.addEventListener('DOMContentLoaded', function () {
    const orcamentoForm = document.getElementById('orcamentoForm');

    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                nome: document.getElementById('nome').value,
                empresa: document.getElementById('empresa').value,
                telefone: document.getElementById('telefone').value,
                equipamento: document.getElementById('equipamento').value,
                tempo: document.getElementById('tempo').value,
                mensagem: document.getElementById('mensagem').value
            };

            if (!formData.nome || !formData.empresa || !formData.telefone || !formData.equipamento || !formData.tempo) {
                mostrarNotificacao('Por favor, preencha todos os campos obrigatórios!', 'erro');
                return;
            }

            if (!validarTelefone(formData.telefone)) {
                mostrarNotificacao('Por favor, insira um telefone válido!', 'erro');
                return;
            }

            enviarOrcamento(formData);
        });
    }
});





/* ==================== NOTIFICAÇÕES ==================== */
function mostrarNotificacao(mensagem, tipo) {
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        z-index: 9999;
        max-width: 360px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        animation: slideInRight 0.4s ease;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        ${tipo === 'sucesso'
            ? 'background: linear-gradient(135deg, #10b981, #059669); border-left: 4px solid #34d399;'
            : 'background: linear-gradient(135deg, #ef4444, #dc2626); border-left: 4px solid #f87171;'}
    `;
    notificacao.innerHTML = `
        <i class="fa-solid ${tipo === 'sucesso' ? 'fa-circle-check' : 'fa-circle-exclamation'}" style="font-size:1.2rem;"></i>
        <span>${mensagem}</span>
    `;

    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.4s ease forwards';
        setTimeout(() => notificacao.remove(), 400);
    }, 5000);
}

/* ==================== ANIMAÇÕES CSS DINÂMICAS ==================== */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(120%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(120%); opacity: 0; }
    }
    .nav-link.active {
        color: #FF8C00 !important;
    }
    .nav-link.active::after {
        width: 80% !important;
    }
`;
document.head.appendChild(style);

/* ==================== BOTÃO VOLTAR AO TOPO ==================== */
const botaoTopo = document.createElement('button');
botaoTopo.id = 'botaoTopo';
botaoTopo.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
botaoTopo.style.cssText = `
    position: fixed;
    bottom: 6.5rem;
    right: 2rem;
    width: 46px;
    height: 46px;
    background: linear-gradient(135deg, #FF8C00, #FFB800);
    color: #000;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    display: none;
    z-index: 499;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 140, 0, 0.4);
    align-items: center;
    justify-content: center;
`;
document.body.appendChild(botaoTopo);

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 400) {
        botaoTopo.style.display = 'flex';
    } else {
        botaoTopo.style.display = 'none';
    }
});

botaoTopo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

botaoTopo.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.1) translateY(-2px)';
    this.style.boxShadow = '0 6px 25px rgba(255, 140, 0, 0.6)';
});

botaoTopo.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1) translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(255, 140, 0, 0.4)';
});

console.log('Site Pioneira carregado com sucesso!');

/* ==================== REDIRECIONAMENTO DE POSTS DO BLOG ==================== */
document.addEventListener('DOMContentLoaded', function () {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('click', function () {
            window.location.href = 'index.html#blog';
        });
    });

    const blogPostCards = document.querySelectorAll('.blog-post-card');
    
    blogPostCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = card.querySelector('.blog-post-title').textContent;
            const category = card.querySelector('.blog-post-category').textContent;
            localStorage.setItem('selectedBlogPost', JSON.stringify({
                title: title,
                category: category
            }));
            window.location.href = '#' + category.toLowerCase();
        });
    });
});
