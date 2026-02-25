/**
 * NEPFLIX — Nepali Cinema Streaming UI
 * script.js — Main Application Logic
 *
 * Features:
 * - Loading screen animation with auto-dismiss
 * - Movie data with rich metadata
 * - Dynamic SVG poster generation (cinematic placeholder art)
 * - Horizontal scroll rows with arrow navigation
 * - IntersectionObserver fade-in animations
 * - Hero cinematic particle system
 * - Movie detail modal
 * - Sidebar interactions
 */


/* =====================================================
   MOVIE DATA — Nepali Film Library
   ===================================================== */
const MOVIES = {

  newReleases: [
    {
      id: 'chhakka-panja-4',
      title: 'Chhakka Panja 4',
      titleNp: 'छक्का पन्जा ४',
      year: 2024,
      rating: 7.1,
      runtime: '2h 10m',
      genre: ['Comedy', 'Drama'],
      synopsis: 'The beloved Chhakka Panja gang returns for another hilarious chapter filled with laughter, heart, and unmistakably Nepali humor.',
      cert: 'U/A',
      isNew: true,
      palette: ['#1a0033', '#330055', '#550077', '#8800aa'],
      shape: 'diamond'
      
    },
    {
      id: 'bulbul',
      title: 'Bulbul',
      titleNp: 'बुलबुल',
      year: 2023,
      rating: 7.6,
      runtime: '2h 5m',
      genre: ['Romance', 'Drama'],
      synopsis: 'A poignant love story set against the backdrop of the Himalayan foothills, exploring the unspoken bonds between two souls.',
      cert: 'U',
      isNew: true,
      palette: ['#001a33', '#003366', '#0055aa', '#0088ff'],
      shape: 'wave'
    },
    {
      id: 'jatra-2',
      title: 'Jatra 2',
      titleNp: 'यात्रा २',
      year: 2023,
      rating: 6.9,
      runtime: '2h 18m',
      genre: ['Comedy', 'Action'],
      synopsis: 'Comedy meets chaos in this wildly entertaining sequel following misadventures across the vibrant streets of Kathmandu.',
      cert: 'U/A',
      isNew: true,
      palette: ['#1a1a00', '#333300', '#666600', '#999900'],
      shape: 'triangles'
    },
    {
      id: 'seto-surya',
      title: 'Seto Surya',
      titleNp: 'सेतो सूर्य',
      year: 2023,
      rating: 7.8,
      runtime: '2h 30m',
      genre: ['War', 'Drama', 'History'],
      synopsis: 'An epic retelling of the 1814 Anglo-Nepali War, celebrating the bravery and sacrifice of Nepali warriors.',
      cert: 'A',
      isNew: true,
      palette: ['#1a0000', '#330000', '#550000', '#880000'],
      shape: 'geometric'
    },
    {
      id: 'bagmati',
      title: 'Bagmati',
      titleNp: 'बागमती',
      year: 2024,
      rating: 7.3,
      runtime: '1h 58m',
      genre: ['Thriller', 'Mystery'],
      synopsis: 'A tense thriller unraveling a conspiracy along the sacred Bagmati river, where ancient secrets meet modern corruption.',
      cert: 'A',
      isNew: true,
      palette: ['#001f1f', '#003333', '#005555', '#007777'],
      shape: 'ripple'
    },
    {
      id: 'mero-yatra',
      title: 'Mero Yatra',
      titleNp: 'मेरो यात्रा',
      year: 2024,
      rating: 6.8,
      runtime: '2h 2m',
      genre: ['Road Movie', 'Drama'],
      synopsis: 'A soul-searching road trip from Kathmandu to Mustang, where strangers become family through the rugged Himalayan landscape.',
      cert: 'U',
      isNew: true,
      palette: ['#001a0a', '#003322', '#005533', '#007744'],
      shape: 'landscape'
    }
  ],

  trending: [
    {
      id: 'chhakka-panja-3',
      title: 'Chhakka Panja 3',
      titleNp: 'छक्का पन्जा ३',
      year: 2022,
      rating: 7.3,
      runtime: '2h 8m',
      genre: ['Comedy', 'Drama'],
      synopsis: 'The third installment of Nepal\'s most beloved comedy franchise continues to break box office records.',
      cert: 'U/A',
      isNew: false,
      palette: ['#1f0a00', '#3d1500', '#662200', '#993300'],
      shape: 'burst'
    },
    {
      id: 'loot-2',
      title: 'Loot 2',
      titleNp: 'लुट २',
      year: 2017,
      rating: 7.0,
      runtime: '2h 12m',
      genre: ['Action', 'Crime', 'Comedy'],
      synopsis: 'The Loot crew reassembles for a bigger, wilder heist in this action-packed sequel that doubled the original\'s thrills.',
      cert: 'U/A',
      isNew: false,
      palette: ['#0a0a1f', '#15152d', '#1f1f4a', '#2a2a66'],
      shape: 'shards'
    },
    {
      id: 'prem-geet-3',
      title: 'Prem Geet 3',
      titleNp: 'प्रेम गीत ३',
      year: 2022,
      rating: 7.2,
      runtime: '2h 20m',
      genre: ['Romance', 'Musical'],
      synopsis: 'The sweeping romantic saga concludes with breathtaking Himalayan visuals and unforgettable melodies.',
      cert: 'U',
      isNew: false,
      palette: ['#1f0f00', '#3d1f00', '#663300', '#994d00'],
      shape: 'hearts'
    },
    {
      id: 'ramprasad',
      title: 'Ramprasad',
      titleNp: 'रामप्रसाद',
      year: 2023,
      rating: 7.5,
      runtime: '2h 15m',
      genre: ['Drama', 'Family'],
      synopsis: 'A heartwarming family saga following three generations of a Nepali family through independence and self-discovery.',
      cert: 'U',
      isNew: false,
      palette: ['#0f0a1f', '#1f1533', '#2a1f4a', '#3d2d66'],
      shape: 'mandala'
    },
    {
      id: 'kabaddi-kabaddi',
      title: 'Kabaddi Kabaddi',
      titleNp: 'काबडी काबडी',
      year: 2015,
      rating: 7.5,
      runtime: '2h 22m',
      genre: ['Drama', 'Romance', 'Sports'],
      synopsis: 'A Terai backdrop romance with kabaddi at its heart, exploring love, village politics, and athletic glory.',
      cert: 'U/A',
      isNew: false,
      palette: ['#001a0f', '#002d1a', '#004d2a', '#006633'],
      shape: 'field'
    },
    {
      id: 'kri',
      title: 'Kri',
      titleNp: 'क्री',
      year: 2023,
      rating: 7.0,
      runtime: '2h 5m',
      genre: ['Action', 'Thriller'],
      synopsis: 'A slick action thriller following a Nepali special agent uncovering a dangerous international conspiracy.',
      cert: 'A',
      isNew: false,
      palette: ['#0a0f1f', '#10182d', '#1a2d4a', '#233d66'],
      shape: 'hexagon'
    }
  ],

  classics: [
    {
      id: 'loot',
      title: 'Loot',
      titleNp: 'लुट',
      year: 2012,
      rating: 7.8,
      runtime: '2h 5m',
      genre: ['Action', 'Crime', 'Comedy'],
      synopsis: 'The landmark Nepali film that redefined an industry. A perfectly crafted heist comedy that remains unmatched.',
      cert: 'U/A',
      isNew: false,
      palette: ['#1f0000', '#3d0000', '#660000', '#990000'],
      shape: 'classic-burst'
    },
    {
      id: 'pashupati-prasad',
      title: 'Pashupati Prasad',
      titleNp: 'पशुपतिप्रसाद',
      year: 2016,
      rating: 8.1,
      runtime: '2h 18m',
      genre: ['Drama', 'Social'],
      synopsis: 'A masterpiece of social cinema. The devastating story of a slum dweller\'s resilience shook the nation\'s conscience.',
      cert: 'U/A',
      isNew: false,
      palette: ['#0f1a00', '#1a2d00', '#2d4a00', '#3d6600'],
      shape: 'temple'
    },
    {
      id: 'kagbeni',
      title: 'Kagbeni',
      titleNp: 'काग्बेनी',
      year: 2008,
      rating: 7.9,
      runtime: '2h 15m',
      genre: ['Thriller', 'Folklore', 'Drama'],
      synopsis: 'Nepali cinema\'s finest psychological thriller. A haunting tale rooted in Mustang folklore that still chills spines.',
      cert: 'A',
      isNew: false,
      palette: ['#0a0a0a', '#1a1000', '#2d1a00', '#3d2a00'],
      shape: 'mountains'
    },
    {
      id: 'prem-geet',
      title: 'Prem Geet',
      titleNp: 'प्रेम गीत',
      year: 2016,
      rating: 7.6,
      runtime: '2h 28m',
      genre: ['Romance', 'Musical'],
      synopsis: 'The film that launched a franchise and a thousand hearts. A visually sumptuous musical romance from the hills.',
      cert: 'U',
      isNew: false,
      palette: ['#1f0033', '#330055', '#4d007a', '#6600aa'],
      shape: 'petals'
    },
    {
      id: 'kabaddi',
      title: 'Kabaddi',
      titleNp: 'काबडी',
      year: 2014,
      rating: 7.4,
      runtime: '2h 15m',
      genre: ['Drama', 'Sports', 'Action'],
      synopsis: 'The film that proved Nepali sports cinema could soar. Raw, authentic, and deeply rooted in national identity.',
      cert: 'U/A',
      isNew: false,
      palette: ['#001433', '#002266', '#003399', '#0044cc'],
      shape: 'arena'
    },
    {
      id: 'jatra',
      title: 'Jatra',
      titleNp: 'यात्रा',
      year: 2016,
      rating: 7.2,
      runtime: '2h 10m',
      genre: ['Comedy', 'Action'],
      synopsis: 'Irreverent, wild, and endlessly quotable. Jatra captured the chaotic spirit of Kathmandu like no film before it.',
      cert: 'U/A',
      isNew: false,
      palette: ['#1f1500', '#3d2a00', '#664400', '#995e00'],
      shape: 'festival'
    }
  ],

  topRated: [
    {
      id: 'pashupati-prasad-top',
      title: 'Pashupati Prasad',
      titleNp: 'पशुपतिप्रसाद',
      year: 2016,
      rating: 8.1,
      runtime: '2h 18m',
      genre: ['Drama', 'Social'],
      synopsis: 'Nepal\'s highest-rated film. A performance for the ages in an uncompromising social drama.',
      cert: 'U/A',
      isNew: false,
      palette: ['#0a1f00', '#152d00', '#1f4000', '#2a5500'],
      shape: 'gold-temple',
      rank: 1
    },
    {
      id: 'kagbeni-top',
      title: 'Kagbeni',
      titleNp: 'काग्बेनी',
      year: 2008,
      rating: 7.9,
      runtime: '2h 15m',
      genre: ['Thriller', 'Drama'],
      synopsis: 'A singular achievement in Nepali cinema — atmospheric, unsettling, unforgettable.',
      cert: 'A',
      isNew: false,
      palette: ['#1a0f00', '#2d1800', '#402200', '#552d00'],
      shape: 'night-mountain',
      rank: 2
    },
    {
      id: 'loot-top',
      title: 'Loot',
      titleNp: 'लुट',
      year: 2012,
      rating: 7.8,
      runtime: '2h 5m',
      genre: ['Action', 'Crime', 'Comedy'],
      synopsis: 'Still unbeaten in cultural impact. The heist film that changed everything.',
      cert: 'U/A',
      isNew: false,
      palette: ['#1f0a0a', '#3d1515', '#661f1f', '#992a2a'],
      shape: 'vault',
      rank: 3
    },
    {
      id: 'seto-surya-top',
      title: 'Seto Surya',
      titleNp: 'सेतो सूर्य',
      year: 2023,
      rating: 7.8,
      runtime: '2h 30m',
      genre: ['War', 'Drama', 'History'],
      synopsis: 'The most ambitious production in Nepali film history. An epic that commands respect.',
      cert: 'A',
      isNew: false,
      palette: ['#1a0000', '#2d0000', '#400000', '#550000'],
      shape: 'battle',
      rank: 4
    },
    {
      id: 'bulbul-top',
      title: 'Bulbul',
      titleNp: 'बुलबुल',
      year: 2023,
      rating: 7.6,
      runtime: '2h 5m',
      genre: ['Romance', 'Drama'],
      synopsis: 'Lyrical storytelling and breathtaking cinematography make this a modern Nepali classic.',
      cert: 'U',
      isNew: false,
      palette: ['#00101f', '#001a33', '#002a4d', '#003d66'],
      shape: 'blossom',
      rank: 5
    },
    {
      id: 'prem-geet-top',
      title: 'Prem Geet',
      titleNp: 'प्रेम गीत',
      year: 2016,
      rating: 7.6,
      runtime: '2h 28m',
      genre: ['Romance', 'Musical'],
      synopsis: 'The most beautiful Nepali musical romance ever committed to film.',
      cert: 'U',
      isNew: false,
      palette: ['#1a0022', '#2d0033', '#400044', '#550055'],
      shape: 'music-note',
      rank: 6
    }
  ]
};

/* =====================================================
   MOVIE CARD BUILDER (REAL POSTER VERSION)
   ===================================================== */

// Automatically remove "-top" from ID
function getPosterId(id) {
  return id.replace('-top', '');
}

function buildMovieCard(movie, showRank = false) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.setAttribute('data-id', movie.id);

  const posterId = getPosterId(movie.id);

  card.innerHTML = `
    ${showRank && movie.rank ? `<span class="movie-card__rank">${movie.rank}</span>` : ''}
    ${movie.isNew ? `<span class="movie-card__new-tag">NEW</span>` : ''}

    <div class="movie-card__poster">
      <img 
        class="movie-card__img" 
        src="./assets/posters/${posterId}.jpg" 
        alt="${movie.title} poster"
        loading="lazy"
      />
      <div class="movie-card__overlay">
        <button class="movie-card__quick-play" aria-label="Play ${movie.title}">
          ▶
        </button>
        <div class="movie-card__overlay-meta">
          <span>${movie.rating} ⭐</span>
          <span>${movie.year}</span>
        </div>
      </div>
    </div>

    <div class="movie-card__info">
      <div class="movie-card__title">
        ${movie.titleNp} — ${movie.title}
      </div>
      <div class="movie-card__sub">
        <span>${movie.genre[0]}</span>
        <span> · </span>
        <span>${movie.runtime}</span>
      </div>
    </div>
  `;

  card.addEventListener('click', () => openModal(movie));

  return card;
}
/* =====================================================
   POPULATE ROWS
   ===================================================== */
function populateRow(rowId, movies, showRank = false) {
  const row = document.getElementById(rowId);
  if (!row) return;

  movies.forEach(movie => {
    row.appendChild(buildMovieCard(movie, showRank));
  });
}

/* =====================================================
   ARROW SCROLL NAVIGATION
   ===================================================== */
function initArrows() {
  document.querySelectorAll('.movie-row-wrapper').forEach(wrapper => {
    const row = wrapper.querySelector('.movie-row');
    const leftBtn  = wrapper.querySelector('.row-arrow--left');
    const rightBtn = wrapper.querySelector('.row-arrow--right');

    const SCROLL_AMOUNT = 660;

    if (leftBtn) leftBtn.addEventListener('click', () => {
      row.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    });

    if (rightBtn) rightBtn.addEventListener('click', () => {
      row.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    });
  });
}

/* =====================================================
   INTERSECTION OBSERVER — Fade-in Sections
   ===================================================== */
function initFadeObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Fire once only
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
  });
}

/* =====================================================
   CINEMATIC HERO PARTICLE SYSTEM
   ===================================================== */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const PARTICLE_COUNT = 30;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size   = Math.random() * 3 + 1;
    const startX = Math.random() * 100;
    const delay  = Math.random() * 20;
    const dur    = 15 + Math.random() * 20;

    // Alternate between red glints and white dust
    const isRed = Math.random() > 0.7;
    const color = isRed
      ? `rgba(229, 9, 20, ${0.3 + Math.random() * 0.5})`
      : `rgba(255, 255, 255, ${0.05 + Math.random() * 0.15})`;

    Object.assign(particle.style, {
      width:  `${size}px`,
      height: `${size}px`,
      left:   `${startX}%`,
      background: color,
      animationDuration: `${dur}s`,
      animationDelay:    `${delay}s`,
    });

    // Glow on red particles
    if (isRed) {
      particle.style.boxShadow = `0 0 ${size * 3}px rgba(229, 9, 20, 0.6)`;
    }

    container.appendChild(particle);
  }
}

/* =====================================================
   HERO PARALLAX on Mouse Move
   ===================================================== */
function initHeroParallax() {
  const heroBg = document.getElementById('heroBg');
  const hero   = document.getElementById('hero');
  if (!heroBg || !hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    const xShift = (xPct - 0.5) * 20;
    const yShift = (yPct - 0.5) * 10;

    heroBg.style.transform = `translate(${xShift}px, ${yShift}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    heroBg.style.transform = 'translate(0,0)';
    heroBg.style.transition = 'transform 1s ease';
  });

  hero.addEventListener('mouseenter', () => {
    heroBg.style.transition = 'transform 0.1s linear';
  });
}

/* =====================================================
   MODAL
   ===================================================== */
function openModal(movie) {
  const overlay = document.getElementById('modalOverlay');
  const modalHero  = document.getElementById('modalHero');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta  = document.getElementById('modalMeta');
  const modalSyn   = document.getElementById('modalSynopsis');

  // Generate hero art
  const svg = generatePosterSVG({ ...movie, shape: movie.shape || 'geometric' });
  modalHero.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 240" width="100%" height="240" style="display:block">
      <defs>
        <linearGradient id="mhg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="${movie.palette[0]}"/>
          <stop offset="100%" stop-color="${movie.palette[3]}"/>
        </linearGradient>
      </defs>
      <rect width="560" height="240" fill="url(#mhg)"/>
      <rect width="560" height="240" fill="rgba(0,0,0,0.3)"/>
      <text x="280" y="120" text-anchor="middle" dominant-baseline="middle"
        font-family="serif" font-size="36" font-weight="bold"
        fill="white" opacity="0.9" letter-spacing="4">${movie.title.toUpperCase()}</text>
      <text x="280" y="158" text-anchor="middle"
        font-family="sans-serif" font-size="16"
        fill="rgba(255,255,255,0.5)" letter-spacing="8">${movie.titleNp}</text>
      <!-- Bottom gradient -->
      <defs><linearGradient id="mg2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="transparent"/>
        <stop offset="100%" stop-color="#141414"/>
      </linearGradient></defs>
      <rect y="160" width="560" height="80" fill="url(#mg2)"/>
    </svg>
  `;

  modalTitle.textContent = `${movie.titleNp}  —  ${movie.title}`;

  modalMeta.innerHTML = `
    <span class="modal__imdb"><strong>IMDb</strong> ${movie.rating}</span>
    <span class="modal__meta-item">${movie.year}</span>
    <span class="modal__meta-item">·</span>
    <span class="modal__meta-item">${movie.runtime}</span>
    <span class="modal__meta-item">·</span>
    <span class="modal__meta-item">${movie.cert}</span>
    <span class="modal__meta-item">·</span>
    <span class="modal__meta-item">${movie.genre.join(', ')}</span>
  `;

  modalSyn.textContent = movie.synopsis;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function initModal() {
  const overlay    = document.getElementById('modalOverlay');
  const closeBtn   = document.getElementById('modalClose');

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* =====================================================
   LOADING SCREEN
   ===================================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Minimum display time for dramatic effect
  const minDisplay = 2600;
  const start = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, minDisplay - elapsed);

    setTimeout(() => {
      loader.classList.add('hidden');
    }, remaining);
  });

  // Fallback
  setTimeout(() => loader.classList.add('hidden'), minDisplay + 500);
}

/* =====================================================
   SIDEBAR ITEM INTERACTIONS
   ===================================================== */
function initSidebar() {
  const items = document.querySelectorAll('.sidebar__item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('sidebar__item--active'));
      item.classList.add('sidebar__item--active');
    });
  });
}

/* =====================================================
   HERO BUTTON RIPPLE EFFECT
   ===================================================== */
function initButtonRipples() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      Object.assign(ripple.style, {
        position: 'absolute',
        width:    `${size}px`,
        height:   `${size}px`,
        left:     `${e.clientX - rect.left - size/2}px`,
        top:      `${e.clientY - rect.top  - size/2}px`,
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: 'rippleAnim 0.5s ease-out forwards',
        pointerEvents: 'none',
      });

      // Inject keyframe if not present
      if (!document.getElementById('rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = `@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }`;
        document.head.appendChild(style);
      }

      const prevPos = this.style.position;
      if (!prevPos || prevPos === 'static') this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}
document.querySelector(".btn--play").addEventListener("click", function () {
  const movieId = this.getAttribute("data-id");

  // Redirect with query parameter
  window.location.href = `watch.html?id=${movieId}`;
});
/* =====================================================
   SMOOTH SCROLL INDICATOR
   ===================================================== */
function initScrollIndicator() {
  const scrollEl = document.querySelector('.hero__scroll');
  if (!scrollEl) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 100;
    scrollEl.style.opacity = scrolled ? '0' : '0.4';
  });
}

/* =====================================================
   APP INIT
   ===================================================== */
function init() {
  // Load screen
  initLoader();

  // Populate movie rows
  populateRow('newReleasesRow', MOVIES.newReleases);
  populateRow('trendingRow',    MOVIES.trending);
  populateRow('classicsRow',    MOVIES.classics);
  populateRow('topRatedRow',    MOVIES.topRated, true);

  // UI interactions
  initArrows();
  initFadeObserver();
  initParticles();
  initHeroParallax();
  initModal();
  initSidebar();
  initScrollIndicator();

  // Slight delay to let DOM settle before ripples
  setTimeout(initButtonRipples, 200);

  console.log('%c🎬 NEPFLIX — नेपाली सिनेमा', 'color:#E50914;font-size:20px;font-weight:bold;');
  console.log('%cBuilt with lOVE for Nepal', 'color:#aaa;font-size:12px;');
}

// Boot
document.addEventListener('DOMContentLoaded', init);
