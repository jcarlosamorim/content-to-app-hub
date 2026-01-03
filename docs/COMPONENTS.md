# Componentes e Funcionalidades

## Layout Principal

### Estrutura
```
┌──────────────────────────────────────────────────────────────┐
│                            APP                                │
├────────────┬─────────────────────────────────────────────────┤
│            │              LADDER HEADER                       │
│  SIDEBAR   │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│   (280px)  │  │ L1  │→│ L2  │→│ L3  │→│ L4  │               │
│            │  └─────┘ └─────┘ └─────┘ └─────┘               │
│            ├─────────────────────────────────────────────────┤
│            │                                                  │
│            │              MAIN CONTENT                        │
│            │                                                  │
│            │                                                  │
└────────────┴─────────────────────────────────────────────────┘
```

---

## Sidebar

### Componentes

#### 1. Header (Logo)
```html
<div class="sidebar-header" @click="goHome()">
    <div class="logo">NEXORAMA</div>
    <div class="tagline">Transforme conteúdo em sistemas de IA</div>
</div>
```
- Clique redireciona para home
- Hover com scale animation

#### 2. Lista de Épicas
```html
<template x-for="epic in epics">
    <div class="epic-item">
        <div class="epic-header" @click="toggleEpic(epic)">
            <span class="epic-emoji">🎯</span>
            <div class="epic-info">
                <div class="epic-name">Hub Visual</div>
            </div>
            <span class="epic-count">4/4</span>
            <svg class="epic-chevron">...</svg>
        </div>
        <!-- Stories expansíveis -->
    </div>
</template>
```

#### 3. Lista de Stories
```html
<div class="story-item" @click="selectStory(epic, story)">
    <div class="story-check" :class="story.status">
        ✓ / → / (vazio)
    </div>
    <div class="story-info">
        <div class="story-id">0.1</div>
        <div class="story-name">Definir Stack</div>
    </div>
</div>
```

**Status de Story:**
| Status | Ícone | Cor |
|--------|-------|-----|
| `done` | ✓ | Verde |
| `in_progress` | → | Roxo |
| `pending` | (vazio) | Cinza |

#### 4. Theme Toggle
```html
<div class="theme-toggle">
    <button :class="{ 'active': !lightMode }" @click="lightMode = false">
        🌙 Dark
    </button>
    <button :class="{ 'active': lightMode }" @click="lightMode = true">
        ☀️ Light
    </button>
</div>
```

---

## Value Ladder Header

### Unlock Cards

```html
<div class="unlock-card"
     :class="{ active, next, locked, selected }"
     @click="openLadderDetail(item)">

    <span class="card-status">✅ ATIVO / 🔓 PRONTO / 🔒 BLOQUEADO</span>
    <div class="card-name">Newsletter</div>
    <div class="card-price">Grátis</div>

    <!-- Progress Bar -->
    <div class="card-progress">
        <div class="progress-info">
            <span class="progress-label">Para desbloquear Framework</span>
            <span class="progress-value">30%</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 30%"></div>
        </div>
    </div>
</div>
```

### Estados Visuais

| Estado | Aparência |
|--------|-----------|
| `active` | Borda verde, background gradient verde |
| `next` | Borda roxa, animação pulse-glow |
| `locked` | Opacidade 75%, cores cinza |
| `selected` | Borda roxa (qualquer estado) |

### Conectores
- Setas `→` entre cards (via `::after`)
- Cor verde para active/next
- Último card sem seta

---

## Main Content

### Breadcrumb
```html
<div class="header-breadcrumb">
    <span>🎯</span>
    <span>Hub Visual</span>
    <span>/</span>
    <span>0.1</span>
</div>
```

### Header com Status
```html
<div class="header-title">
    <span>Definir Stack</span>
    <span class="status-badge done">Concluído</span>
</div>
```

### Card de Minds
```html
<div class="content-card">
    <div class="card-header">Minds Consultadas</div>
    <div class="card-body">
        <div class="minds-list">
            <span class="mind-tag">@Seth Godin</span>
            <span class="mind-tag">@Dan Koe</span>
        </div>
    </div>
</div>
```

### Card de Conteúdo
Renderização dinâmica de objetos JSON:

```html
<template x-for="(value, key) in selectedStory?.content">
    <div class="content-section">
        <div class="section-title" x-text="formatKey(key)"></div>
        <div x-html="renderValue(value, 0, key)"></div>
    </div>
</template>
```

**Tipos de Renderização:**
- **String**: Texto simples
- **Array**: Lista com bullets
- **Object**: Cards aninhados com key/value
- **Nested**: Recursão com indentação

---

## Modal de Métricas

### Estrutura
```html
<div class="modal-overlay" x-show="showMetricsModal">
    <div class="modal">
        <div class="modal-header">
            <h3>📊 Atualizar Métricas</h3>
            <button @click="showMetricsModal = false">×</button>
        </div>
        <div class="modal-body">
            <!-- Accordion por nível -->
            <template x-for="item in valueLadder">
                <div class="accordion-section">
                    <!-- Inputs de métricas -->
                </div>
            </template>
        </div>
        <div class="modal-footer">
            <button @click="saveMetrics()">Salvar</button>
        </div>
    </div>
</div>
```

### Inputs de Métricas
```html
<div class="metric-input">
    <label>Subscribers</label>
    <input type="number"
           :value="item.metrics.subscribers.current"
           @input="updateMetric(item.level, 'subscribers', $event.target.value)">
</div>
```

### Pending Unlocks
```html
<div class="unlock-pending" x-show="pendingUnlocks.length > 0">
    🎉 Ao salvar, você desbloqueará: Framework, Mentoria
</div>
```

---

## Dashboard Home

### Stats Grid
```html
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-number" x-text="totalEpics">4</div>
        <div class="stat-label">Épicas</div>
    </div>
    <!-- ... mais stats -->
</div>
```

### Progress Overview
```html
<div class="progress-overview">
    <div class="progress-header">
        <span class="progress-title">Progresso Geral</span>
        <span class="progress-percent" x-text="progressPercent + '%'">75%</span>
    </div>
    <div class="progress-bar-large">
        <div class="progress-fill-large" :style="'width:' + progressPercent + '%'"></div>
    </div>
</div>
```

---

## Funções Utilitárias

### formatKey(key)
Converte snake_case para Title Case:
```javascript
formatKey(key) {
    return key.replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase());
}
```

### renderValue(value, depth, key)
Renderiza valores JSON recursivamente:
- Strings → `<p>` ou link se URL
- Arrays → `<ul><li>...</li></ul>`
- Objects → Cards aninhados
- Números → Texto formatado

### formatMetricName(metric)
```javascript
formatMetricName(metric) {
    const names = {
        subscribers: 'Subscribers',
        emailsSent: 'Emails Enviados',
        openRate: 'Taxa de Abertura',
        sales: 'Vendas',
        revenue: 'Receita',
        students: 'Alunos',
        graduated: 'Formados',
        projects: 'Projetos'
    };
    return names[metric] || metric;
}
```

---

## Animações

### Pulse Glow (unlock-card.next)
```css
@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    50% { box-shadow: 0 0 20px 4px rgba(99, 102, 241, 0.2); }
}
```

### Transições Gerais
- `transition: all 0.2s` - Padrão para hovers
- `transition: background 0.15s` - Navegação sidebar
- `transition: transform 0.2s` - Chevron rotation
- `transition: width 0.4s ease` - Progress bars
