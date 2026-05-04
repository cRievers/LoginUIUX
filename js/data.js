// js/data.js

const eventos = [
    {
        id: 1,
        titulo: "Workshop de Sistemas de Informação (WSI)",
        data: "2026-05-15T19:00:00",
        local: "Auditório Principal - IFMG",
        descricao: "Explorando as fronteiras da IHC e IA.",
        imagem: "assets/wsi.jpg",
        categoria: "Acadêmico",
        categorias: [
            { id: "std", nome: "Normal", preco: 50.00 },
            { id: "vip", nome: "Área VIP", preco: 120.00 }
        ],
        // Matriz de assentos: null = corredor, true = disponível, false = ocupado
        mapaAssentos: [
            [true, true, null, true, true],
            [true, false, null, true, true],
            [true, true, null, false, false],
            [false, true, null, true, true]
        ]
    },
    {
        id: 2,
        titulo: "Festival Barreiros Rievers - Edição de Inverno",
        data: "2026-07-20T20:00:00",
        local: "Praça de Eventos",
        descricao: "Música, arte e gastronomia com artistas locais e atrações nacionais.",
        imagem: "assets/festival.jpg",
        categoria: "Música",
        categorias: [
            { id: "std", nome: "Pista", preco: 80.00 },
            { id: "vip", nome: "Camarote", preco: 200.00 }
        ],
        mapaAssentos: [
            [true, true, true, null, true, true, true],
            [false, true, true, null, true, false, true],
            [true, true, false, null, true, true, true]
        ]
    },
    {
        id: 3,
        titulo: "Campeonato de Robótica: Mini Sumô 500g",
        data: "2025-10-10T14:00:00", // Evento passado
        local: "Ginásio Poliesportivo",
        descricao: "A maior batalha de robôs da região. Venha torcer pela sua equipe favorita!",
        imagem: "assets/robotica.jpg",
        categoria: "Robótica",
        categorias: [
            { id: "std", nome: "Arquibancada", preco: 20.00 }
        ],
        mapaAssentos: [
            [false, false, null, false, false],
            [false, false, null, false, false]
        ]
    }
];

// Ingressos comprados pelo usuário
const meusIngressos = [
    {
        idCompra: "ABC-123",
        eventoId: 3, // Refere-se a um evento passado
        categoria: "Arquibancada",
        assento: "A1",
        dataCompra: "2025-09-15",
        qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" 
    }
];
