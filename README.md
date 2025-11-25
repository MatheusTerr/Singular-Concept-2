# Singular — Blueprint Mestre (Branding + Landing)

Documento de referência para IA ou time de produto entender a marca, a copy e a estrutura completa da landing v1.0.

## Identidade da Marca
- Conceito: Ethereal Tech — boutique de IA (não software house).
- Arquétipos: Mago (transformação) + Governante (controle/ordem).
- Slogan: “A Inteligência, Orquestrada.”
- Voz: precisa, estratégica, com aura de laboratório premium.
- Símbolo “O Elo”: hexágono minimalista com vértices conectados (colmeia / grafeno).
- Paleta Deep Mode: Void Black #0A0A0B (fundo), Singular Blue #2563EB → #60A5FA (gradientes), Pure Data #F8FAFC (texto), Glass rgba(255,255,255,0.03) para cards.
- Tipografia: Syne para títulos; Inter para corpo.

## Estrutura do Site (âncoras)
1) Hero `#home`
   - Eyebrow: “Boutique de Inteligência Artificial”
   - Headline: “Orquestre a Inteligência.”
   - Subheadline: “Da engenharia de prompts avançada aos agentes autônomos que operam enquanto você dorme. A Singular implementa o futuro no seu presente.”
   - CTAs: “Agendar Diagnóstico Grátis” (primário) e “Conhecer Soluções” (secundário).
   - Chips-promessa: Zero Lag Policy; Agnósticos: GPT-4, Claude 3.5, Gemini Pro; Dados blindados.
   - Visual: orbe central com anéis e satélites; stats em glass (Slogan, Arquétipo, Foco).

2) Filosofia `#about`
   - Título: “O Fim da Era Manual.”
   - Copy: Sistemas Cognitivos para vantagem injusta (escala infinita, custo marginal zero).
   - Cards glass:
     * Agnósticos — “Modelo certo, tarefa certa.” (GPT-4, Claude 3.5, Gemini Pro, ensembles).
     * Privacidade — “Dados blindados.” (guardrails, isolamento, trilha de auditoria).
     * Governança — “Controle e ordem.” (segurança, compliance, confiabilidade).

3) Soluções `#solutions` (Método Adapta)
   - Card 1: “Engenharia de Prompts 4I's.” Copy: framework proprietário (Intenção, Instrução, Input, Iteração) e 16 variáveis de controle. Público: Marketing, RH, Comercial.
   - Card 2: “Agentes Autônomos 24/7.” Copy: agentes offline em servidores seguros, fluxos complexos (e-mails, notas, CRM) mesmo com PC desligado. Público: Operações, Logística, Financeiro.
   - Card 3: “Gestão Aumentada (Executive OS).” Copy: “Novo Pacote Office” para CEOs/Advogados; análises contratuais em segundos; reset do trabalho manual. Público: C-Level, Sócios, Diretores.

4) Futuro `#future`
   - Título: “Projeto Colmeia Neural (Alpha).”
   - Copy: consenso entre múltiplos modelos debatendo problemas em tempo real; “Em breve disponível para clientes select.”
   - CTA: “Entrar na Lista de Espera.”
   - Visual: núcleo luminoso com três esferas em órbitas.

5) Contato `#contact`
   - Título: “Fale com a Singular.”
   - Copy: diagnóstico gratuito para mapear desafios e propor arquitetura.
   - Form fields: Nome, Empresa, E-mail Corporativo, Desafio Atual + botão “Enviar”.

6) Rodapé
   - Marca + slogan “Powered by Biological & Artificial Intelligence.”
   - Links: Início, Filosofia, Soluções, Futuro. Espaço para LinkedIn e Manifesto.
   - Nota: “© 2025 Singular Tech. A Inteligência, Orquestrada.”

## Diretrizes Visuais (como implementado)
- Fundo: gradientes azuis sobre Void Black, noise sutil.
- Glassmorphism: cards com vidro fosco, borda clara, blur e glow azul no hover.
- Botões: primário em gradiente Singular Blue com glow; secundário ghost em vidro.
- Texto destaque: gradiente azul (bg-clip-text).
- Layout: nav fixa glass com blur; hero centralizado; grids responsivos para cards; mínima altura do hero ~90vh.

## Interações e Motion
- Canvas neural network: partículas conectadas (≈92 nós desktop, ≈24 mobile) com linhas reativas.
- Cursor magnético (desktop only): dot + ring que ampliam em hover de botões/links; desativado em touch (media hover:none).
- Scroll: IntersectionObserver adiciona classe `in-view` para fade/translate; nav ativa link da seção corrente.
- Nav mobile: toggle abre/fecha menu glass.
- Hover: glass cards elevam e ganham glow; botões levemente escalam e brilham.

## Stack atual e sugerida
- Atual: HTML estático (`index.html`), CSS custom (`styles.css`), JS vanilla (`scripts.js`).
- Sugerido para produto: Next.js + TypeScript + TailwindCSS (tokens para paleta/glass/buttons) + Framer Motion (entradas/staggers) + Canvas/Three.js se evoluir partículas. Formular com validação (React Hook Form + Zod) e endpoint/CRM.

## Uso rápido
- Abrir `index.html` em um navegador para visualizar a landing estática. Custom cursor só em desktop; em mobile ele oculta automaticamente.
- Ajustar links de LinkedIn/Manifesto no rodapé conforme necessário.
