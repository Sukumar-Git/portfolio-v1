import { Project, ExperienceEntry, EducationEntry } from './types';

export const NEXUS_AI: Project = {
  id: 'nexus-ai',
  title: 'NEXUS AI',
  version: 'v0.4 (In Progress)',
  year: '2026',
  problem: 'Teams lose hours switching between disconnected tools just to finish one AI-assisted task start to finish.',
  solution: 'One workspace that pulls context automatically and keeps every step — research, drafting, review — in a single cohesive thread.',
  architecture: ['Frontend (React)', 'Backend (Node / REST APIs)', 'Database (MongoDB)', 'Cloud (Pending Cloud Deployment)', 'External APIs (Gemini Pro / LLM Ingress)'],
  features: [
    'Automatic context pulling from workspace threads',
    'Integrated document editor & scratchpad adjacent to AI chat',
    'One-click workflow transitions (Research → Draft → Revise)',
    'Session history snapshotting & sharing with workspace members'
  ],
  challenges: 'Managing complex asynchronous state streams when chaining multiple sub-agents, combined with ensuring the reactive editor state stayed in sync without lag or cursor jumping.',
  lessonsLearned: 'Staggering API request flows and using debounced optimistic updates is critical for a smooth rich-text AI interaction.',
  tech: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Docker']
};

export const OTHER_PROJECTS: Project[] = [
  {
    id: 'nexus-extension',
    title: 'NEXUS BROWSER EXTENSION',
    year: '2025',
    problem: 'Grabbing webpage context and injecting it into AI workflows required constant copy-pasting across browser windows.',
    solution: 'A native companion browser extension that captures current tab text, parses schemas, and hot-syncs it directly to the Nexus AI web app.',
    architecture: ['Chrome Extension API', 'Content Scripts', 'WebSocket Sync', 'Nexus AI Core'],
    features: [
      'One-click webpage visual region selection',
      'Local metadata extractor & DOM flattener',
      'Real-time clipboard synchronization'
    ],
    challenges: 'Bypassing strict Content Security Policies (CSP) on enterprise domains while securely streaming parsed payloads in real-time.',
    lessonsLearned: 'Utilizing non-invasive background service workers to broker external payloads is the safest way to maintain cross-domain security.',
    tech: ['JavaScript', 'Chrome Extension API', 'WebSockets', 'Tailwind']
  },
  {
    id: 'expense-tracker',
    title: 'EXPENSE TRACKER',
    year: '2025',
    problem: 'Budget tracking apps are over-designed, require intrusive banking permissions, and make logging single transactions tedious.',
    solution: 'An offline-first, speed-focused ledger styled like an analog cashbook. Record transactions in single keystrokes with auto-categorization.',
    architecture: ['React SPA', 'IndexedDB / Local Storage', 'Tailwind CSS', 'CSV Exporter'],
    features: [
      'Sub-second keyboard-only entry system',
      'Offline-first architecture with automatic multi-tab sync',
      'Structured CSV & JSON spreadsheet exports'
    ],
    challenges: 'Writing a custom local database indexing system over browser storage that supports rapid searching and complex tag filtering.',
    lessonsLearned: 'Clean UX and speed beat rich visual charts every single day. Users just want to get in, log, and get out.',
    tech: ['React', 'TypeScript', 'IndexedDB', 'Tailwind CSS']
  },
  {
    id: 'campus-connect',
    title: 'CAMPUS CONNECT',
    year: '2024',
    problem: 'Students are flooded with announcements on Slack, WhatsApp, and email, leading to missed local events and lost study groups.',
    solution: 'A localized peer-to-peer campus board. Create study groups, trade books, and broadcast short-lived local events in real-time.',
    architecture: ['Vite + React', 'Express Backend', 'MongoDB Atlas', 'JWT Authentication'],
    features: [
      'Interactive geo-fenced campus event board',
      'Peer-to-peer textbook and gear trade market',
      'Instant chat rooms for study coordination'
    ],
    challenges: 'Handling real-time comment streams under concurrent traffic spikes when popular campus events are announced.',
    lessonsLearned: 'Designing lightweight schema models and leveraging connection polling ensures low-cost server operation during usage peaks.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io']
  },
  {
    id: 'ai-resume-analyzer',
    title: 'AI RESUME ANALYZER',
    year: '2025',
    problem: 'Job seekers struggle to understand how well their resume aligns with specific, jargon-heavy tech job descriptions.',
    solution: 'A single-screen file drop tool that extracts PDF resume schemas, matches keyword densities against job descriptions, and renders clear alignment maps.',
    architecture: ['React Client', 'Express Parser API', 'PDF.js Reader', 'Gemini Pro API Proxy'],
    features: [
      'Drag-and-drop resume PDF visual extractor',
      'Skill gap finder & semantic keyword analyzer',
      'Optimized bullet point re-writer'
    ],
    challenges: 'Extracting structured tables and text from multi-column PDFs without losing spatial reading hierarchies.',
    lessonsLearned: 'Parsing PDFs entirely on the client before forwarding lightweight raw text saves server memory and speeds up overall analysis.',
    tech: ['React', 'Node.js', 'Express', 'PDF.js', 'Gemini Pro API']
  }
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: 'Full Stack & AI App Developer',
    company: 'Independent Product Building / Open Source',
    startDate: '2025',
    endDate: 'Present',
    bullets: [
      'Designed and coded Nexus AI, a unified productivity workspace with side-by-side rich text editing and LLM context extraction.',
      'Authored campus utility boards and chrome extensions used by local peers to streamline academic sharing and context syncing.',
      'Refined front-end systems with high-contrast editorial typography, optimal layout density, and fluid GPU-accelerated motion systems.'
    ]
  },
  {
    role: 'Frontend Development & Interface Lead',
    company: 'Academic & Regional Community Projects',
    startDate: '2024',
    endDate: '2025',
    bullets: [
      'Constructed localized student collaboration platforms using React, Tailwind CSS, and expressive hand-annotated UI layers.',
      'Implemented offline-first caching mechanisms using IndexedDB, reducing page load lag for campus-wide bulletin boards.',
      'Guided interface design passes to match clean print design aesthetics, securing WCAG AA color accessibility scores.'
    ]
  }
];

export const EDUCATION: EducationEntry[] = [
  {
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    institution: 'Visakhapatnam Area Institution',
    year: '2026 (Expected)'
  }
];

export const PROCESS_STEPS = [
  { num: '01', title: 'RESEARCH', desc: 'Understand the real user problem deeply before writing a single line of component code.' },
  { num: '02', title: 'WIREFRAME', desc: 'Lay out content density, functional hierarchy, and user flow before making visual styling decisions.' },
  { num: '03', title: 'PROTOTYPE', desc: 'Build the absolute smallest working end-to-end version to test the feasibility of the core technical idea.' },
  { num: '04', title: 'DEVELOPMENT', desc: 'Engineer the full stack with modular files, strong types, responsive layouts, and proper error states.' },
  { num: '05', title: 'TESTING', desc: 'Attempt to break the system on purpose, resolve edge cases, and tune performance on low-end devices.' },
  { num: '06', title: 'LAUNCH', desc: 'Ship to production, monitor user paths, and continuously refine interfaces based on real interaction data.' }
];

export const SECTIONS = [
  { id: 'hero', name: 'Notebook Cover' },
  { id: 'nexus-ai', name: 'Nexus AI centerpiece' },
  { id: 'other-projects', name: 'Other spreads' },
  { id: 'why-i-build', name: 'Field Notes' },
  { id: 'tech-stack', name: 'Toolbox' },
  { id: 'experience', name: 'Experience' },
  { id: 'education', name: 'Education' },
  { id: 'process', name: 'Process' },
  { id: 'contact', name: 'Contact' }
];

export const CONCEPT_SKETCHES = [
  {
    title: 'Initial Workspace Layout Draft',
    description: 'Rough spatial grid thinking for the dual-pane layout: putting the interactive context stream directly adjacent to the editor page.',
    date: 'Jan 2026',
    lines: [
      'M 20,40 L 180,40',
      'M 20,40 L 20,160 L 180,160 L 180,40',
      'M 100,40 L 100,160', // Divider
      'M 30,60 L 90,60', 'M 30,80 L 70,80', // Chat bubbles
      'M 110,60 H 170', 'M 110,75 H 150', 'M 110,90 H 165' // Editor lines
    ]
  },
  {
    title: 'Browser Extension Connection Mapping',
    description: 'Conceptual flowchart of CORS-friendly payload handshakes between Chrome extension script frames and the active port server.',
    date: 'Nov 2025',
    lines: [
      'M 15,50 H 55 V 150 H 15 Z', // Browser tab
      'M 145,50 H 185 V 150 H 145 Z', // Nexus core
      'M 55,75 Q 100,65 145,75', // Flow arrow
      'M 135,70 L 145,75 L 137,83',
      'M 145,125 Q 100,135 55,125', // Back arrow
      'M 65,130 L 55,125 L 63,117',
      'M 100,45 L 100,155' // Dotted line
    ]
  },
  {
    title: 'Cashbook Ledger Key-Command Grid',
    description: 'Keyboard-focused event bubble hierarchy mapping. Express transaction additions mapped instantly to specific physical key binds.',
    date: 'Sep 2025',
    lines: [
      'M 40,40 L 160,40 L 160,160 L 40,160 Z',
      'M 40,70 H 160', 'M 40,100 H 160', 'M 40,130 H 160',
      'M 80,40 V 160',
      'M 50,55 L 70,55', 'M 95,55 H 145',
      'M 50,85 L 70,85', 'M 95,85 H 135',
      'M 50,115 L 70,115', 'M 95,115 H 150',
      'M 50,145 L 70,145', 'M 95,145 H 125'
    ]
  }
];
