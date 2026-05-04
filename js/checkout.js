// js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obter dados da URL (Heurística #6 - manter contexto)
    const params = new URLSearchParams(window.location.search);
    const eventIdParam = params.get('eventId');
    const seat = params.get('seat');
    const categoryId = params.get('categoryId');

    if (!eventIdParam || !seat || !categoryId) {
        alert('Dados da compra incompletos. Retornando à página inicial.');
        window.location.href = '/';
        return;
    }

    const eventId = parseInt(eventIdParam);
    const eventoAtual = eventos.find(e => e.id === eventId);

    if (!eventoAtual) {
        alert('Evento não encontrado!');
        window.location.href = '/';
        return;
    }

    const categoriaSelecionada = eventoAtual.categorias.find(c => c.id === categoryId) || eventoAtual.categorias[0];

    // Configurar Botão Voltar (Heurística #3 - Controle e liberdade do usuário)
    const btnVoltar = document.getElementById('btn-voltar');
    btnVoltar.addEventListener('click', () => {
        window.location.href = `/pages/evento.html?id=${eventoAtual.id}`;
    });

    // Estado Atual da Compra
    const compraAtual = {
        eventoId: eventoAtual.id,
        eventoTitulo: eventoAtual.titulo,
        categoria: categoriaSelecionada.nome,
        assento: seat,
        valor: categoriaSelecionada.preco
    };

    // Renderizar Resumo
    function renderSummary() {
        const summaryContent = document.getElementById('summary-content');
        const btnPagar = document.getElementById('btn-pagar');
        
        summaryContent.innerHTML = `
            <div class="summary-item">
                <span style="color: var(--secondary);">Evento</span>
                <span style="font-weight: 500; text-align: right; max-width: 60%;">${compraAtual.eventoTitulo}</span>
            </div>
            <div class="summary-item">
                <span style="color: var(--secondary);">Categoria</span>
                <span style="font-weight: 500;">${compraAtual.categoria}</span>
            </div>
            <div class="summary-item">
                <span style="color: var(--secondary);">Assento</span>
                <span style="font-weight: 500; color: var(--primary);">${compraAtual.assento}</span>
            </div>
            <div class="summary-total">
                <span>Total a pagar</span>
                <span>R$ ${compraAtual.valor.toFixed(2).replace('.', ',')}</span>
            </div>
        `;

        btnPagar.textContent = `Pagar R$ ${compraAtual.valor.toFixed(2).replace('.', ',')}`;
    }

    renderSummary();

    // 2. Máscaras e Validações do Formulário (Heurística #5 - Prevenção de Erros)
    const inputs = {
        nome: document.getElementById('card-name'),
        cartao: document.getElementById('card-number'),
        validade: document.getElementById('card-expiry'),
        cvv: document.getElementById('card-cvv')
    };
    const btnPagar = document.getElementById('btn-pagar');

    // Máscara para Número do Cartão (0000 0000 0000 0000)
    inputs.cartao.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona espaço a cada 4 dígitos
        e.target.value = value;
        validarFormulario();
    });

    // Máscara para Validade (MM/AA)
    inputs.validade.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        validarFormulario();
    });

    // Máscara para CVV (Apenas números e limite de 4 dígitos)
    inputs.cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        validarFormulario();
    });

    // Validação Nome
    inputs.nome.addEventListener('input', validarFormulario);

    function validarFormulario() {
        const cartaoValido = inputs.cartao.value.replace(/\s/g, '').length === 16;
        const validadeValida = inputs.validade.value.length === 5;
        const cvvValido = inputs.cvv.value.length >= 3;
        const nomeValido = inputs.nome.value.trim().length > 3;

        // Ativa o botão apenas se tudo estiver preenchido corretamente
        btnPagar.disabled = !(cartaoValido && validadeValida && cvvValido && nomeValido);
    }

    // 3. Simulação de Processamento (Heurística #1 - Visibilidade do status do sistema)
    function processarPagamento() {
        // Altera o estado do botão para visualização de carregamento
        btnPagar.disabled = true;
        const textoOriginal = btnPagar.innerHTML;
        btnPagar.innerHTML = `<span class="spinner"></span> Processando...`;

        // Simulação de comunicação com o banco (2 segundos)
        setTimeout(() => {
            // Regra mockada de erro: Se o CVV for 000 (Heurística #9 - Diagnóstico de erro)
            if (inputs.cvv.value === '000') {
                alert("Ops! O pagamento foi recusado pela administradora. Verifique os dados ou tente outro cartão.");
                btnPagar.innerHTML = textoOriginal;
                btnPagar.disabled = false;
                return;
            }

            // Simulação de Sucesso
            // Gera um ID de compra único
            const idCompra = 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            
            // Cria o objeto do ingresso comprado
            const novoIngresso = {
                idCompra: idCompra,
                eventoId: compraAtual.eventoId,
                categoria: compraAtual.categoria,
                assento: compraAtual.assento,
                dataCompra: new Date().toISOString().split('T')[0],
                qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" 
            };

            // Idealmente 'meusIngressos' do data.js deveria ser atualizado, mas como é um JS estático
            // podemos simular salvando no localStorage para persistir na navegação, ou apenas seguir.
            // Para efeitos de mock simples:
            meusIngressos.push(novoIngresso);
            
            // Salvar no localStorage também para a próxima página ter acesso
            localStorage.setItem('ultimoIngressoComprado', JSON.stringify(novoIngresso));

            // Redirecionamento
            window.location.href = '/pages/perfil.html?success=true';
        }, 2000);
    }

    btnPagar.addEventListener('click', processarPagamento);
});
