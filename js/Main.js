/*
 * Main.js
 * Bristol Food Hygiene Ratings
 * Author: Nadira Ali Robleh
 * Last updated: 03/04/2026
 *
 * Description:
 *   Controls the mobile navigation toggle behaviour across all pages.
 *   Responsibilities:
 *     - Creates the backdrop scrim if it does not already exist in the DOM
 *     - Opens and closes the mobile nav panel with full ARIA state management
 *     - Syncs the nav panel's top position to the live header height
 *     - Handles resize, orientation change, and media query change events
 *       so the nav resets correctly when the user rotates the device or
 *       resizes the browser window to a desktop breakpoint
 *     - Closes the nav when the user presses Escape, clicks the backdrop,
 *       clicks a nav link, or clicks anywhere outside the panel
 */

(function () {
  'use strict';

  /* ============================================================
     MOBILE NAV — FULL FIX (FINAL)
  ============================================================ */

  /* Cache DOM references used throughout the module.
     All three elements must be present for the nav to function;
     if any are missing the IIFE exits immediately below. */
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('primary-nav');
  const header = document.querySelector('.site-header');

  /* Guard: if any required element is not found in the DOM, do nothing.
     This prevents errors on pages that do not include the full header. */
  if (!toggle || !nav || !header) return;

  /* ───────────── BACKDROP (SAFE SINGLE INSTANCE) ───────────── */

  /* Check whether a backdrop element was already inserted by a previous
     script run (e.g. hot-reload or duplicate script tag).
     If one already exists, reuse it; otherwise create and prepend a new one.
     prepend() places it as the first child of <body> so it sits beneath
     all other content in the stacking context. */
  let backdrop = document.querySelector('.nav-backdrop');

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    /* aria-hidden="true" removes the backdrop from the accessibility tree
       so screen readers do not announce it as interactive content. */
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.prepend(backdrop);
  }

  /* ───────────── MEDIA QUERY ───────────── */

  /* matchMedia returns a live MediaQueryList object.
     Storing it in a variable allows the same instance to be used for both
     .matches checks and the 'change' event listener added further below. */
  const mobileQuery = window.matchMedia('(max-width: 767px)');

  /* Helper: returns true when the viewport is in the mobile breakpoint.
     Centralising this check means changing the breakpoint only requires
     updating the matchMedia string above. */
  function isMobile() {
    return mobileQuery.matches;
  }

  /* ───────────── HEADER HEIGHT SYNC ───────────── */

  /* Reads the live rendered height of the header and writes it to the
     --nav-top CSS custom property on <html>.
     The mobile nav panel uses var(--nav-top) for its top position so it
     always slides out from directly below the header, even if the header
     height changes (e.g. due to a banner being added above it). */
  function updateNavTop() {
    const height = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-top', height + 'px');
  }

  /* ───────────── STATE CONTROL ───────────── */

  /*
   * openNav()
   * Shows the mobile navigation panel and backdrop.
   * Guards against running on desktop viewports where the panel is not needed.
   * Steps:
   *   1. Sync the panel's top position to the current header height
   *   2. Add .is-open to the nav panel (triggers the CSS slide-down animation)
   *   3. Add .is-visible to the backdrop (fades it in)
   *   4. Update aria-expanded and aria-label on the toggle button
   *   5. Lock page scroll so content behind the backdrop cannot be scrolled
   */
  function openNav() {
    if (!isMobile()) return; /* safety guard: never open on desktop */

    updateNavTop();

    nav.classList.add('is-open');
    backdrop.classList.add('is-visible');

    /* ARIA: inform assistive technology that the menu is now expanded */
    toggle.setAttribute('aria-expanded', 'true');
    /* Update the accessible label to reflect the new action available */
    toggle.setAttribute('aria-label', 'Close navigation menu');

    /* Prevent the page from scrolling whilst the nav overlay is open */
    document.body.style.overflow = 'hidden';
  }

  /*
   * closeNav(focusToggle)
   * Hides the mobile navigation panel and backdrop.
   * @param {boolean} focusToggle - when true, returns keyboard focus to the
   *   toggle button after closing. This is important for keyboard accessibility:
   *   if the user closed the nav via Escape or by clicking the backdrop, focus
   *   should return to the element that opened it (the toggle).
   */
  function closeNav(focusToggle = false) {
    nav.classList.remove('is-open');
    backdrop.classList.remove('is-visible');

    /* ARIA: inform assistive technology that the menu is now collapsed */
    toggle.setAttribute('aria-expanded', 'false');
    /* Restore the accessible label for the "open" action */
    toggle.setAttribute('aria-label', 'Open navigation menu');

    /* Re-enable page scrolling */
    document.body.style.overflow = '';

    /* Return focus to the toggle button when requested.
       Without this, keyboard users would lose their place in the page. */
    if (focusToggle) toggle.focus();
  }

  /*
   * toggleNav(e)
   * Called when the hamburger button is clicked.
   * Prevents the click event from bubbling up to the document click handler
   * (which would immediately close the nav that was just opened).
   * On desktop viewports the nav is always closed regardless of current state.
   */
  function toggleNav(e) {
    e.preventDefault();
    e.stopPropagation(); /* stop the click reaching the document-level close handler */

    if (!isMobile()) {
      closeNav(); /* ensure nav is always closed on desktop */
      return;
    }

    /* Toggle between open and closed based on the current state */
    if (nav.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  /* ───────────── RESIZE FIX (CRITICAL) ───────────── */

  /*
   * handleResize()
   * Called on window resize, orientation change, and media query change.
   * Always re-syncs the nav top position first so the panel stays aligned
   * with the header regardless of the new viewport size.
   * If the user has resized to a desktop viewport, the nav is closed and
   * reset to its default state to prevent a stuck open panel.
   */
  function handleResize() {
    updateNavTop();

    if (!isMobile()) {
      closeNav(); /* reset when going desktop */
    }
  }

  /* ───────────── EVENTS ───────────── */

  /* Hamburger button click: open or close the nav */
  toggle.addEventListener('click', toggleNav);

  /* Backdrop click: close the nav and return focus to the toggle button */
  backdrop.addEventListener('click', () => closeNav(true));

  /* Nav link click: close the nav when a link inside the panel is activated.
     Using event delegation on the <nav> element rather than attaching a
     listener to every individual link, which is more efficient and works
     for links added dynamically. */
  nav.addEventListener('click', (e) => {
    if (e.target.closest('.primary-nav__link')) {
      closeNav();
    }
  });

  /* Keyboard: close the nav when the user presses Escape.
     focusToggle=true returns focus to the hamburger button. */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav(true);
    }
  });

  /* Outside click: close the nav if the user clicks anywhere outside
     the nav panel and the toggle button whilst on mobile.
     The contains() checks ensure clicks on the panel itself or the
     toggle do not trigger an unwanted close. */
  document.addEventListener('click', (e) => {
    if (!isMobile()) return;                       /* ignore on desktop */
    if (!nav.classList.contains('is-open')) return; /* ignore if already closed */

    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      closeNav();
    }
  });

  /* Resize: re-sync nav position and reset if switching to desktop */
  window.addEventListener('resize', handleResize);

  /* Orientation change: fired when the device rotates between portrait
     and landscape, which changes both the viewport width and the header
     height. Treat it identically to a resize event. */
  window.addEventListener('orientationchange', handleResize);

  /* Media query change: fired when the viewport crosses the 767px breakpoint.
     Handles the case where the browser is resized slowly past the threshold
     without triggering a discrete resize event. */
  mobileQuery.addEventListener('change', handleResize);

  /* INIT
     Run once on page load to set the initial --nav-top value and
     ensure the nav is in the correct state for the current viewport. */
  updateNavTop();
  handleResize();

})();
