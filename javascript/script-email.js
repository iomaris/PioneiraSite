/* ==================== FORMULÁRIO DE ORÇAMENTO COM FORMSPREE ==================== */
document.addEventListener('DOMContentLoaded', function () {
    const orcamentoForm = document.getElementById('orcamentoForm');

    if (orcamentoForm) {
        // Configurar o formulário para usar Formspree
        orcamentoForm.setAttribute('action', 'https://formspree.io/f/YOUR_FORMSPREE_ID');
        orcamentoForm.setAttribute('method', 'POST');

        orcamentoForm.addEventListener('submit', function (e) {
            // Não previne o envio padrão para deixar o Formspree funcionar
            
            const formData = {
                nome: document.getElementById('nome').value,
                empresa: document.getElementById('empresa').value,
                telefone: document.getElementById('telefone').value,
                equipamento: document.getElementById('equipamento').value,
                tempo: document.getElementById('tempo').value,
                mensagem: document.getElementById('mensagem').value
            };

            if (!formData.nome || !formData.empresa || !formData.telefone || !formData.equipamento || !formData.tempo) {
                e.preventDefault();
                mostrarNotificacao('Por favor, preencha todos os campos obrigatórios!', 'erro');
                return;
            }

            if (!validarTelefone(formData.telefone)) {
                e.preventDefault();
                mostrarNotificacao('Por favor, insira um telefone válido!', 'erro');
                return;
            }

            // Mostrar notificação de sucesso após envio
            mostrarNotificacao('Orçamento enviado com sucesso! Entraremos em contato em breve.', 'sucesso');
        });
    }
});

function validarTelefone(telefone) {
    const regex = /^[\d\s\-\(\)]+$/;
    return regex.test(telefone) && telefone.replace(/\D/g, '').length >= 10;
}

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
