'use strict';

const projectDetails = {
  agents: {
    category: 'GENERATIVE AI / MULTI-AGENT SYSTEMS',
    title: 'AI Multi-Agent Product Integration Hub',
    description: 'A production-oriented multi-agent LLM system designed to coordinate tools and product integrations through structured orchestration. The project combines an API layer, persistent storage, and resilient processing.',
    highlights: [
      'Designed structured tool orchestration with LangGraph for a multi-agent LLM system.',
      'Built scalable API endpoints and persistent storage mechanisms for reliable system behavior.',
      'Implemented retry logic and queue-based processing to improve fault tolerance.'
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'PostgreSQL', 'Redis', 'Docker'],
    repo: null
  },
  university: {
    category: 'GENERATIVE AI / RETRIEVAL-AUGMENTED GENERATION',
    title: 'University AI Assistant Agent',
    description: 'A retrieval-augmented generation assistant that brings relevant university information into the answer generation process through document embeddings and semantic search.',
    highlights: [
      'Developed a RAG pipeline using embeddings and semantic search.',
      'Applied document chunking strategies to support retrieval of relevant context.',
      'Implemented role-based access control (RBAC).',
      'Integrated live querying to improve contextual accuracy of AI responses.'
    ],
    stack: ['Python', 'LangChain', 'ChromaDB', 'Flask', 'RAG', 'RBAC'],
    repo: null
  },
  asl: {
    category: 'COMPUTER VISION / REAL-TIME GESTURE RECOGNITION',
    title: 'Real-Time ASL GPT',
    description: 'A SqueezeFormer-based model and low-latency inference pipeline for real-time gesture recognition, developed with large-scale data processing and tracked experimentation.',
    metrics: [['200GB+', 'Dataset processed'], ['89%', 'Validation similarity']],
    highlights: [
      'Processed a dataset of more than 200GB for model development.',
      'Trained a SqueezeFormer-based model achieving 89% validation similarity.',
      'Developed a low-latency inference pipeline for real-time gesture recognition.',
      'Tracked experiments and model performance with Neptune.'
    ],
    stack: ['Python', 'PyTorch', 'MediaPipe', 'SqueezeFormer', 'Neptune'],
    repo: null
  },
  medical: {
    category: 'COMPUTER VISION / APPLIED DEEP LEARNING',
    title: 'Medical X-ray Image Classification',
    description: 'A convolutional neural network project for pneumonia image classification using Python and TensorFlow.',
    highlights: [
      'Built a CNN-based classifier for pneumonia detection in X-ray images.',
      'Used data augmentation during model development.',
      'Applied hyperparameter tuning to refine the model.'
    ],
    stack: ['Python', 'TensorFlow', 'CNN', 'Data augmentation', 'Hyperparameter tuning'],
    repo: null
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('site-nav');

function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}

menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 680) closeMenu();
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) count += 1;
    });
    const label = filter === 'all' ? 'all projects' : filter === 'generative' ? 'Generative AI projects' : 'Computer vision projects';
    document.getElementById('filter-status').textContent = `Showing ${count} ${label}.`;
  });
});

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const dialog = document.getElementById('project-dialog');
const dialogContent = document.getElementById('dialog-content');
let lastProjectTrigger = null;
let previousBodyOverflow = '';

document.querySelectorAll('.project-open').forEach(button => {
  button.addEventListener('click', () => {
    const project = projectDetails[button.dataset.project];
    if (!project) return;
    lastProjectTrigger = button;
    dialogContent.replaceChildren();
    dialogContent.append(element('p', 'eyebrow', project.category));
    const title = element('h2', '', project.title);
    title.id = 'dialog-title';
    dialogContent.append(title, element('p', 'dialog-description', project.description));
    if (project.metrics) {
      const metrics = element('div', 'dialog-metrics');
      project.metrics.forEach(([value, label]) => {
        const metric = element('div', 'dialog-metric');
        metric.append(element('strong', '', value), element('span', '', label));
        metrics.append(metric);
      });
      dialogContent.append(metrics);
    }
    dialogContent.append(element('h3', 'dialog-subtitle', 'What I built'));
    const list = element('ul', 'dialog-list');
    project.highlights.forEach(highlight => list.append(element('li', '', highlight)));
    dialogContent.append(list, element('h3', 'dialog-subtitle', 'Technical stack'));
    const stack = element('div', 'tags dialog-stack');
    project.stack.forEach(technology => stack.append(element('span', '', technology)));
    dialogContent.append(stack);
    const actions = element('div', 'dialog-actions');
    const discuss = element('a', 'button primary', 'Discuss this project ↗');
    discuss.href = `mailto:ahmed.abdelrazek.dev@gmail.com?subject=${encodeURIComponent('Let’s talk about ' + project.title)}`;
    const github = element('a', 'text-link', project.repo ? 'View source code ↗' : 'Visit my GitHub ↗');
    github.href = project.repo || 'https://github.com/Ahmedabdelrazek1';
    github.target = '_blank';
    github.rel = 'noopener noreferrer';
    actions.append(discuss, github);
    dialogContent.append(actions);
    if (typeof dialog.showModal === 'function') {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      dialog.scrollTop = 0;
      document.getElementById('dialog-close').focus();
    } else {
      dialog.setAttribute('open', '');
      dialog.scrollIntoView({block: 'center'});
    }
  });
});

function closeProject() {
  if (typeof dialog.close === 'function') dialog.close();
  else {
    dialog.removeAttribute('open');
    restoreAfterDialog();
  }
}
function restoreAfterDialog() {
  document.body.style.overflow = previousBodyOverflow;
  if (lastProjectTrigger) lastProjectTrigger.focus({preventScroll: true});
}
document.getElementById('dialog-close').addEventListener('click', closeProject);
dialog.addEventListener('close', restoreAfterDialog);
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeProject();
});

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 3500);
}

document.getElementById('copy-email').addEventListener('click', async () => {
  const email = 'ahmed.abdelrazek.dev@gmail.com';
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    showToast('Email address copied.');
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('contact-email'));
    selection.removeAllRanges();
    selection.addRange(range);
    showToast('Email selected. Press Ctrl+C or ⌘C to copy.');
  }
});

document.getElementById('year').textContent = String(new Date().getFullYear());

if ('IntersectionObserver' in window) {
  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-15% 0px -60% 0px', threshold: 0});
  sections.forEach(section => observer.observe(section));
}
