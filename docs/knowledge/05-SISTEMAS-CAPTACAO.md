# Sistemas de Captação

> Padrões de interface que extraem contexto do usuário enquanto entregam valor

---

## Definição

Sistemas de Captação são **padrões de UI** projetados para coletar informações do usuário de forma natural, enquanto ele recebe valor. Não são formulários passivos — são experiências interativas.

---

## Os 4 Captadores

### 1. CAPTADOR AFUNILANTE

| Campo | Valor |
|-------|-------|
| Função | Cada resposta estreita as opções seguintes |
| Quando usar | Quando há muitos caminhos possíveis |

**Exemplo:**
```
Tela 1: Qual seu maior desafio?
    ↓
Tela 2: Quando esse desafio mais atrapalha?
    ↓
Tela 3: Protocolo personalizado para SEU contexto
```

**Visualização:**
```
    ┌─────────────────────────┐
    │    Todas as opções      │
    └───────────┬─────────────┘
                ▼
        ┌───────────────┐
        │  Filtrado 1   │
        └───────┬───────┘
                ▼
          ┌─────────┐
          │Final   │
          └─────────┘
```

**Casos de Uso:**
- Diagnósticos iniciais
- Seleção de plano/produto
- Onboarding de usuário

---

### 2. CAPTADOR SOCRÁTICO

| Campo | Valor |
|-------|-------|
| Função | Perguntas que revelam o que o usuário não sabia que sabia |
| Quando usar | Quando precisa clarificar ambiguidade |

**Exemplo:**
```
Você disse que quer ser "mais produtivo".

O que significa produtivo pra você?
[ ] Fazer MAIS coisas
[ ] Fazer as coisas CERTAS
[ ] Ter mais ENERGIA
[ ] Ter mais TEMPO livre
```

**Técnica:**
1. Identificar termo ambíguo
2. Oferecer interpretações possíveis
3. Usuário escolhe SUA definição
4. Sistema usa definição específica

**Casos de Uso:**
- Definição de objetivos
- Clarificação de valores
- Descoberta de preferências ocultas

---

### 3. CAPTADOR TEMPORAL

| Campo | Valor |
|-------|-------|
| Função | Mapeia a realidade do usuário no tempo |
| Quando usar | Quando o contexto depende de rotina/sequência |

**Exemplo:**
```
┌────────────────────────────────────────────┐
│  6h    9h    12h    15h    18h    21h      │
│  ═══════════════════════════════════════   │
│  [Acordar]  [Trabalho]  [Família]  [Sono]  │
│                                            │
│  Arraste para marcar:                      │
│  🟢 Energia Alta  🟡 Média  🔴 Baixa       │
└────────────────────────────────────────────┘
```

**Técnica:**
1. Apresentar timeline visual
2. Usuário marca eventos/estados
3. Sistema identifica padrões
4. Recomendações baseadas em contexto temporal

**Casos de Uso:**
- Planejamento de rotina
- Análise de hábitos
- Identificação de janelas de produtividade

---

### 4. CAPTADOR ESPELHO

| Campo | Valor |
|-------|-------|
| Função | Mostra um padrão, usuário identifica diferenças |
| Quando usar | Quando o usuário não sabe descrever do zero |

**Exemplo:**
```
Fluxo típico de criação de conteúdo:

1. [✓] Ter ideia
2. [✓] Pesquisar
3. [?] Estruturar ← CLIQUE SE TRAVA AQUI
4. [✓] Escrever
5. [?] Revisar   ← CLIQUE SE TRAVA AQUI
6. [✓] Publicar

Marque onde você TRAVA:
```

**Técnica:**
1. Apresentar modelo "ideal" ou "comum"
2. Usuário compara com sua realidade
3. Sistema identifica GAPs
4. Foco nas diferenças, não em descrever tudo

**Casos de Uso:**
- Diagnóstico de processos
- Identificação de gargalos
- Comparação com benchmarks

---

## Quando Usar Cada Captador

| Situação | Captador Recomendado |
|----------|---------------------|
| Muitas opções possíveis | Afunilante |
| Termo ambíguo/subjetivo | Socrático |
| Depende de rotina/tempo | Temporal |
| Usuário não sabe descrever | Espelho |

---

## Combinações Comuns

### Afunilante + Socrático
Primeiro afunila categoria, depois clarifica definição.
```
1. Qual área? [Trabalho] [Saúde] [Relacionamento]
2. (se Trabalho) O que significa "sucesso profissional" pra você?
```

### Temporal + Espelho
Mostra padrão temporal ideal, usuário marca diferenças.
```
1. Aqui está uma rotina matinal produtiva típica
2. Marque o que você NÃO faz ou faz diferente
```

### Socrático + Afunilante
Primeiro clarifica, depois afunila com base na clarificação.
```
1. "Felicidade" pra você é [Realização] [Paz] [Conexão]?
2. (se Realização) Em que área? [Carreira] [Criativo] [Impacto]
```

---

## Princípios de Design

### 1. Valor a Cada Passo
Cada tela deve entregar algo útil, não só coletar dados.

### 2. Progressão Visual
Usuário deve VER que está avançando (barra de progresso, contagem de passos).

### 3. Opções, Não Campos Abertos
Sempre que possível, ofereça escolhas em vez de campos de texto.

### 4. Feedback Imediato
Após cada escolha, mostre como isso afeta o resultado final.

### 5. Escape Route
Sempre ter opção "Nenhuma das anteriores" ou "Outro".

---

## Métricas de Sucesso

| Métrica | Meta |
|---------|------|
| Taxa de conclusão | > 80% |
| Tempo médio por tela | < 30 segundos |
| Satisfação com resultado | > 4/5 |
| Retorno para usar novamente | > 50% |
