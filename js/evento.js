// js/evento.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Event ID from URL params
    const params = new URLSearchParams(window.location.search);
    const eventIdParam = params.get('id');
    const eventId = eventIdParam ? parseInt(eventIdParam) : 1; // Fallback para 1

    const eventoAtual = eventos.find(e => e.id === eventId);

    if (!eventoAtual) {
        alert('Evento não encontrado!');
        window.location.href = '/';
        return;
    }

    let assentoSelecionado = null;
    let categoriaSelecionada = eventoAtual.categorias[0];

    function init() {
        renderEventDetails();
        renderCategoriaSelector();
        renderizarMapa();
        setupEventListeners();
    }

    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    function renderEventDetails() {
        const detailsContainer = document.getElementById('event-details');
        const imgSrc = eventoAtual.imagem || 'https://via.placeholder.com/800x400?text=Capa+do+Evento';

        detailsContainer.innerHTML = `
            <img src="${imgSrc}" alt="${eventoAtual.titulo}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 24px;" onerror="this.src='https://via.placeholder.com/800x400?text=Sem+Imagem'">
            <h2 style="font-size: 2rem; color: var(--primary); margin-bottom: 8px;">${eventoAtual.titulo}</h2>
            <p style="font-size: 1.1rem; margin-bottom: 16px; color: var(--secondary);">${eventoAtual.descricao}</p>
            
            <div style="display: flex; gap: 24px; flex-wrap: wrap;">
                <div class="event-info" style="margin-bottom: 0;">
                    <span class="material-symbols-outlined">calendar_today</span>
                    <span>${formatDate(eventoAtual.data)}</span>
                </div>
                <div class="event-info" style="margin-bottom: 0;">
                    <span class="material-symbols-outlined">location_on</span>
                    <span>${eventoAtual.local}</span>
                </div>
                <div class="event-info" style="margin-bottom: 0;">
                    <span class="material-symbols-outlined">sell</span>
                    <span>Categoria: ${eventoAtual.categoria}</span>
                </div>
            </div>
        `;
    }

    function renderCategoriaSelector() {
        const select = document.getElementById('categoria-ingresso');
        select.innerHTML = '';
        
        eventoAtual.categorias.forEach((cat, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${cat.nome} - R$ ${cat.preco.toFixed(2).replace('.', ',')}`;
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            categoriaSelecionada = eventoAtual.categorias[e.target.value];
            updateSelectionStatus();
        });
    }

    function renderizarMapa() {
        const container = document.getElementById('mapa-container');
        container.innerHTML = ''; // Limpa antes de renderizar

        // Configura colunas dinamicamente baseado na maior fila (Heurística de Consistência e Prevenção)
        const maxCols = Math.max(...eventoAtual.mapaAssentos.map(fila => fila.length));
        container.style.gridTemplateColumns = `repeat(${maxCols}, 40px)`;

        eventoAtual.mapaAssentos.forEach((fila, i) => {
            fila.forEach((status, j) => {
                const assento = document.createElement('div');
                const label = `${String.fromCharCode(65 + i)}${j + 1}`; // Ex: A1, B2

                if (status === null) {
                    assento.className = 'seat corredor';
                } else {
                    assento.className = `seat ${status ? 'available' : 'occupied'}`;
                    assento.textContent = label;

                    if (status) { // Se estiver disponível
                        assento.onclick = () => selecionarAssento(label, assento);
                    } else {
                        assento.title = "Assento Ocupado"; // Heurística #1
                    }
                }
                container.appendChild(assento);
            });
        });
    }

    function selecionarAssento(label, elemento) {
        // Remove seleção anterior (Heurística #3 - Liberdade, altera sem travar)
        document.querySelectorAll('.seat.selected').forEach(el => el.classList.remove('selected'));
        
        // Aplica nova seleção
        elemento.classList.add('selected');
        assentoSelecionado = label;

        updateSelectionStatus();
    }

    function updateSelectionStatus() {
        if (!assentoSelecionado) return;

        // Atualiza interface (Heurística #1 - Visibilidade)
        const statusDiv = document.getElementById('selection-status');
        const labelSpan = document.getElementById('seat-label');
        const priceSpan = document.getElementById('price-label');
        const btn = document.getElementById('btn-confirmar');

        statusDiv.style.display = 'block';
        labelSpan.textContent = assentoSelecionado;
        priceSpan.textContent = `R$ ${categoriaSelecionada.preco.toFixed(2).replace('.', ',')} (${categoriaSelecionada.nome})`;
        btn.disabled = false;
    }

    function setupEventListeners() {
        const btnConfirmar = document.getElementById('btn-confirmar');
        btnConfirmar.addEventListener('click', () => {
            if (!assentoSelecionado) return;
            
            // Passa os dados via URLSearchParams para o checkout
            const params = new URLSearchParams();
            params.append('eventId', eventoAtual.id);
            params.append('seat', assentoSelecionado);
            params.append('categoryId', categoriaSelecionada.id);
            
            window.location.href = `/pages/checkout.html?${params.toString()}`;
        });
    }

    // Inicializa
    init();
});
