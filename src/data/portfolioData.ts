/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO DATA — edite APENAS este arquivo para trocar conteúdo.
 *  Todo texto visível é bilíngue: { pt: "...", en: "..." }.
 *  Marcação leve nos textos longos:
 *    **negrito**          → destaque com sublinhado pontilhado
 *    [texto](https://…)   → link com sublinhado pontilhado
 *  Links vazios ("") ficam ocultos no site até você preenchê-los.
 * ─────────────────────────────────────────────────────────────
 */

export type Lang = "pt" | "en";
export type Localized = Record<Lang, string>;
export type StackLogo = "gemini" | "google" | "code" | "cpu" | "cloud" | "ollama" | "chroma";

export interface SocialLink {
  id: "github" | "linkedin" | "whatsapp" | "email" | "instagram";
  label: string;
  href: string;
  /** Texto exibido/copiado (ex.: e-mail ou número) */
  handle: string;
}

export interface FeatureGroup {
  title: Localized;
  items: Localized[];
}

export interface FeaturedProject {
  slug: string;
  title: string;
  subtitle: Localized;
  description: Localized[];
  featuresLead: Localized;
  /** Tecnologias agrupadas por categoria */
  features: FeatureGroup[];
  closing: Localized;
  status: Localized;
  cta: Localized;
  /** Link do projeto. Vazio → o botão leva para o contato. */
  href: string;
  /** Caminho em /public (ex.: "/projects/armagedom.png"). Sem imagem → capa gerada. */
  image?: string;
  accent: string;
}

export interface WebProject {
  label: Localized;
  title: Localized;
  description: Localized;
  cta: Localized;
  /** Link do site no ar (opcional — vira o botão "Abrir site" na janela) */
  href: string;
  /** Capa do card (16:10) em /public */
  image?: string;
  /**
   * Print da página inteira (full page) em /public, ex.: "/sites/institucional-hd.webp".
   * Largura recomendada: 1440px, altura livre. Sem ele, mostra uma página de exemplo.
   */
  preview?: string;
  accent: string;
}

export interface Capability {
  icon: "brain" | "boxes" | "globe" | "workflow";
  title: Localized;
  description: Localized;
}

export interface SkillGroup {
  icon: "code" | "plug" | "database" | "brain";
  title: Localized;
  description: Localized;
  items: Localized[];
}

export interface Step {
  title: Localized;
  description: Localized;
}

export interface Milestone {
  title: Localized;
  description: Localized;
}

/** Atalho para itens iguais nos dois idiomas */
const same = (s: string): Localized => ({ pt: s, en: s });

/* ───────────────────────── PERFIL ───────────────────────── */

export const profile = {
  name: "Carlos Daniel Barbosa Reis",
  shortName: "Carlos Daniel",
  nickname: "CARLAOODAN",
  handle: "@carlaoodan",
  initials: "CD",
  /** Coloque sua foto em /public/avatar.jpg e defina "/avatar.jpg" aqui */
  avatar: "/avatar.webp" as string,
  role: {
    pt: "Dev autônomo · IA & Automação",
    en: "Freelance dev · AI & Automation",
  } satisfies Localized,
  headline: {
    pt: "Eu construo sistemas e ferramentas com Inteligência Artificial.",
    en: "I build systems and tools with Artificial Intelligence.",
  } satisfies Localized,
  bio: [
    {
      pt: "Meu contato com a tecnologia começou em **2024**. Comecei curioso, desmontando ferramentas para entender como funcionavam, e não parei mais.",
      en: "My journey with technology started in **2024**. I started out curious, taking tools apart to understand how they worked, and never stopped.",
    },
    {
      pt: "Desde então venho estudando desenvolvimento de sistemas, IA e automação. Hoje é o que eu mais gosto de fazer, e faço todos os dias.",
      en: "Since then I've been studying systems development, AI and automation. Today it's what I enjoy doing most, and I do it every day.",
    },
  ] satisfies Localized[],
  location: "Goiânia, GO",
  whatsapp: {
    display: "(62) 99525-2344",
    number: "5562995252344",
    message: {
      pt: "Olá, Carlos! Vi seu portfólio e tenho uma ideia para conversar.",
      en: "Hi Carlos! I saw your portfolio and have an idea I'd like to discuss.",
    } satisfies Localized,
  },
  email: "carlosdanielbarbosareis7c@gmail.com",
};

export const whatsappUrl = (lang: Lang): string =>
  `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(profile.whatsapp.message[lang])}`;

export const socials: SocialLink[] = [
  { id: "github", label: "GitHub", href: "https://github.com/spullxxx", handle: "spullxxx" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/carlos-daniel-18787b362/", handle: "in/carlos-daniel" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/carlaoodan/", handle: "@carlaoodan" },
  { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/${profile.whatsapp.number}`, handle: profile.whatsapp.display },
  { id: "email", label: "E-mail", href: `mailto:${profile.email}`, handle: profile.email },
];

/** Álbum/playlist do Spotify exibido no fim da página (link de compartilhamento) */
export const spotify = {
  url: "https://open.spotify.com/playlist/3Kve3OpYfszruJbW3kX8My?si=7mPAHpuMSva5OBt8T3quMg",
};

/** Só as redes com link preenchido */
export const activeSocials = socials.filter((s) => s.href);
/** Redes exibidas no topo (uma rede sem link aparece como "em breve") */
export const heroSocials = socials;

/* ───────────────────────── NAVEGAÇÃO ───────────────────────── */

export const navLinks: { id: string; label: Localized }[] = [
  { id: "sobre", label: { pt: "Sobre", en: "About" } },
  { id: "projetos", label: { pt: "Projetos", en: "Projects" } },
  { id: "ai-lab", label: same("AI Lab") },
  { id: "experiencia", label: { pt: "Experiência", en: "Experience" } },
  { id: "contato", label: { pt: "Contato", en: "Contact" } },
];

/* ───────────────────────── MINHA TRAJETÓRIA ───────────────────────── */

export const journey: Milestone[] = [
  {
    title: { pt: "Desde 2024", en: "Since 2024" },
    description: {
      pt: "Primeiros estudos, projetos e clientes.",
      en: "First studies, projects and clients.",
    },
  },
  {
    title: { pt: "Projetos autorais", en: "Original projects" },
    description: { pt: "Sistemas desenvolvidos do zero para explorar novas ideias.", en: "Systems built from scratch to explore new ideas." },
  },
  {
    title: { pt: "+30 projetos", en: "30+ projects" },
    description: {
      pt: "Sites, sistemas e automações entregues para clientes.",
      en: "Websites, systems and automations delivered to clients.",
    },
  },
  {
    title: { pt: "Aprendizado constante", en: "Constant learning" },
    description: {
      pt: "Sempre pesquisando novas tecnologias e maneiras melhores de construir.",
      en: "Always researching new technologies and better ways to build.",
    },
  },
];

/* ───────────────────────── PROJETOS ───────────────────────── */

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "armagedom",
    title: "ARMAGEDOM",
    subtitle: { pt: "Orquestração de Inteligência Artificial", en: "Artificial Intelligence Orchestration" },
    description: [
      {
        pt: "O ARMAGEDOM é um sistema de agentes de IA que roda direto no meu computador e faz trabalho real de engenharia de software: escreve código, revisa projetos e faz auditorias. Ele usa **RAG** para consultar minhas bases de conhecimento, que aparecem numa visualização 3D feita em Three.js.",
        en: "ARMAGEDOM is an AI agent system that runs directly on my computer and does real software engineering work: it writes code, reviews projects and runs audits. It uses **RAG** to query my knowledge bases, which are shown in a 3D visualization built with Three.js.",
      },
      {
        pt: "Ele só executa ações que eu autorizo e altera arquivos com mudanças pequenas, fáceis de revisar. Se um provedor de IA cai, ele troca sozinho entre modelos locais no Ollama e APIs na nuvem.",
        en: "It only runs actions I authorize and edits files through small changes that are easy to review. If an AI provider goes down, it switches on its own between local models on Ollama and cloud APIs.",
      },
      {
        pt: "Também controla o navegador, extrai dados de páginas e tem módulos de segurança para pentest e varredura de vulnerabilidades. A memória fica salva em ChromaDB e SQLite, então ele lembra do que já fez.",
        en: "It also drives the browser, extracts data from pages and has security modules for pentesting and vulnerability scanning. Its memory is stored in ChromaDB and SQLite, so it remembers what it has already done.",
      },
    ],
    featuresLead: { pt: "Principais recursos:", en: "Key features:" },
    features: [
      {
        title: { pt: "IA & Busca", en: "AI & Search" },
        items: [
          { pt: "RAG / Busca semântica", en: "RAG / Semantic search" },
          { pt: "Constelação 3D (Three.js)", en: "3D constellation (Three.js)" },
          { pt: "Automação de navegador", en: "Browser automation" },
        ],
      },
      {
        title: { pt: "Modelos", en: "Models" },
        items: [same("Ollama"), { pt: "APIs em nuvem", en: "Cloud APIs" }, { pt: "Failover multi-provedor", en: "Multi-provider failover" }],
      },
      {
        title: { pt: "Segurança", en: "Security" },
        items: [
          { pt: "Constituição de autorização", en: "Authorization constitution" },
          { pt: "Mutações por diff", en: "Diff-based changes" },
          same("Pentest"),
          { pt: "Varredura de vulnerabilidades", en: "Vulnerability scanning" },
        ],
      },
      {
        title: { pt: "Memória & Dados", en: "Memory & Data" },
        items: [same("ChromaDB"), same("SQLite"), { pt: "Grafos de habilidades", en: "Skill graphs" }],
      },
    ],
    closing: {
      pt: "Na prática, é o laboratório onde eu testo agentes antes de usá-los em projetos.",
      en: "In practice, it's the lab where I test agents before using them in projects.",
    },
    status: { pt: "Funcional e em evolução", en: "Working & evolving" },
    cta: { pt: "Conhecer o projeto", en: "Explore the project" },
    /** Página com o estudo de caso detalhado (vazio → "Estudo de caso em breve") */
    href: "",
    image: "/projects/armagedom.webp",
    accent: "#ef4444",
  },
  {
    slug: "odan",
    title: "ODAN",
    subtitle: { pt: "Do teclado e mouse para um controle virtual.", en: "From keyboard and mouse to a virtual controller." },
    description: [
      {
        pt: "O ODAN transforma teclado e mouse num controle virtual para jogos de PC. Foi feito em **C# (.NET)** com WPF e calibra a resposta de cada comando em tempo real.",
        en: "ODAN turns keyboard and mouse into a virtual controller for PC games. It's built in **C# (.NET)** with WPF and calibrates each input's response in real time.",
      },
      {
        pt: "A interface mostra uma réplica 3D do controle, renderizada com DirectX (SharpDX) e modelos importados via Assimp, que reage na hora a cada botão.",
        en: "The interface shows a 3D replica of the controller, rendered with DirectX (SharpDX) and models imported through Assimp, reacting instantly to every button.",
      },
      {
        pt: "Cada botão, gatilho e direcional tem sua própria física. Com o jogo aberto, o ODAN vai para segundo plano e reduz o uso da GPU para não derrubar o FPS.",
        en: "Every button, trigger and d-pad has its own physics. While a game is running, ODAN moves to the background and cuts GPU usage so it doesn't drop the FPS.",
      },
    ],
    featuresLead: { pt: "Principais recursos:", en: "Key features:" },
    features: [
      {
        title: { pt: "Stack", en: "Stack" },
        items: [same("C# (.NET)"), same("WPF"), same("ViGEmBus")],
      },
      {
        title: { pt: "Gráficos 3D", en: "3D Graphics" },
        items: [
          same("DirectX (SharpDX)"),
          { pt: "Importação via Assimp", en: "Assimp model import" },
          { pt: "Iluminação física", en: "Physically based lighting" },
          same("MSAA 2x"),
          same("SSAO"),
        ],
      },
      {
        title: { pt: "Física & Input", en: "Physics & Input" },
        items: [
          { pt: "Física vetorial por botão", en: "Per-button vector physics" },
          { pt: "Gatilhos analógicos", en: "Analog triggers" },
          { pt: "Direcional (DPad)", en: "Directional pad (DPad)" },
          { pt: "Resposta em tempo real", en: "Real-time response" },
        ],
      },
      {
        title: { pt: "Performance", en: "Performance" },
        items: [
          { pt: "Gerenciamento de GPU", en: "GPU management" },
          { pt: "Modo segundo plano", en: "Background mode" },
          { pt: "Prioridade de FPS do jogo", en: "Game FPS priority" },
        ],
      },
    ],
    closing: {
      pt: "Começou como um experimento para entender como os jogos leem dispositivos de entrada.",
      en: "It started as an experiment to understand how games read input devices.",
    },
    status: { pt: "Funcional", en: "Working" },
    cta: { pt: "Conhecer o projeto", en: "Explore the project" },
    /** Página com o estudo de caso detalhado (vazio → "Estudo de caso em breve") */
    href: "",
    image: "/projects/odan.webp",
    accent: "#06b6d4",
  },
];

export const webProjectsIntro = {
  label: { pt: "Projetos Web", en: "Web Projects" } satisfies Localized,
  title: {
    pt: "Sites feitos para vender.",
    en: "Websites built to sell.",
  } satisfies Localized,
  description: {
    pt: "Também desenvolvo sites para empresas e profissionais: rápidos, bem apresentados e com um objetivo claro.",
    en: "I also build websites for companies and professionals: fast, well presented and with a clear goal.",
  } satisfies Localized,
};

export const webProjects: WebProject[] = [
  {
    label: { pt: "Projeto 01", en: "Project 01" },
    title: { pt: "Site Institucional", en: "Corporate Website" },
    description: {
      pt: "Uma presença digital criada para apresentar uma empresa, seus serviços e sua identidade de maneira profissional.",
      en: "A digital presence built to present a company, its services and its identity in a professional way.",
    },
    cta: { pt: "Ver prévia", en: "View preview" },
    href: "", // TODO
    image: "/sites/institucional-hd.webp",
    preview: "/sites/institucional-hd.webp",
    accent: "#f59e0b",
  },
  {
    label: { pt: "Projeto 02", en: "Project 02" },
    title: same("Landing Page"),
    description: {
      pt: "Página construída com foco em apresentação, comunicação e conversão.",
      en: "A page built with a focus on presentation, communication and conversion.",
    },
    cta: { pt: "Ver prévia", en: "View preview" },
    href: "", // TODO
    image: "/sites/landing-page-hd.webp",
    preview: "/sites/landing-page-hd.webp",
    accent: "#8b5cf6",
  },
  {
    label: { pt: "Projeto 03", en: "Project 03" },
    title: { pt: "Experiência Web", en: "Web Experience" },
    description: {
      pt: "Projeto com maior foco visual e interativo, utilizando animações, interfaces modernas e elementos diferenciados.",
      en: "A more visual and interactive project, using animations, modern interfaces and distinctive elements.",
    },
    cta: { pt: "Ver prévia", en: "View preview" },
    href: "", // TODO
    image: "/sites/experiencia-web-hd.webp",
    preview: "/sites/experiencia-web-hd.webp",
    accent: "#ef4444",
  },
];

/* ───────────────────────── O QUE EU CONSTRUO ───────────────────────── */

export const capabilities: Capability[] = [
  {
    icon: "brain",
    title: { pt: "Inteligência Artificial", en: "Artificial Intelligence" },
    description: {
      pt: "Assistentes e agentes que consultam seus dados e executam tarefas.",
      en: "Assistants and agents that query your data and get tasks done.",
    },
  },
  {
    icon: "boxes",
    title: { pt: "Sistemas", en: "Systems" },
    description: {
      pt: "Ferramentas sob medida para resolver um problema específico do seu negócio.",
      en: "Custom tools built to solve a specific problem in your business.",
    },
  },
  {
    icon: "globe",
    title: { pt: "Desenvolvimento Web", en: "Web Development" },
    description: {
      pt: "Sites rápidos e bem apresentados, feitos para vender.",
      en: "Fast, well-presented websites built to sell.",
    },
  },
  {
    icon: "workflow",
    title: { pt: "Automação", en: "Automation" },
    description: {
      pt: "Processos repetitivos rodando sozinhos, com seus serviços conectados.",
      en: "Repetitive processes running on their own, with your services connected.",
    },
  },
];

/* ───────────────────────── AI LAB ───────────────────────── */

export const aiLab = {
  label: same("AI Lab"),
  title: {
    pt: "Meu laboratório de experimentação com Inteligência Artificial.",
    en: "My experimentation lab for Artificial Intelligence.",
  } satisfies Localized,
  intro: {
    pt: "Onde eu testo novas formas de trabalhar com Inteligência Artificial.",
    en: "Where I test new ways of working with Artificial Intelligence.",
  } satisfies Localized,
  goalsLead: {
    pt: "Sistemas de IA capazes de:",
    en: "AI systems capable of:",
  } satisfies Localized,
  goals: [
    { pt: "manter contexto e memória", en: "keeping context and memory" },
    { pt: "recuperar conhecimento relevante", en: "retrieving relevant knowledge" },
    { pt: "consultar documentos", en: "querying documents" },
    { pt: "utilizar ferramentas", en: "using tools" },
    { pt: "executar tarefas", en: "executing tasks" },
    { pt: "colaborar entre agentes", en: "collaborating across agents" },
  ] satisfies Localized[],
  /** Faixa inferior "STACK" (marquee lento) */
  stack: [
    { label: same("Gemini"), logo: "gemini" },
    { label: same("Google AI Pro"), logo: "google" },
    { label: same("AI Coding"), logo: "code" },
    { label: { pt: "Modelos Locais", en: "Local Models" }, logo: "cpu" },
    { label: { pt: "APIs de LLMs", en: "LLM APIs" }, logo: "cloud" },
    { label: same("Ollama"), logo: "ollama" },
    { label: same("ChromaDB"), logo: "chroma" },
  ] satisfies { label: Localized; logo: StackLogo }[],
};

/* ───────────────────────── TECNOLOGIAS ───────────────────────── */

export const skillGroups: SkillGroup[] = [
  {
    icon: "code",
    title: { pt: "Linguagens", en: "Languages" },
    description: {
      pt: "Base utilizada para desenvolvimento de sistemas, interfaces, automações e aplicações.",
      en: "The foundation for building systems, interfaces, automations and applications.",
    },
    items: ["Python", "Java", "JavaScript", "HTML", "CSS"].map(same),
  },
  {
    icon: "plug",
    title: { pt: "Integrações & Desenvolvimento", en: "Integrations & Development" },
    description: {
      pt: "Construção de soluções conectadas, automações e integração entre diferentes serviços.",
      en: "Building connected solutions, automations and integrations between different services.",
    },
    items: [
      same("Git"),
      same("GitHub"),
      same("APIs REST"),
      { pt: "Integração de sistemas", en: "Systems integration" },
      { pt: "Automação", en: "Automation" },
      same("Webhooks"),
      same("Scripts"),
    ],
  },
  {
    icon: "database",
    title: { pt: "Dados & Recuperação", en: "Data & Retrieval" },
    description: {
      pt: "Estruturas voltadas para armazenamento, organização e recuperação inteligente de informação.",
      en: "Structures for storing, organizing and intelligently retrieving information.",
    },
    items: [
      same("SQLite"),
      { pt: "Banco vetorial", en: "Vector database" },
      same("Embeddings"),
      { pt: "Busca semântica", en: "Semantic search" },
      { pt: "Indexação", en: "Indexing" },
      { pt: "Recuperação de conhecimento", en: "Knowledge retrieval" },
    ],
  },
  {
    icon: "brain",
    title: { pt: "IA Aplicada", en: "Applied AI" },
    description: {
      pt: "Arquiteturas de IA voltadas para contexto, recuperação de conhecimento, agentes e execução de tarefas.",
      en: "AI architectures focused on context, knowledge retrieval, agents and task execution.",
    },
    items: [
      same("RAG"),
      same("GraphRAG"),
      { pt: "Agentes de IA", en: "AI agents" },
      { pt: "Modelos locais", en: "Local models" },
      { pt: "Orquestração", en: "Orchestration" },
      { pt: "Memória para agentes", en: "Agent memory" },
    ],
  },
];

/* ───────────────────────── COMO EU TRABALHO ───────────────────────── */

export const process: Step[] = [
  { title: { pt: "Entendo", en: "Understand" }, description: { pt: "Primeiro procuro entender o problema.", en: "First I try to understand the problem." } },
  { title: { pt: "Pesquiso", en: "Research" }, description: { pt: "Analiso tecnologias e possíveis soluções.", en: "I analyze technologies and possible solutions." } },
  { title: { pt: "Estruturo", en: "Structure" }, description: { pt: "Defino como o sistema pode funcionar.", en: "I define how the system can work." } },
  { title: { pt: "Construo", en: "Build" }, description: { pt: "Transformo a ideia em algo funcional.", en: "I turn the idea into something that works." } },
  { title: { pt: "Testo", en: "Test" }, description: { pt: "Procuro erros, limitações e maneiras de melhorar.", en: "I look for bugs, limitations and ways to improve." } },
  { title: { pt: "Evoluo", en: "Evolve" }, description: { pt: "O projeto continua melhorando conforme novas ideias surgem.", en: "The project keeps improving as new ideas come up." } },
];

/* ───────────────────────── EXPERIÊNCIA ───────────────────────── */

export const experience = {
  role: { pt: "Desenvolvedor autônomo", en: "Freelance developer" } satisfies Localized,
  paragraphs: [
    {
      pt: "Aprendi tecnologia na prática, estudando por conta própria e entregando projetos para clientes.",
      en: "I learned technology through practice, studying on my own and delivering projects for clients.",
    },
    {
      pt: "Já entreguei **mais de 30 projetos** entre sites, sistemas e automações, trabalhando direto com clientes e em projetos autorais. Cada vez mais, com Inteligência Artificial.",
      en: "I've delivered **30+ projects** across websites, systems and automations, working directly with clients and on my own projects. More and more, with Artificial Intelligence.",
    },
    {
      pt: "Grande parte das oportunidades surgiu através de prospecção, indicação e contato direto com pessoas interessadas nos meus serviços.",
      en: "Most opportunities came through prospecting, referrals and direct contact from people interested in my services.",
    },
  ] satisfies Localized[],
  skillsLead: {
    pt: "Essa experiência me ensinou a lidar com:",
    en: "This experience taught me how to handle:",
  } satisfies Localized,
  skills: [
    { pt: "Clientes", en: "Clients" },
    { pt: "Comunicação", en: "Communication" },
    { pt: "Prospecção", en: "Prospecting" },
    { pt: "Vendas", en: "Sales" },
    { pt: "Negociação", en: "Negotiation" },
    { pt: "Entrega de projetos", en: "Project delivery" },
    { pt: "Levantamento de requisitos", en: "Requirements gathering" },
  ] satisfies Localized[],
};

export const beyondCode = {
  paragraphs: [
    {
      pt: "Também tenho experiência com **edição de vídeo** e criação de conteúdo digital.",
      en: "I also have experience with **video editing** and digital content creation.",
    },
    {
      pt: "Esse lado criativo acabou influenciando minha forma de desenvolver interfaces e apresentar projetos.",
      en: "That creative side ended up shaping the way I build interfaces and present projects.",
    },
  ] satisfies Localized[],
  quote: [
    { pt: "Um sistema precisa funcionar bem.", en: "A system needs to work well." },
    {
      pt: "Mas também precisa ser fácil de entender e agradável de utilizar.",
      en: "But it also needs to be easy to understand and pleasant to use.",
    },
  ] satisfies Localized[],
};

export const studying = {
  intro: [
    { pt: "Tecnologia muda rápido.", en: "Technology changes fast." },
    { pt: "É exatamente isso que me interessa.", en: "That's exactly what interests me." },
  ] satisfies Localized[],
  lead: {
    pt: "Atualmente continuo aprofundando meus conhecimentos principalmente em:",
    en: "I'm currently deepening my knowledge mainly in:",
  } satisfies Localized,
  topics: [
    { pt: "Inteligência Artificial", en: "Artificial Intelligence" },
    { pt: "Agentes", en: "Agents" },
    same("RAG / GraphRAG"),
    { pt: "Engenharia de Software", en: "Software Engineering" },
    same("Backend"),
    { pt: "Arquitetura de Sistemas", en: "Systems Architecture" },
  ] satisfies Localized[],
};

export const whatsNext: Localized[] = [
  {
    pt: "O próximo passo é iniciar minha **graduação** e levar meus projetos para um nível cada vez mais complexo.",
    en: "The next step is starting my **degree** and taking my projects to an increasingly complex level.",
  },
  {
    pt: "Quero que o que eu estudo vire coisa que as pessoas usam.",
    en: "I want what I study to turn into things people actually use.",
  },
];

/* ───────────────────────── TEXTOS DE INTERFACE ───────────────────────── */

export const ui = {
  available: { pt: "Disponível para projetos", en: "Available for work" },
  contactBtn: { pt: "Contatar", en: "Contact" },
  seeProjects: { pt: "Ver projetos", en: "See projects" },
  getInTouch: { pt: "Entrar em contato", en: "Get in touch" },
  copy: { pt: "Copiar", en: "Copy" },
  close: { pt: "Fechar", en: "Close" },
  menu: { pt: "Menu", en: "Menu" },
  soon: { pt: "em breve", en: "coming soon" },
  copied: { pt: "Copiado para a área de transferência", en: "Copied to clipboard" },
  myJourney: { pt: "Minha trajetória", en: "My journey" },
  featured: { pt: "Projetos em destaque", en: "Featured projects" },
  status: { pt: "Status", en: "Status" },
  hoverToScroll: { pt: "Passe o mouse para rolar", en: "Hover to scroll" },
  openSite: { pt: "Abrir site", en: "Open site" },
  caseSoon: { pt: "Estudo de caso em breve", en: "Case study coming soon" },
  build: { pt: "O que eu construo", en: "What I build" },
  technologies: { pt: "Tecnologias", en: "Technologies" },
  technologiesSub: {
    pt: "Ferramentas e arquiteturas que fazem parte do meu processo de desenvolvimento.",
    en: "Tools and architectures that are part of my development process.",
  },
  stack: { pt: "stack", en: "stack" },
  soundtrack: { pt: "Trilha sonora enquanto codo", en: "Coding soundtrack" },
  playMusic: { pt: "Tocar trilha sonora", en: "Play soundtrack" },
  pauseMusic: { pt: "Pausar trilha sonora", en: "Pause soundtrack" },
  howIWork: { pt: "Como eu trabalho", en: "How I work" },
  experience: { pt: "Experiência", en: "Experience" },
  beyondCode: { pt: "Além do código", en: "Beyond code" },
  studyingNow: { pt: "Estudando agora", en: "Studying now" },
  whatsNext: { pt: "O que vem depois", en: "What's next" },
  contact: { pt: "Contato", en: "Contact" },
  haveIdea: { pt: "Tem uma ideia?", en: "Got an idea?" },
  haveIdeaSub: {
    pt: "Talvez eu consiga transformá-la em alguma coisa.",
    en: "Maybe I can turn it into something.",
  },
  name: { pt: "Nome", en: "Name" },
  email: { pt: "E-mail", en: "Email" },
  message: { pt: "Mensagem", en: "Message" },
  namePh: { pt: "Seu nome", en: "Your name" },
  emailPh: { pt: "voce@empresa.com", en: "you@company.com" },
  messagePh: { pt: "Conte um pouco sobre a sua ideia…", en: "Tell me a bit about your idea…" },
  send: { pt: "Enviar mensagem", en: "Send message" },
  sending: { pt: "Enviando…", en: "Sending…" },
  sent: { pt: "Mensagem enviada! Respondo em breve.", en: "Message sent! I'll reply soon." },
  sendError: { pt: "Não foi possível enviar. Tente pelo WhatsApp.", en: "Could not send. Try WhatsApp instead." },
  errName: { pt: "Informe seu nome (mín. 2 letras).", en: "Enter your name (min. 2 letters)." },
  errEmail: { pt: "Informe um e-mail válido.", en: "Enter a valid email." },
  errMessage: { pt: "Escreva ao menos 10 caracteres.", en: "Write at least 10 characters." },
  rights: { pt: "Todos os direitos reservados.", en: "All rights reserved." },
  backToTop: { pt: "Voltar ao topo", en: "Back to top" },
} satisfies Record<string, Localized>;
