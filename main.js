/**
 * Bristol Food Hygiene Ratings — main.js
 * Shared JavaScript for all four pages.
 * Covers: mobile nav toggle, hero search validation, filter chips.
 */

(function () {
  'use strict';

  /* ============================================================
     1. MOBILE NAV TOGGLE
  ============================================================ */
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Close on outside focus
    document.addEventListener('focusin', function (e) {
      const header = document.querySelector('.site-header');
      if (header && !header.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        toggle.focus();
      }
    });
  }

  /* ============================================================
     2. HERO SEARCH FORM — empty input validation (FR9)
  ============================================================ */
  const heroForm = document.querySelector('.hero-form');
  const heroHint = document.getElementById('hero-hint');

  if (heroForm && heroHint) {
    heroForm.addEventListener('submit', function (e) {
      const input = document.getElementById('hero-search');
      if (!input) return;
      if (!input.value.trim()) {
        e.preventDefault();
        heroHint.textContent = 'Please enter a business name, postcode, or address to search.';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
      } else {
        heroHint.textContent = '';
        input.removeAttribute('aria-invalid');
      }
    });
  }

  /* ============================================================
     3. SEARCH PAGE — filter chip removal (UI only)
  ============================================================ */
  const chipButtons = document.querySelectorAll('.filter-chip-active');
  chipButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const li = btn.closest('li');
      if (li) li.remove();
    });
  });

  /* ============================================================
     4. BUSINESS DETAIL — FHRS image fallback
  ============================================================ */
  const fhrsImg      = document.querySelector('.fhrs-img');
  const fhrsFallback = document.getElementById('fhrs-fallback');

  if (fhrsImg && fhrsFallback) {
    fhrsImg.addEventListener('error', function () {
      fhrsImg.style.display = 'none';
      fhrsFallback.style.display = 'flex';
    });
  }

})();