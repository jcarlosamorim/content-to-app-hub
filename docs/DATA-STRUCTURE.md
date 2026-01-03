# Estrutura de Dados

## Arquivo: data.json

O arquivo `data.json` contém toda a informação do projeto, organizada em três seções principais.

---

## 1. Project

Metadados do projeto.

```json
{
  "project": {
    "name": "Content-to-App",
    "tagline": "Transforme conteúdo em aplicações de IA",
    "version": "2.0",
    "lastUpdated": "2025-01-02"
  }
}
```

---

## 2. Epics

Lista de épicas do projeto, cada uma com suas stories.

### Estrutura de Epic

```typescript
interface Epic {
  id: number;
  name: string;
  emoji: string;
  description: string;
  color: string;
  stories: Story[];
}
```

### Estrutura de Story

```typescript
interface Story {
  id: string;           // "1.1", "2.3", etc.
  name: string;
  status: "done" | "in_progress" | "pending";
  minds?: string[];     // Mentores consultados: ["@Seth Godin", "@Dan Koe"]
  content?: object;     // Conteúdo estruturado (varia por story)
}
```

### Épicas Atuais

| ID | Nome | Emoji | Descrição | Stories |
|----|------|-------|-----------|---------|
| 0 | Hub Visual | 🎯 | Centro de comando TDAH-friendly | 4 |
| 1 | Arquitetura | 🏗️ | Definir a esteira Content-to-App | 5 |
| 2 | Cases | 📦 | Provar que funciona com exemplos reais | 5 |
| 3 | Copy | ✍️ | Comunicar de forma clara e magnética | 4+ |

### Exemplo de Story com Minds

```json
{
  "id": "1.1",
  "name": "Newsletter Strategy",
  "status": "done",
  "minds": ["@Seth Godin", "@Dan Koe"],
  "content": {
    "decisão": "Newsletter GRATUITA com formato 'Show, don't tell'",
    "nome": "Content-to-App Weekly",
    "formato": "1 Conteúdo → 1 App por semana",
    "estrutura": [
      "Conteúdo original (o que transformei)",
      "Extração (o que encontrei)",
      "App (o que criei)",
      "Bastidores (como fiz)",
      "CTA (quer isso pro seu conteúdo?)"
    ],
    "frequência": "Semanal (terça ou quinta)",
    "meta_90_dias": "1.000 subscribers",
    "insights": {
      "seth_godin": "Newsletter é permission marketing puro.",
      "dan_koe": "Newsletter é fundação do one-person business."
    }
  }
}
```

---

## 3. Value Ladder

Sistema de produtos com desbloqueio progressivo.

### Estrutura de Item

```typescript
interface ValueLadderItem {
  level: number;
  name: string;
  price: number;
  priceDisplay: string;
  tagline: string;
  status: string;
  metrics: Record<string, Metric>;
  unlockRequirements: UnlockRequirement[] | null;
  unlocksNext: UnlockTarget | null;
}

interface Metric {
  current: number;
  updatedAt: string | null;
}

interface UnlockRequirement {
  sourceLevel: number;
  metric: string;
  operator: string;
  value: number;
}

interface UnlockTarget {
  level: number;
  requirement: {
    metric: string;
    value: number;
  };
}
```

### Níveis Atuais

| Level | Nome | Preço | Requisitos para Desbloquear |
|-------|------|-------|----------------------------|
| 1 | Newsletter | Grátis | Nenhum (entrada) |
| 2 | Framework | R$ 997 | 500 subscribers |
| 3 | Mentoria | R$ 4.500 | 500 subscribers + 20 vendas |
| 4 | Agência | R$ 25k-80k | 500 subscribers + 20 vendas + 5 formados |

### Fluxo de Desbloqueio

```
Newsletter (ativo)
    │
    └──▶ 500 subscribers ──▶ Framework (pronto)
                                   │
                                   └──▶ 20 vendas ──▶ Mentoria (pronto)
                                                           │
                                                           └──▶ 5 formados ──▶ Agência
```

### Métricas por Nível

#### Level 1 - Newsletter
```json
{
  "subscribers": { "current": 0, "updatedAt": null },
  "emailsSent": { "current": 0, "updatedAt": null },
  "openRate": { "current": 0, "updatedAt": null }
}
```

#### Level 2 - Framework
```json
{
  "sales": { "current": 0, "updatedAt": null },
  "revenue": { "current": 0, "updatedAt": null }
}
```

#### Level 3 - Mentoria
```json
{
  "students": { "current": 0, "updatedAt": null },
  "graduated": { "current": 0, "updatedAt": null }
}
```

#### Level 4 - Agência
```json
{
  "projects": { "current": 0, "updatedAt": null },
  "revenue": { "current": 0, "updatedAt": null }
}
```

---

## Cases Documentados

### Case 1: Tay Dantas
- **Fonte**: YouTube (~30min)
- **Tema**: Branding para Creators
- **App**: Creator Brand OS (wizard 5 fases)
- **Metodologia**: Fundação → Ingrediente Secreto → Oceano Azul → Jornada do Herói → Motor de Comunidade

### Case 2: Eduardo Walneide
- **Fonte**: Instagram Reels (2:40)
- **Tema**: Visão do CEO
- **App**: Gerador de Organograma Hierárquico
- **Metodologia**: CEO Flow (Visão → 3 Braços → Setores → Lucro)

### Case 3: NEXORAMA
- **Fonte**: Texto viral (70 palavras)
- **Tema**: Produtividade Mental
- **App**: Sistema Operacional Humano + IA
- **Metodologia**: 5 sintomas → 5 hacks (Entropy-to-Order)

---

## Método NEXORAMA

### 4 Fases
1. **INGESTÃO** - Consumir conteúdo bruto
2. **DECOMPOSIÇÃO AOC** - Ação + Objeto + Condição
3. **ARQUITETURA** - Projetar fluxo de decisão
4. **CONSTRUÇÃO** - Criar Nexo App

### Decomposição AOC
```json
{
  "condição": "Quando/Se?",
  "ação": "Faça o quê?",
  "objeto": "Como/O quê especificamente?",
  "resultado": "Para quê?"
}
```

### Sistemas de Captação
| Tipo | Função | Quando Usar |
|------|--------|-------------|
| Afunilante | Estreita opções progressivamente | Muitos caminhos possíveis |
| Socrático | Revela o que usuário não sabia | Clarificar ambiguidade |
| Temporal | Mapeia no tempo | Depende de rotina/sequência |
| Espelho | Compara com modelo | Usuário não sabe descrever |

---

## Persistência (LocalStorage)

### Chave: `hub-metrics`

```json
{
  "1": {
    "subscribers": { "current": 150, "updatedAt": "2025-01-02" },
    "emailsSent": { "current": 4, "updatedAt": "2025-01-02" },
    "openRate": { "current": 45, "updatedAt": "2025-01-02" }
  },
  "2": {
    "sales": { "current": 0, "updatedAt": null },
    "revenue": { "current": 0, "updatedAt": null }
  }
}
```

As métricas são salvas localmente e restauradas no `init()` da aplicação.
