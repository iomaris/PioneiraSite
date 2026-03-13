/* ==================== MENU MOBILE ==================== */

document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    // Toggle menu mobile
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar-container')) {
            navbarMenu.classList.remove('active');
        }
    });
});

/* ==================== FORMULÁRIO DE ORÇAMENTO ==================== */

document.addEventListener('DOMContentLoaded', function() {
    const orcamentoForm = document.getElementById('orcamentoForm');

    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Coletar dados do formulário
            const formData = {
                nome: document.getElementById('nome').value,
                empresa: document.getElementById('empresa').value,
                telefone: document.getElementById('telefone').value,
                equipamento: document.getElementById('equipamento').value,
                tempo: document.getElementById('tempo').value,
                mensagem: document.getElementById('mensagem').value
            };

            // Validar campos obrigatórios
            if (!formData.nome || !formData.empresa || !formData.telefone || !formData.equipamento || !formData.tempo) {
                mostrarNotificacao('Por favor, preencha todos os campos obrigatórios!', 'erro');
                return;
            }

            // Validar telefone (formato básico)
            if (!validarTelefone(formData.telefone)) {
                mostrarNotificacao('Por favor, insira um telefone válido!', 'erro');
                return;
            }

            // Enviar dados (simulado)
            enviarOrcamento(formData);
        });
    }
});

// Função para validar telefone
function validarTelefone(telefone) {
    const regex = /^[\d\s\-\(\)]+$/;
    return regex.test(telefone) && telefone.replace(/\D/g, '').length >= 10;
}

// Função para enviar orçamento
function enviarOrcamento(dados) {
    // Simular envio (em produção, seria uma chamada AJAX/Fetch)
    console.log('Orçamento enviado:', dados);

    // Mostrar mensagem de sucesso
    mostrarNotificacao('Orçamento enviado com sucesso! Entraremos em contato em breve.', 'sucesso');

    // Limpar formulário
    document.getElementById('orcamentoForm').reset();

    // Rolar para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo) {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;

    // Adicionar estilos inline (fallback se CSS não carregar)
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${tipo === 'sucesso' ? 'background-color: #10b981;' : 'background-color: #ef4444;'}
    `;

    // Adicionar ao DOM
    document.body.appendChild(notificacao);

    // Remover após 5 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 5000);
}

/* ==================== ANIMAÇÕES DE SCROLL ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Observador de interseção para animações ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos com classe 'fade-in'
    const fadeInElements = document.querySelectorAll('.equipamento-card, .vantagem-card, .cliente-card, .blog-card');
    fadeInElements.forEach(el => {
        observer.observe(el);
    });
});

/* ==================== SMOOTH SCROLL PARA ÂNCORAS ==================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorar links vazios ou sem alvo
        if (href === '#' || !document.querySelector(href)) {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ==================== CONTADOR DE ESTATÍSTICAS ==================== */

function animarContador(elemento, alvo, duracao = 2000) {
    let inicio = 0;
    const incremento = alvo / (duracao / 16);
    
    const timer = setInterval(() => {
        inicio += incremento;
        if (inicio >= alvo) {
            elemento.textContent = alvo;
            clearInterval(timer);
        } else {
            elemento.textContent = Math.floor(inicio);
        }
    }, 16);
}

// Iniciar animação de contadores quando a seção "sobre" ficar visível
document.addEventListener('DOMContentLoaded', function() {
    const sobreSection = document.querySelector('.sobre');
    
    if (sobreSection) {
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statBoxes = entry.target.querySelectorAll('.stat-box h3');
                    statBoxes.forEach(box => {
                        const texto = box.textContent;
                        const numero = parseInt(texto.replace(/\D/g, ''));
                        
                        if (!isNaN(numero)) {
                            animarContador(box, numero);
                        }
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(sobreSection);
    }
});

/* ==================== EFEITO HOVER NAS IMAGENS ==================== */

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.equipamento-card img, .obra-card img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

/* ==================== VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL ==================== */

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.orcamento-form input, .orcamento-form select, .orcamento-form textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validarCampo(this);
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#1e40af';
        });
    });
});

function validarCampo(campo) {
    if (campo.value.trim() === '') {
        campo.style.borderColor = '#ef4444';
        campo.style.backgroundColor = '#fef2f2';
    } else {
        campo.style.borderColor = '#10b981';
        campo.style.backgroundColor = '#f0fdf4';
    }
}

/* ==================== ANIMAÇÃO CSS KEYFRAMES ==================== */

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .animate-in {
        animation: fadeIn 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

/* ==================== DETECÇÃO DE NAVEGADOR ==================== */

function detectarNavegador() {
    const ua = navigator.userAgent;
    
    if (ua.indexOf('Chrome') > -1) {
        console.log('Navegador: Chrome');
    } else if (ua.indexOf('Safari') > -1) {
        console.log('Navegador: Safari');
    } else if (ua.indexOf('Firefox') > -1) {
        console.log('Navegador: Firefox');
    }
}

/* ==================== SCROLL PARA TOPO ==================== */

// Criar botão "Voltar ao Topo"
const botaoTopo = document.createElement('button');
botaoTopo.id = 'botaoTopo';
botaoTopo.innerHTML = '↑';
botaoTopo.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #1e40af;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    display: none;
    z-index: 49;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(botaoTopo);

// Mostrar/ocultar botão ao scroll
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        botaoTopo.style.display = 'block';
    } else {
        botaoTopo.style.display = 'none';
    }
});

// Scroll para topo ao clicar
botaoTopo.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect no botão
botaoTopo.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#1e3a8a';
    this.style.transform = 'scale(1.1)';
});

botaoTopo.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#1e40af';
    this.style.transform = 'scale(1)';
});

/* ==================== INICIALIZAÇÃO GERAL ==================== */

console.log('Site Pioneira carregado com sucesso!');
