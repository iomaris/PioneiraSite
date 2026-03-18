/* ==================== FORMULÁRIO DE ORÇAMENTO COM FORMSPREE ==================== */

document.addEventListener('DOMContentLoaded', function () {
    const orcamentoForm = document.getElementById('orcamentoForm');

    if (orcamentoForm) {
        // Configurar o formulário para usar Formspree
        // SUBSTITUA 'YOUR_FORMSPREE_ID' PELO SEU ID REAL
        orcamentoForm.setAttribute('action', 'https://formspree.io/f/xlgpporo' );
        orcamentoForm.setAttribute('method', 'POST');

        orcamentoForm.addEventListener('submit', function (e) {
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const equipamento = document.getElementById('equipamento').value;
            const tempo = document.getElementById('tempo').value;

            // Validação: Empresa NÃO é mais obrigatória
            if (!nome || !telefone || !equipamento || !tempo) {
                e.preventDefault();
                mostrarNotificacao('Por favor, preencha os campos obrigatórios (Nome, Telefone, Equipamento e Tempo)!', 'erro');
                return;
            }

            if (!validarTelefone(telefone)) {
                e.preventDefault();
                mostrarNotificacao('Por favor, insira um telefone válido!', 'erro');
                return;
            }

            // Se chegou aqui, o Formspree fará o envio automaticamente
            mostrarNotificacao('Enviando orçamento...', 'sucesso');
        });
    }
});

function validarTelefone(t) {
    return t.replace(/\D/g, '').length >= 10;
}

function mostrarNotificacao(msg, tipo) {
    const n = document.createElement('div');
    n.style.cssText = `position:fixed;top:90px;right:20px;padding:1rem;border-radius:0.5rem;color:white;z-index:9999;font-family:sans-serif;${tipo==='sucesso'?'background:#10b981':'background:#ef4444'}`;
    n.innerHTML = msg;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 4000);
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
`;
document.head.appendChild(style);
