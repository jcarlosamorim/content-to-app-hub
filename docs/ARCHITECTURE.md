# Arquitetura Técnica

## Visão Geral da Arquitetura

O NEXORAMA Hub é uma **Single Page Application (SPA)** client-side pura, sem dependências de build ou servidor backend.

```
┌─────────────────────────────────────────────────────────────┐
│                         BROWSER                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐ │
│  │  Alpine.js  │───▶│   DOM/CSS   │◀───│   data.json     │ │
│  │   (State)   │    │  (Render)   │    │   (Data)        │ │
│  └─────────────┘    └─────────────┘    └─────────────────┘ │
│         │                                       ▲           │
│         ▼                                       │           │
│  ┌─────────────────────────────────────────────┴─────────┐ │
│  │                    LocalStorage                        │ │
│  │              (Persistência de Métricas)                │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Stack Técnica Detalhada

### Alpine.js 3.x
- **CDN**: `https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js`
- **Uso**: Reatividade declarativa via atributos `x-data`, `x-bind`, `x-on`, `x-show`, `x-for`
- **Carregamento**: `defer` para não bloquear renderização

### CSS Custom Properties (Design Tokens)
- Sistema de tokens em `:root` para theming
- Suporte a dark/light mode via classe `.light-mode`
- Sem preprocessador (CSS puro)

### Google Fonts
- **Fonte**: Inter (pesos: 400, 500, 600, 700, 800)
- **Preconnect** para otimização de carregamento

## Padrões de Código

### Estado (Alpine.js)

```javascript
function hub() {
    return {
        // Dados carregados
        project: {},
        epics: [],
        valueLadder: [],

        // Estado de UI
        selectedEpic: null,
        selectedStory: null,
        selectedLadderItem: null,
        expandedEpics: [],
        showMetricsModal: false,
        lightMode: false,

        // Computed properties
        get totalEpics() { return this.epics.length; },
        get progressPercent() { ... },

        // Métodos
        async init() { ... },
        toggleEpic(epic) { ... },
        selectStory(epic, story) { ... },
    }
}
```

### Carregamento de Dados

```javascript
async init() {
    // Fetch com cache-busting
    const response = await fetch('data.json?t=' + Date.now());
    const data = await response.json();

    // Hidratação do estado
    this.project = data.project;
    this.epics = data.epics;
    this.valueLadder = data.valueLadder;

    // Restaurar métricas do localStorage
    const saved = localStorage.getItem('hub-metrics');
    if (saved) { ... }
}
```

### Persistência (LocalStorage)

```javascript
// Chave: 'hub-metrics'
// Estrutura:
{
    "1": {  // level
        "subscribers": { "current": 150, "updatedAt": "2025-01-02" }
    },
    "2": {
        "sales": { "current": 5, "updatedAt": "2025-01-02" }
    }
}
```

## Fluxo de Dados

```
┌──────────────┐     fetch      ┌──────────────┐
│  data.json   │──────────────▶│  Alpine.js   │
│  (estático)  │                │   (estado)   │
└──────────────┘                └──────┬───────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
             ┌──────────┐       ┌──────────┐       ┌──────────┐
             │ Sidebar  │       │  Main    │       │  Modal   │
             │ (épicas) │       │ (content)│       │ (metrics)│
             └──────────┘       └──────────┘       └────┬─────┘
                                                        │
                                                        ▼
                                                 ┌──────────────┐
                                                 │ localStorage │
                                                 └──────────────┘
```

## Sistema de Theming

### Tokens Dark Mode (default)
```css
:root {
    --bg: #0a0a0f;
    --bg-secondary: #12121a;
    --bg-card: #16161e;
    --text: #f1f5f9;
    --accent: #8b5cf6;
}
```

### Tokens Light Mode
```css
.light-mode {
    --bg: #f8fafc;
    --bg-secondary: #f1f5f9;
    --bg-card: #ffffff;
    --text: #0f172a;
}
```

### Aplicação
```html
<body x-data="hub()" :class="{ 'light-mode': lightMode }">
```

## Sistema de Desbloqueio (Value Ladder)

### Lógica de Status

```javascript
getUnlockStatus(item) {
    // Level 1 sempre ativo (entrada)
    if (!item.unlockRequirements) return 'active';

    // Verifica se todos os requisitos foram cumpridos
    const allMet = item.unlockRequirements.every(req =>
        this.isRequirementMet(req)
    );

    return allMet ? 'next' : 'locked';
}
```

### Estados Visuais

| Status | Visual | Descrição |
|--------|--------|-----------|
| `active` | Verde + borda verde | Produto disponível |
| `next` | Roxo + animação pulse | Pronto para lançar |
| `locked` | Cinza + opacidade | Requisitos não cumpridos |

## Performance

### Otimizações Implementadas
1. **Defer Alpine.js** - Não bloqueia renderização
2. **Preconnect fonts** - Carrega fontes mais rápido
3. **Cache-busting** - Evita dados stale com `?t=timestamp`
4. **CSS Variables** - Theming sem reflow
5. **LocalStorage** - Persistência instantânea

### Métricas Esperadas
- **FCP**: < 1s
- **LCP**: < 2s
- **Bundle**: ~185KB (index.html) + ~110KB (data.json)

## Responsividade

### Breakpoints (não implementados explicitamente)
O layout usa CSS Grid com `grid-template-columns: repeat(4, 1fr)` para o Value Ladder, que pode precisar de ajustes para mobile.

### Sidebar
- Largura fixa: 280px
- `position: fixed`
- Main content com `margin-left: 280px`

## Extensibilidade

### Adicionar Nova Épica
1. Editar `data.json`
2. Adicionar objeto em `epics[]`
3. Seguir estrutura existente

### Adicionar Novo Nível na Value Ladder
1. Editar `data.json`
2. Adicionar objeto em `valueLadder[]`
3. Configurar `unlockRequirements` e `unlocksNext`

### Adicionar Nova Métrica
1. Adicionar em `metrics` do nível correspondente
2. Atualizar lógica de `saveMetrics()` se necessário
