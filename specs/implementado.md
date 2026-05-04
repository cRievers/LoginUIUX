# Controle de Implementação

Aqui estão listados todos os passos implementados e o que ainda falta fazer, baseado no plano definido em `implementationPlan.md`. Isso garante que nenhuma heurística de usabilidade ou regra de negócio passe despercebida.

## ✅ Milestone 1: Fundação, Estilo e Dados (Core)
**Status:** CONCLUÍDO

- [x] **Arquitetura de Pastas:** Estrutura base criada (`assets/`, `css/`, `js/`).
- [x] **Organização de Páginas:** Arquivos de tela (`evento.html`, `checkout.html`, `perfil.html`) movidos para a pasta `/pages` para melhor escalabilidade, mantendo o `index.html` na raiz como entry point.
- [x] **Boilerplate Inicial:** `index.html` populado com estrutura HTML5 básica, links para CSS/JS e interface de boas-vindas para evitar tela em branco no ambiente de desenvolvimento.
- [x] **Design System:** `css/main.css` implementado utilizando variáveis Material Design (M3) (cores semânticas, elevação/sombras e tipografia padrão).
- [x] **Mock de Dados:** `js/data.js` configurado adequadamente com eventos (passados e futuros) e a estrutura de matriz bidimensional (`true`, `false` e `null`) para o controle dos assentos.
- [x] **Heurísticas de Nielsen:** *Consistência e Padrões (#4)* aplicada através da construção do Design System padronizado.

---

## ✅ Milestone 2: Discovery (Landing Page e Busca)
**Status:** CONCLUÍDO

- [x] Estruturar o `index.html` com o Hero Section e o Grid de Eventos.
- [x] Implementar em JavaScript a lógica de renderização dinâmica dos cards a partir dos dados do `data.js`.
- [x] Criar a funcionalidade de busca em tempo real na listagem com delay visual (debounce).
- [x] Criar filtros de listagem por categoria (usando Chips do Material Design) com mudança de cor no estado ativo.
- [x] **Heurísticas Foco:** *Reconhecimento em vez de recordação (#6)* (Data, Local, Preço visíveis sem clicar) e *Estética Minimalista (#8)* (Layout em Grid Responsivo e Material Design). *Visibilidade do Status (#1)* (Feedback em buscas sem resultado e número de eventos).

---

## ⏳ Milestone 3: O Coração do IHC (Mapa de Assentos)
**Status:** PENDENTE

- [ ] Desenvolver `pages/evento.html` contendo os detalhes do evento e o container do mapa de assentos.
- [ ] Implementar o gerador de grid dinâmico via JS que converte os arrays em interface visual (interpretação do `null` para corredores).
- [ ] Inserir lógica de seleção de assento com feedback visual imediato ("selecionado", "livre", "ocupado").
- [ ] Atualizar o preço da compra em tempo real conforme a seleção do assento.
- [ ] **Heurísticas Foco:** *Visibilidade do Status do Sistema (#1)* e *Correspondência com o Mundo Real (#2)*.

---

## ⏳ Milestone 4: Fluxo de Checkout e Simulação
**Status:** PENDENTE

- [ ] Desenvolver `pages/checkout.html` trazendo o resumo do pedido (valores e assentos) das telas anteriores.
- [ ] Desenvolver formulário de pagamento com máscaras de input visuais (Cartão, Validade, CVV) via JavaScript puro.
- [ ] Criar simulação de transação com delay (`setTimeout`) e alteração de estados no botão ("Processando...", "Concluído").
- [ ] **Heurísticas Foco:** *Prevenção de Erros (#5)* e *Ajuda na Recuperação de Erros (#9)*.

---

## ⏳ Milestone 5: Pós-Venda e Ingresso Digital (Perfil)
**Status:** PENDENTE

- [ ] Desenvolver `pages/perfil.html` contendo um sistema de abas para exibir "Eventos Futuros" e "Histórico/Passados".
- [ ] Construir lógica de ordenação cronológica dos ingressos do usuário baseada em `data.js`.
- [ ] Interface final do "Ingresso Digital", garantindo a renderização visual do QR Code.
- [ ] **Heurísticas Foco:** *Flexibilidade e Eficiência de Uso (#7)*.
