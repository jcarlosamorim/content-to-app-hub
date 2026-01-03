# NEXORAMA - Content-to-App Hub

> Centro de comando visual para o projeto Content-to-App

## Visão Geral

O **NEXORAMA Hub** é uma aplicação web que serve como dashboard para gerenciar e visualizar o progresso do projeto Content-to-App. Transforma conteúdo em sistemas de IA através de uma metodologia estruturada.

### Links

| Ambiente | URL |
|----------|-----|
| Local | http://localhost:5500 |
| Produção | https://hub-jet-chi.vercel.app |
| GitHub | https://github.com/jcarlosamorim/content-to-app-hub |

## Stack Técnica

| Tecnologia | Uso |
|------------|-----|
| HTML5 | Estrutura |
| Alpine.js 3.x | Reatividade |
| CSS Custom Properties | Design Tokens |
| Inter Font | Tipografia |
| LocalStorage | Persistência de métricas |

**Decisão de Stack**: Zero dependências de build, deploy instantâneo, fácil de editar.

## Estrutura de Arquivos

```
hub/
├── index.html      # Aplicação completa (HTML + CSS + JS)
├── data.json       # Dados de épicas, stories e value ladder
├── .gitignore      # Arquivos ignorados
├── .vercel/        # Configuração Vercel
└── docs/           # Documentação
    ├── README.md           # Este arquivo
    ├── ARCHITECTURE.md     # Arquitetura técnica
    ├── COMPONENTS.md       # Componentes e funcionalidades
    ├── DATA-STRUCTURE.md   # Estrutura de dados
    └── DESIGN-SYSTEM.md    # Design system
```

## Features Principais

### 1. Sidebar de Navegação
- Épicas expansíveis com contador de progresso
- Stories com status visual (done, in_progress, pending)
- Toggle dark/light mode

### 2. Value Ladder
- 4 níveis de produtos com sistema de desbloqueio
- Métricas editáveis via modal
- Progresso visual com barras animadas

### 3. Visualização de Stories
- Breadcrumb de navegação
- Minds consultadas (mentores virtuais)
- Conteúdo estruturado em cards

### 4. Dashboard Home
- Estatísticas gerais (épicas, stories, progresso)
- Visão geral de todas as épicas

## Como Executar Localmente

```bash
# Opção 1: Python
cd hub && python3 -m http.server 5500

# Opção 2: Node.js
cd hub && npx serve -p 5500

# Opção 3: VS Code Live Server
# Abra index.html e use a extensão Live Server
```

## Documentação Detalhada

- [Arquitetura Técnica](./ARCHITECTURE.md)
- [Componentes e Funcionalidades](./COMPONENTS.md)
- [Estrutura de Dados](./DATA-STRUCTURE.md)
- [Design System](./DESIGN-SYSTEM.md)

## Conceito: NEXORAMA

O método NEXORAMA transforma conteúdo bruto (vídeos, textos, podcasts) em sistemas de IA interativos através de 4 fases:

1. **INGESTÃO** - Consumir e processar conteúdo bruto
2. **DECOMPOSIÇÃO AOC** - Quebrar em Ação + Objeto + Condição
3. **ARQUITETURA** - Projetar fluxo de decisão
4. **CONSTRUÇÃO** - Criar experiência interativa

---

*Última atualização: Janeiro 2025*
*Versão: 2.0*
