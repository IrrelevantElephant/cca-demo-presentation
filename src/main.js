import Reveal from '../dist/reveal.mjs';
import RevealNotes from '../dist/plugin/notes.mjs';
import RevealHighlight from '../dist/plugin/highlight.mjs';
import '../dist/reset.css';
import '../dist/reveal.css';
import './styles/theme.css';
import './styles/layouts.css';
import './styles/components.css';

const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.slides section.slide:not(#about)').forEach((slide) => {
  const link = document.createElement('a');
  link.className = 'slide-qr';
  link.href = 'https://github.com/irrelevantElephant/cca-demo';
  link.setAttribute('aria-label', 'Visit the cca-demo GitHub repository');
  link.innerHTML = '<img src="/src/assets/images/cca-demo-qr.png" alt="">';
  slide.append(link);
});
const deck = new Reveal({
  width: 1600,
  height: 900,
  margin: 0.04,
  minScale: 0.15,
  maxScale: 2,
  center: false,
  hash: true,
  controls: true,
  controlsTutorial: false,
  controlsBackArrows: 'visible',
  progress: true,
  slideNumber: 'c/t',
  showSlideNumber: 'all',
  keyboard: true,
  overview: true,
  // Keep this a slide deck even on smaller screens.
  scrollActivationWidth: null,
  transition: motion.matches ? 'none' : 'fade',
  transitionSpeed: 'fast',
  backgroundTransition: motion.matches ? 'none' : 'fade',
  pdfSeparateFragments: false,
  pdfMaxPagesPerSlide: 1,
  plugins: [RevealNotes, RevealHighlight],
});
deck.initialize();
motion.addEventListener('change', ({ matches }) => {
  deck.configure({ transition: matches ? 'none' : 'fade',
    backgroundTransition: matches ? 'none' : 'fade' });
});
// Useful for console authoring and lightweight browser QA.
window.deck = deck;
