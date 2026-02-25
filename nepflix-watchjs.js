/**
 * ============================================================
 * NEPFLIX — player.js
 * Custom HTML5 video player controller
 * Handles: playback, progress, volume, fullscreen,
 *          keyboard shortcuts, auto-hide controls,
 *          watch progress persistence via localStorage
 * ============================================================
 */

const player = (() => {

  /* ── DOM References ── */
  const video        = document.getElementById('mainVideo');
  const progressBar  = document.getElementById('progressBar');
  const progressBuf  = document.getElementById('progressBuffered');
  const progressCont = document.getElementById('progressContainer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const centerPlay   = document.getElementById('centerPlay');
  const pauseOverlay = document.getElementById('pauseOverlay');
  const muteBtn      = document.getElementById('muteBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const timeDisplay  = document.getElementById('timeDisplay');
  const controls     = document.getElementById('playerControls');
  const nav          = document.getElementById('playerNav');
  const spinner      = document.getElementById('playerSpinner');
  const skipIntroBtn = document.getElementById('skipIntro');
  const fsBtn        = document.getElementById('fsBtn');
  const wrapper      = document.getElementById('playerWrapper');

  /* ── State ── */
  const STORAGE_KEY = 'nepflix_progress_pashupati';
  let hideTimer     = null;
  let isPlaying     = false;
  let isMuted       = false;

  /* ── Helpers ── */

  /**
   * Format seconds → "m:ss"
   * @param {number} s - seconds
   * @returns {string}
   */
  const fmt = (s) => {
    s = Math.floor(s);
    const m   = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  /* ── Controls Visibility ── */

  /**
   * Show controls + nav, then auto-hide after 3s if playing
   */
  function showControls() {
    controls.classList.remove('hidden');
    nav.style.opacity = '1';
    clearTimeout(hideTimer);

    if (isPlaying) {
      hideTimer = setTimeout(() => {
        controls.classList.add('hidden');
        nav.style.opacity = '0';
      }, 3000);
    }
  }

  /* ── Playback UI Sync ── */

  /**
   * Update all play/pause buttons and overlays to match current state
   */
  function updatePlayUI() {
    const icon       = isPlaying ? '⏸' : '▶';
    playPauseBtn.textContent = icon;
    centerPlay.textContent   = icon;

    centerPlay.classList.toggle('hidden', isPlaying);
    pauseOverlay.classList.toggle('visible', !isPlaying);

    if (!isPlaying) showControls();
  }

  /* ── Public Playback Methods ── */

  /**
   * Toggle play / pause
   */
  function togglePlay() {
    video.paused ? play() : pause();
  }

  /**
   * Begin playback
   */
  function play() {
    video.play()
      .then(() => {
        isPlaying = true;
        updatePlayUI();
        showControls();
      })
      .catch(() => {
        // Autoplay may be blocked — show centered play button
      });
  }

  /**
   * Pause playback
   */
  function pause() {
    video.pause();
    isPlaying = false;
    updatePlayUI();
  }

  /**
   * Skip forward or backward by N seconds
   * @param {number} sec - positive = forward, negative = backward
   */
  function skip(sec) {
    video.currentTime = Math.max(
      0,
      Math.min(video.duration || 0, video.currentTime + sec)
    );
    ui.showToast(sec > 0 ? `+${sec}s` : `${sec}s`);
    showControls();
  }

  /**
   * Toggle mute on/off
   */
  function toggleMute() {
    isMuted      = !isMuted;
    video.muted  = isMuted;
    muteBtn.textContent  = isMuted ? '🔇' : '🔊';
    volumeSlider.value   = isMuted ? 0 : video.volume;
  }

  /**
   * Set volume from slider input (0–1)
   * @param {number|string} val
   */
  function setVolume(val) {
    video.volume        = parseFloat(val);
    video.muted         = (val == 0);
    isMuted             = (val == 0);
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
  }

  /**
   * Toggle browser fullscreen on the player wrapper
   */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      (wrapper.requestFullscreen || wrapper.webkitRequestFullscreen).call(wrapper);
      fsBtn.textContent = '⤡';
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      fsBtn.textContent = '⛶';
    }
  }

  /**
   * Skip the intro sequence (~85 seconds forward)
   */
  function skipIntro() {
    video.currentTime += 85;
    skipIntroBtn.classList.remove('visible');
    ui.showToast('Intro skipped');
  }

  /* ── Progress Persistence ── */

  /**
   * Resume from saved localStorage timestamp
   */
  function resumeProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      video.currentTime = parseFloat(saved);
      ui.dismissBanner();
      play();
    }
  }

  /**
   * Save current timestamp to localStorage
   * Only saves if past 5s to avoid storing negligible progress
   */
  function saveProgress() {
    if (video.currentTime > 5 && !video.ended) {
      localStorage.setItem(STORAGE_KEY, video.currentTime.toFixed(2));
    }
  }

  /* ── Video Event Listeners ── */

  // timeupdate: sync progress bar + time display + skip intro visibility
  video.addEventListener('timeupdate', () => {
    if (!video.duration) return;

    const pct = (video.currentTime / video.duration) * 100;
    progressBar.style.width      = pct + '%';
    timeDisplay.textContent      = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;

    // Auto-save every 5 seconds
    if (Math.floor(video.currentTime) % 5 === 0) {
      saveProgress();
    }

    // Show skip intro button between 60s and 145s
    if (video.currentTime > 60 && video.currentTime < 145) {
      skipIntroBtn.classList.add('visible');
    } else {
      skipIntroBtn.classList.remove('visible');
    }
  });

  // progress: update buffered indicator
  video.addEventListener('progress', () => {
    if (video.buffered.length > 0 && video.duration) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      progressBuf.style.width = ((bufferedEnd / video.duration) * 100) + '%';
    }
  });

  // canplay: hide spinner, check for saved progress
  video.addEventListener('canplay', () => {
    spinner.classList.add('hidden');

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && parseFloat(saved) > 10) {
      const remaining = video.duration - parseFloat(saved);
      if (remaining > 0) {
        document.getElementById('continueText').innerHTML =
          `⏱ Continue watching – <strong>${fmt(remaining)}</strong> remaining`;
        document.getElementById('continueBanner').classList.add('visible');
      }
    }
  });

  // ended: clear saved progress, reset UI
  video.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayUI();
    localStorage.removeItem(STORAGE_KEY);
  });

  /* ── Progress Bar Click (seek) ── */
  progressCont.addEventListener('click', (e) => {
    const rect = progressCont.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * (video.duration || 0);
    showControls();
  });

  /* ── Mouse / Touch Activity ── */
  wrapper.addEventListener('mousemove', showControls);
  wrapper.addEventListener('touchstart', showControls, { passive: true });

  /* ── Keyboard Shortcuts ── */
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    switch (e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlay();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'm':
      case 'M':
        toggleMute();
        break;
      case 'ArrowRight':
        skip(10);
        break;
      case 'ArrowLeft':
        skip(-10);
        break;
    }
  });

  /* ── Public API ── */
  return {
    togglePlay,
    play,
    pause,
    skip,
    toggleMute,
    setVolume,
    toggleFullscreen,
    skipIntro,
    resumeProgress
  };

})();
