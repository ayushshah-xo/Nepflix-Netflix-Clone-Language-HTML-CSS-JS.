/**
 * ============================================================
 * NEPFLIX — ui.js
 * UI interactions, content data & card rendering
 * Handles: My List toggle, Share, Toast notifications,
 *          movie card rendering, slider navigation,
 *          continue-watching banner
 * ============================================================
 */

const ui = (() => {

  /* ── State ── */
  let inList     = false;
  let toastTimer = null;

  /* ── Movie Data ── */

  /** Trending Nepali films */
  const trendingMovies = [
    { title: 'Bulbul',              year: '2021', genre: 'Romance', rating: '13+', color: '#1a0a0a' },
    { title: 'Talakjung vs Tulke',  year: '2014', genre: 'Comedy',  rating: 'PG',  color: '#0a0a1a' },
    { title: 'Kabaddi Kabaddi',     year: '2014', genre: 'Comedy',  rating: 'PG',  color: '#0a1a0a' },
    { title: 'Chhakka Panja',       year: '2016', genre: 'Comedy',  rating: '13+', color: '#1a1a0a' },
    { title: 'Loot',                year: '2012', genre: 'Action',  rating: '16+', color: '#1a0a1a' },
    { title: 'Jatra',               year: '2016', genre: 'Comedy',  rating: '13+', color: '#0a1a1a' },
    { title: 'Nai Nabhannu La 5',   year: '2018', genre: 'Romance', rating: 'PG',  color: '#1a0a08' },
    { title: 'Chakka Panja 2',      year: '2017', genre: 'Comedy',  rating: '13+', color: '#08100a' },
  ];

  /** "More Like This" recommendations */
  const moreLikeThis = [
    { title: 'Kagbeni',       year: '2008', genre: 'Drama',     rating: '16+', color: '#100a0a' },
    { title: 'Numafung',      year: '2004', genre: 'Drama',     rating: 'PG',  color: '#0a0a10' },
    { title: 'Badhshala',     year: '2019', genre: 'Social',    rating: '16+', color: '#0a100a' },
    { title: 'Gorkha Palace', year: '2019', genre: 'Thriller',  rating: '16+', color: '#100a00' },
    { title: 'Seto Surya',    year: '2021', genre: 'Drama',     rating: 'PG',  color: '#000a10' },
    { title: 'Aankhon Dekhi', year: '2013', genre: 'Art House', rating: 'PG',  color: '#0a0010' },
  ];

  /* ── SVG Poster Generator ── */

  /**
   * Generate an inline SVG data URI for movie poster placeholders.
   * Creates a cinematic gradient card with the movie title and a
   * red Nepflix accent stripe.
   *
   * @param {string} title - Movie title
   * @param {string} color - Top gradient color (dark hex)
   * @returns {string} data URI string
   */
  function placeholderSVG(title, color) {
    const escaped = title
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;');

    const lines    = escaped.split(' ');
    const yCenter  = 110 - (lines.length - 1) * 9;

    const textTspans = lines
      .map((word, i) => `<tspan x="70" dy="${i === 0 ? 0 : 18}">${word}</tspan>`)
      .join('');

    const gradId = `g${title.length}`;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="210" viewBox="0 0 140 210">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="${color}" />
          <stop offset="100%" stop-color="#000000"  />
        </linearGradient>
      </defs>
      <rect width="140" height="210" fill="url(#${gradId})"/>
      <rect x="0" y="0" width="4" height="210" fill="#e50914"/>
      <text
        x="70"
        y="${yCenter}"
        text-anchor="middle"
        fill="rgba(255,255,255,0.85)"
        font-family="Georgia,serif"
        font-size="13"
        font-weight="bold">
        ${textTspans}
      </text>
      <text
        x="70"
        y="190"
        text-anchor="middle"
        fill="#e50914"
        font-family="Arial,sans-serif"
        font-size="9"
        letter-spacing="2"
        opacity="0.8">NEPFLIX</text>
    </svg>`;

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  /* ── Card Rendering ── */

  /**
   * Render a list of movie objects as card HTML into a container
   * @param {Array}  data        - Array of movie objects
   * @param {string} containerId - Target element ID
   */
  function renderCards(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = data
      .map(movie => {
        const safeTitle = movie.title.replace(/'/g, "\\'");
        return `
          <div class="movie-card" onclick="ui.showToast('Opening ${safeTitle}…')">
            <img
              class="movie-card__img"
              src="${placeholderSVG(movie.title, movie.color)}"
              alt="${movie.title}"
              loading="lazy"
            >
            <div class="movie-card__play">▶</div>
            <div class="movie-card__overlay">
              <div class="movie-card__title">${movie.title}</div>
              <div class="movie-card__meta">${movie.year} · ${movie.genre} · ${movie.rating}</div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  /* ── Slider Navigation ── */

  /**
   * Scroll a card slider left or right
   * @param {string} sliderId - Element ID of the slider
   * @param {number} dir      - Direction: -1 (left) or +1 (right)
   */
  function slideCards(sliderId, dir) {
    const el = document.getElementById(sliderId);
    if (!el) return;
    el.scrollBy({ left: dir * 220, behavior: 'smooth' });
  }

  /* ── My List Toggle ── */

  /**
   * Toggle add/remove from My List.
   * Updates button icon and applies active state.
   */
  function toggleMyList() {
    inList = !inList;
    const btn = document.getElementById('btnAddList');
    btn.textContent = inList ? '✓' : '＋';
    btn.classList.toggle('active', inList);
    showToast(inList ? 'Added to My List' : 'Removed from My List');
  }

  /* ── Share ── */

  /**
   * Share the current page using Web Share API if available,
   * otherwise copy the URL to clipboard.
   */
  function share() {
    if (navigator.share) {
      navigator.share({
        title: 'Pashupati Prasad on Nepflix',
        url:   location.href
      });
    } else {
      navigator.clipboard?.writeText(location.href);
      showToast('Link copied to clipboard!');
    }
  }

  /* ── Continue Watching Banner ── */

  /**
   * Hide the "Continue Watching" banner
   */
  function dismissBanner() {
    const banner = document.getElementById('continueBanner');
    if (banner) banner.classList.remove('visible');
  }

  /* ── Toast Notifications ── */

  /**
   * Show a brief floating toast notification
   * @param {string} message - Text to display
   */
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /* ── Initialisation ── */

  /**
   * Boot the UI: render all card sections
   */
  function init() {
    renderCards(trendingMovies, 'trending');
    renderCards(moreLikeThis,   'more');
  }

  /* ── Public API ── */
  return {
    init,
    toggleMyList,
    share,
    dismissBanner,
    showToast,
    slideCards
  };

})();

/* ── Boot on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  ui.init();
});
