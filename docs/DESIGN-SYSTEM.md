# Design System

## Filosofia

O design system do NEXORAMA Hub segue princípios de:
- **TDAH-friendly**: Progresso visível, feedback imediato
- **Dark-first**: Interface escura como padrão
- **Minimalista**: Foco no conteúdo, não na decoração

---

## Cores

### Dark Mode (default)

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#0a0a0f` | Background principal |
| `--bg-secondary` | `#12121a` | Sidebar, áreas secundárias |
| `--bg-card` | `#16161e` | Cards |
| `--bg-card-hover` | `#1c1c26` | Cards em hover |
| `--text` | `#f1f5f9` | Texto principal |
| `--text-secondary` | `#94a3b8` | Texto secundário |
| `--text-muted` | `#64748b` | Labels, hints |
| `--border` | `#1e293b` | Bordas |
| `--border-light` | `#334155` | Bordas claras |

### Cores de Accent

| Token | Valor | Uso |
|-------|-------|-----|
| `--accent` | `#8b5cf6` | Roxo principal |
| `--accent-light` | `rgba(139, 92, 246, 0.15)` | Background accent |
| `--accent-glow` | `rgba(139, 92, 246, 0.4)` | Glow effects |
| `--cyan` | `#06b6d4` | Secundário (gradients) |

### Cores Semânticas

| Token | Valor | Uso |
|-------|-------|-----|
| `--success` | `#10b981` | Concluído, ativo |
| `--success-light` | `rgba(16, 185, 129, 0.15)` | Background success |
| `--warning` | `#f59e0b` | Em progresso |
| `--warning-light` | `rgba(245, 158, 11, 0.15)` | Background warning |
| `--danger` | `#ef4444` | Erro (não usado) |
| `--locked` | `#475569` | Bloqueado |
| `--locked-bg` | `#1e293b` | Background bloqueado |

### Light Mode

| Token | Valor Dark | Valor Light |
|-------|------------|-------------|
| `--bg` | `#0a0a0f` | `#f8fafc` |
| `--bg-secondary` | `#12121a` | `#f1f5f9` |
| `--bg-card` | `#16161e` | `#ffffff` |
| `--text` | `#f1f5f9` | `#0f172a` |
| `--text-secondary` | `#94a3b8` | `#475569` |

---

## Tipografia

### Fonte
- **Família**: Inter
- **Fallback**: -apple-system, BlinkMacSystemFont, sans-serif
- **Pesos**: 400, 500, 600, 700, 800

### Escala Tipográfica

| Token | Tamanho | Uso |
|-------|---------|-----|
| `--text-xs` | 10px | Micro labels, badges, story IDs |
| `--text-sm` | 12px | Labels, roles, taglines |
| `--text-md` | 14px | Body, descriptions, buttons |
| `--text-lg` | 16px | Names, card titles |
| `--text-xl` | 20px | Section headers |
| `--text-2xl` | 24px | Subheadings |
| `--text-3xl` | 32px | Page titles |
| `--text-4xl` | 48px | Hero/display |
| `--text-5xl` | 64px | Large hero |

### Line Height
- `line-height: 1.5` (padrão body)
- `line-height: 1.7` (content-text)
- `line-height: 1.4` (taglines)
- `line-height: 1` (números grandes)

---

## Espaçamento

### Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius` | 16px | Cards principais |
| `--radius-sm` | 12px | Cards secundários |
| `--radius-xs` | 8px | Buttons, inputs |

### Padding Comum
- **Cards**: 24px
- **Sidebar items**: 10px 20px
- **Buttons**: 10px 20px
- **Badges**: 4px 10px

---

## Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow` | `0 4px 12px rgba(0,0,0,0.3)` | Cards |
| `--shadow-lg` | `0 12px 32px rgba(0,0,0,0.4)` | Modals, hovers |
| `--shadow-glow` | `0 0 30px var(--accent-glow)` | Highlight |

### Light Mode
- `--shadow`: `0 2px 8px rgba(0,0,0,0.08)`
- `--shadow-lg`: `0 8px 24px rgba(0,0,0,0.12)`

---

## Gradients

### Gradient Card
```css
--gradient-card: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
```

### Gradient Accent
```css
--gradient-accent: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
```
Usado em: logo, números de estatísticas, progress bars.

---

## Componentes Visuais

### Status Badges

```css
.status-badge.done {
    background: var(--success-light);
    color: var(--success);
}
.status-badge.in_progress {
    background: var(--warning-light);
    color: var(--warning);
}
.status-badge.pending {
    background: var(--bg);
    color: var(--text-muted);
}
```

### Story Check Icons

| Status | Visual |
|--------|--------|
| `done` | Círculo verde com ✓ |
| `in_progress` | Círculo roxo com → |
| `pending` | Círculo vazio cinza |

### Mind Tags

```css
.mind-tag {
    background: var(--accent-light);
    border: 1px solid var(--accent);
    color: var(--accent);
    border-radius: 20px;
    padding: 6px 12px;
}
.mind-tag::before { content: '🧠'; }
```

### Progress Bars

```css
.progress-bar {
    height: 8px;
    background: var(--border);
    border-radius: 4px;
}
.progress-fill.active {
    background: linear-gradient(90deg, var(--success), #22c55e);
}
.progress-fill.next {
    background: linear-gradient(90deg, var(--accent), #818cf8);
}
.progress-fill.locked {
    background: var(--locked);
}
```

---

## Animações

### Transições Padrão
```css
transition: all 0.2s;          /* Geral */
transition: background 0.15s;   /* Navegação */
transition: transform 0.2s;     /* Scale, rotation */
transition: width 0.4s ease;    /* Progress bars */
```

### Pulse Glow (Unlock Ready)
```css
@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    50% { box-shadow: 0 0 20px 4px rgba(99, 102, 241, 0.2); }
}
.unlock-card.next { animation: pulse-glow 2s infinite; }
```

### Hover Effects
- **Cards**: `transform: translateY(-2px)` + shadow
- **Logo**: `transform: scale(1.05)`
- **Chevron**: `transform: rotate(90deg)`

---

## Scrollbar

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
}
```

---

## Responsividade

### Layout Fixo
- Sidebar: 280px fixo, `position: fixed`
- Main: `margin-left: 280px`
- Value Ladder: Grid 4 colunas

### Considerações Mobile
O layout atual não é otimizado para mobile. Ajustes necessários:
- Sidebar colapsável
- Value Ladder em 1-2 colunas
- Cards empilhados

---

## Cores por Sintoma (NEXORAMA App)

| Sintoma | Cor |
|---------|-----|
| Overthinking | Indigo |
| Ansiedade | Emerald |
| Procrastinação | Orange |
| Estresse | Rose |
| Névoa Mental | Sky |

---

## Uso do Design System

### Aplicando Tokens
```css
.my-component {
    background: var(--bg-card);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: var(--text-md);
    box-shadow: var(--shadow);
}
```

### Theming Automático
Todos os tokens se adaptam automaticamente quando `.light-mode` é aplicado ao body.
